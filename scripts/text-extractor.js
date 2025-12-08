const fs = require('fs');
const path = require('path');

class TextExtractor {
  constructor(config) {
    this.config = config;
    this.translations = { en: {} };
    this.visitedFiles = new Set();
  }

  generateKey(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .substring(0, 50);
  }

  shouldExclude(filePath) {
    return this.config.excludePatterns.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(filePath);
      }
      return filePath.includes(pattern);
    });
  }

  extractFromJSX(content) {
    const texts = new Set();
    
    // JSX text content
    const jsxTextRegex = /<[^>]*>([^<{]+?)<\/[^>]*>|<([^>/]+)\s*\/>/g;
    let match;
    while ((match = jsxTextRegex.exec(content)) !== null) {
      const text = (match[1] || match[2] || '').trim();
      if (text && text.length > 1 && !this.isCode(text)) {
        texts.add(text);
      }
    }

    // JSX attributes
    const attrRegex = /(\w+)=["'`]([^"'`]+)["'`]/g;
    while ((match = attrRegex.exec(content)) !== null) {
      const text = match[2].trim();
      if (text && text.length > 1 && !this.isCode(text)) {
        texts.add(text);
      }
    }

    return Array.from(texts);
  }

  extractFromJavaScript(content) {
    const texts = new Set();
    
    const stringRegex = /(['"`])((?:(?!\1)[^\\]|\\[\s\S])*)\1/g;
    let match;
    while ((match = stringRegex.exec(content)) !== null) {
      const text = match[2].trim();
      if (text && text.length > 1 && !this.isCode(text)) {
        texts.add(text);
      }
    }

    return Array.from(texts);
  }

  isCode(text) {
    const codeIndicators = [
      /^[0-9.,]+$/, // Numbers
      /^https?:\/\//, // URLs
      /^[a-z]+\.(com|org|net|io)$/i, // Domains
      /^[A-Z_][A-Z0-9_]*$/, // Constants
      /^[a-z]+\(\)$/, // Function calls
      /^\.?[a-z]+$/i, // Single words that might be variables
      /\$[{\w]/, // Template variables
      /^[{}[\]();,:]+$/ // Punctuation
    ];
    
    return codeIndicators.some(regex => regex.test(text)) || 
           text.length > 100 ||
           text.length < 2;
  }

  processFile(filePath) {
    if (this.visitedFiles.has(filePath) || this.shouldExclude(filePath)) {
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsxTexts = this.extractFromJSX(content);
      const jsTexts = this.extractFromJavaScript(content);
      
      const allTexts = [...jsxTexts, ...jsTexts];
      
      allTexts.forEach(text => {
        const key = this.generateKey(text);
        if (!this.translations.en[key]) {
          this.translations.en[key] = text;
        }
      });

      this.visitedFiles.add(filePath);
      if (allTexts.length > 0) {
        console.log(`✓ ${filePath} (${allTexts.length} texts)`);
      }
    } catch (error) {
      console.error(`✗ ${filePath}:`, error.message);
    }
  }

  scanDirectory(dir) {
    if (this.shouldExclude(dir)) return;

    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            this.scanDirectory(fullPath);
          } else if (this.config.fileExtensions.some(ext => fullPath.endsWith(ext))) {
            this.processFile(fullPath);
          }
        } catch (error) {
          console.error(`Error accessing ${fullPath}:`, error.message);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error.message);
    }
  }

  extract() {
    console.log('🔍 Scanning files for translatable text...\n');
    
    this.config.sourceDirectories.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.scanDirectory(dir);
      } else {
        console.warn(`Directory not found: ${dir}`);
      }
    });

    console.log(`\n✅ Extraction complete! Found ${Object.keys(this.translations.en).length} unique texts.`);
    return this.translations;
  }
}

module.exports = TextExtractor;