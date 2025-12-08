import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../contexts/DarkMode/DarkModeContext";
import { FaMoon, FaSun, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Header = () => {
  const { i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  const blogPosts = [
    { id: 1, summary: "Explore the importance of mental health...", link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" },
    { id: 2, summary: "Learn about how regular physical activity can improve your health...", link: "https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm" },
    { id: 3, summary: "Essential guidelines for maintaining a balanced diet...", link: "https://www.nih.gov/health-information/diet-nutrition" },
    { id: 4, summary: "Understanding the importance of quality sleep...", link: "https://www.sleepfoundation.org/sleep-hygiene" },
    { id: 5, summary: "Effective techniques and strategies to manage stress...", link: "https://www.nimh.nih.gov/health/publications/stress" },
    { id: 6, summary: "Key factors in maintaining cardiovascular health...", link: "https://www.heart.org/en/health-topics" },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="overflow-x-hidden flex justify-between items-center py-1 border-b border-gray-200 bg-[#00e0c7] dark:bg-[#2D2D2D] dark:border-[#00e0c7] relative">
        
        <div className="flex items-center flex-1 text-white pl-4 sm:pl-6 lg:pl-8 pr-4">
          
          {/* Navigation Arrows - Left */}
          <button
            onClick={prevSlide}
            className="p-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 mr-3 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isTransitioning}
          >
            <FaChevronLeft className="w-3 h-3" />
          </button>

          {/* Blog Slider Container */}
          <div className="flex-1 max-w-4xl overflow-hidden">
            <div className="relative h-8 flex items-center">
              {/* Sliding Content */}
              <div 
                ref={sliderRef}
                className="flex transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {blogPosts.map((post, index) => (
                  <div 
                    key={post.id}
                    className="w-full flex-shrink-0 flex items-center justify-between px-2"
                  >
                    {/* Animated text entry */}
                    <div className={`flex-1 min-w-0 transition-all duration-700 ease-out ${
                      currentSlide === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}>
                      <p className="text-xs font-semibold truncate dark:text-white animate-fadeIn"
                        style={{ fontFamily: "'Merriweather', sans" }}>
                        {post.summary}{" "}
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-800 hover:underline hover:text-white ml-1 text-sm transition-colors duration-300 group"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Read More
                          <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Right */}
          <button
            onClick={nextSlide}
            className="p-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 ml-3 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isTransitioning}
          >
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center space-x-1 ml-4 flex-shrink-0">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`relative transition-all duration-500 ${
                  isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Progress bar for current slide */}
                {index === currentSlide && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white animate-progress" />
                )}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110"
                  }`}
                />
              </button>
            ))}
          </div>

        </div>

        {/* Right side: Language + Dark Mode */}
        <div className="flex items-center space-x-3 sm:space-x-4 pr-4 sm:pr-6 lg:pr-8">
          
          {/* Language Switch */}
          <button
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
            className="px-2 sm:px-3 py-1 rounded-lg bg-[#E8F1F2] text-[#3A7CA5] text-xs font-semibold hover:bg-[#F5F7FA] hover:scale-105 transition-all duration-300 transform active:scale-95"
          >
            {i18n.language === "en" ? "हिंदी" : "EN"}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 rounded-lg bg-[#E8F1F2] hover:bg-[#F5F7FA] hover:scale-105 transition-all duration-300 transform active:scale-95"
          >
            {isDarkMode ? (
              <FaSun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 animate-pulse" />
            ) : (
              <FaMoon className="w-3 h-3 sm:w-4 sm:h-4 text-[#3A7CA5] animate-pulse" />
            )}
          </button>

        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </>
  );
};

export default Header;