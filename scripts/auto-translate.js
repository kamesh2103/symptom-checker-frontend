const fs = require('fs');
const path = require('path');
const TextExtractor = require('./text-extractor');

// Configuration
const config = {
  sourceDirectories: ['./src'],
  fileExtensions: ['.js', '.jsx', '.ts', '.tsx'],
  sourceLanguage: 'en',
  targetLanguages: ['hi'],
  excludePatterns: [
    'node_modules',
    '*.test.js',
    '*.spec.js',
    '*.config.js',
    'locales'
  ]
};

// Mock translation function (Replace with real API)
class TranslationService {
  async translateText(text, targetLang) {
    // SIMPLE MOCK TRANSLATIONS - REPLACE WITH REAL API
    const mockDictionary = {
      hi: {
        'welcome': 'स्वागत हे',
        'hello': 'नमस्ते',
        'submit': 'जमा करें',
        'cancel': 'रद्द करें',
        'save': 'सेव करें',
        'login': 'लॉगिन',
        'logout': 'लॉगआउट',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'home': 'होम',
        'about': 'हमारे बारे में',
        'contact': 'संपर्क करें',
        'search': 'खोजें',
        'filter': 'फिल्टर',
        'doctor': 'डॉक्टर',
        'patient': 'मरीज',
        'appointment': 'अपॉइंटमेंट'
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return mockDictionary[targetLang]?.[text.toLowerCase()] || `[${targetLang.toUpperCase()}] ${text}`;
  }
}

class AutoTranslator {
  constructor() {
    this.config = config;
    this.translationService = new TranslationService();
    this.translations = {};
  }

  async initializeTranslations() {
    this.config.targetLanguages.forEach(lang => {
      this.translations[lang] = {};
    });
    this.translations[this.config.sourceLanguage] = {};
  }

  async translateAllTexts(sourceTexts) {
    console.log('🌐 Starting translation process...\n');
    
    const texts = Object.entries(sourceTexts);
    
    for (let i = 0; i < texts.length; i++) {
      const [key, text] = texts[i];
      
      process.stdout.write(`Translating ${i + 1}/${texts.length}: ${text.substring(0, 30)}...\r`);
      
      for (const targetLang of this.config.targetLanguages) {
        try {
          const translatedText = await this.translationService.translateText(text, targetLang);
          this.translations[targetLang][key] = translatedText;
        } catch (error) {
          console.error(`Error translating to ${targetLang}:`, error);
          this.translations[targetLang][key] = text;
        }
      }
      
      this.translations[this.config.sourceLanguage][key] = text;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n');
  }

  saveTranslationFiles() {
    const localesDir = './src/locales';
    
    if (!fs.existsSync(localesDir)) {
      fs.mkdirSync(localesDir, { recursive: true });
    }

    Object.entries(this.translations).forEach(([lang, texts]) => {
      const filePath = path.join(localesDir, `${lang}.json`);
      fs.writeFileSync(filePath, JSON.stringify(texts, null, 2));
      console.log(`💾 Saved: ${filePath} (${Object.keys(texts).length} entries)`);
    });
  }

  generateUsageGuide() {
    console.log('\n📖 Usage Guide:');
    console.log('1. In your components, use the t function from react-i18next:');
    console.log('   import { useTranslation } from "react-i18next";');
    console.log('   const { t } = useTranslation();');
    console.log('   ');
    console.log('2. Use keys in your JSX:');
    console.log('   <h1>{t("welcome")}</h1>');
    console.log('   ');
    console.log('3. Or use the translation hook:');
    console.log('   t("hello_user", { name: "John" })');
  }

  async run() {
    try {
      console.log('🚀 Starting automated translation process...\n');

      // Extract texts
      const extractor = new TextExtractor(this.config);
      const sourceTexts = extractor.extract().en;

      if (Object.keys(sourceTexts).length === 0) {
        console.log('❌ No texts found to translate.');
        return;
      }

      // Initialize translations
      await this.initializeTranslations();

      // Translate
      await this.translateAllTexts(sourceTexts);

      // Save files
      this.saveTranslationFiles();

      // Show summary
      console.log('\n✅ Translation process completed!');
      console.log('\n📊 Summary:');
      Object.entries(this.translations).forEach(([lang, texts]) => {
        console.log(`   ${lang.toUpperCase()}: ${Object.keys(texts).length} translations`);
      });

      this.generateUsageGuide();

    } catch (error) {
      console.error('❌ Translation process failed:', error);
    }
  }
}

// Run the translator
const translator = new AutoTranslator();
translator.run().catch(console.error);