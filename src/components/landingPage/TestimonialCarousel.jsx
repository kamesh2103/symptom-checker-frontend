import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import httpClient from "../../httpClient";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === "undefined") return 3;
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await httpClient.get("/website_feedback");
        let data = response.data;

        if (!data.length) {
          throw new Error("Testimonials not available");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }

        const sortedData = data.sort((a, b) => b.rating - a.rating);
        setTestimonials(sortedData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([
          {
            username: "राजेश कुमार",
            type: "व्यवसायी",
            comments:
              "इस अस्पताल की सेवा बहुत ही शानदार है। डॉक्टरों का व्यवहार बहुत ही दोस्ताना और पेशेवर है। मेरा इलाज बहुत अच्छे से हुआ।",
            rating: 5,
            feedbackid: 1,
            language: "Hindi",
          },
          {
            username: "Priya Sharma",
            type: "Teacher",
            comments:
              "The care I received here was exceptional. Doctors were very knowledgeable and staff was extremely helpful. My recovery was faster than expected.",
            rating: 5,
            feedbackid: 2,
            language: "English",
          },

          {
            username: "லட்சுமி நாராயணன்",
            type: "வீட்டுமனைவி",
            comments:
              "மருத்துவமனையின் சேவை மிகச் சிறந்தது. மருத்துவர்கள் மிகவும் அன்பாகவும், திறமையாகவும் இருந்தனர். என் சிகிச்சை மிகவும் நன்றாக நடந்தேறியது.",
            rating: 5,
            feedbackid: 4,
            language: "Tamil",
          },
          {
            username: "സുജിത്ത് നായർ",
            type: "എഞ്ചിനീയർ",
            comments:
              "ഈ ആശുപത്രിയുടെ സേവനം വളരെ മികച്ചതാണ്. ഡോക്ടർമാർ വളരെ പ്രാവീണ്യമുള്ളവരും സ്റ്റാഫ് വളരെ സഹായകരവുമാണ്. എന്റെ ചികിത്സ വളരെ നന്നായി നടന്നു.",
            rating: 4,
            feedbackid: 5,
            language: "Malayalam",
          },
          {
            username: "రాజేష్ రెడ్డి",
            type: "కర్మచారి",
            comments:
              "ఈ ఆసుపత్రి సేవ చాలా బాగుంది. డాక్టర్లు చాలా నైపుణ్యంగా మరియు స్టాఫ్ చాలా సహాయకారిగా ఉన్నారు. నా చికిత్స చాలా బాగా జరిగింది.",
            rating: 5,
            feedbackid: 6,
            language: "Telugu",
          },
          {
            username: "Aravind Kumar",
            type: "Patient",
            comments:
              "The doctors provided excellent care and explained everything in detail. I felt safe and comfortable during the treatment.",
            rating: 5,
            feedbackid: 7,
          },
          {
            username: "संजय पाटील",
            type: "कर्मचारी",
            comments:
              "या रुग्णालयाची सेवा खूप छान आहे. डॉक्टर खूप कुशल आणि कर्मचारी खूप मदतनीस आहेत. माझ्या उपचारांना खूप चांगले प्रतिसाद मिळाला.",
            rating: 4,
            feedbackid: 7,
            language: "Marathi",
          },
          {
            username: "Gurpreet Singh",
            type: "Farmer",
            comments:
              "This hospital provides excellent care. The doctors are very experienced and the facilities are modern. I'm completely satisfied with my treatment.",
            rating: 5,
            feedbackid: 8,
            language: "English",
          },
        ]);
      }
    };

    fetchTestimonials();
    const interval = setInterval(fetchTestimonials, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const autoPlayInterval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(autoPlayInterval);
  }, [isAutoPlaying, testimonials.length, currentIndex, itemsPerView]);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);

    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Calculate visible testimonials based on current index and items per view
  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsPerView;
    const end = start + itemsPerView;
    let visible = testimonials.slice(start, end);

    // If we don't have enough items to fill the view, take from beginning
    if (visible.length < itemsPerView) {
      visible = [
        ...visible,
        ...testimonials.slice(0, itemsPerView - visible.length),
      ];
    }

    return visible;
  };

  // Language badge component
  const LanguageBadge = ({ language }) => {
    const getLanguageColor = (lang) => {
      const colors = {
        Hindi:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        English:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        Bengali: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        Tamil:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        Telugu:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        Marathi:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        Malayalam:
          "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      };
      return (
        colors[lang] ||
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      );
    };

    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getLanguageColor(
          language
        )}`}
      >
        {language}
      </span>
    );
  };

  // Modern avatar component
  const ModernAvatar = ({ username, className = "" }) => {
    const stringToColor = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = hash % 360;
      return `hsl(${hue}, 70%, 60%)`;
    };

    const bgColor = stringToColor(username);
    const initials = username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return (
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${className}`}
        style={{
          backgroundColor: bgColor,
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
        }}
      >
        {initials}
      </div>
    );
  };

  if (testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 dark:bg-teal-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50 dark:bg-blue-900/20 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-teal-50 dark:bg-teal-900/30 rounded-full border border-teal-100 dark:border-teal-800 mb-4">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
            <span className="text-teal-600 dark:text-teal-400 text-sm font-medium">
              Client Feedback
            </span>a
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Get in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600 ">
              {" "}
              Touch With
              <br />
            </span>
            Our Team
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Hear from patients who have
            experienced our services
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex justify-center md:justify-end mb-8 space-x-4">
            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 dark:hover:border-teal-800 group"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5 group-hover:text-teal-500 transition-colors" />
              </button>
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 dark:hover:border-teal-800 group"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5 group-hover:text-teal-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Testimonial Cards Container */}
          <div className="relative">
            <div
              className={`grid gap-6 lg:gap-8 ${
                itemsPerView === 1
                  ? "grid-cols-1"
                  : itemsPerView === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              } transition-all duration-500 ${
                isTransitioning
                  ? "opacity-60 scale-95"
                  : "opacity-100 scale-100"
              }`}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.feedbackid}-${index}`}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  {/* Card background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Accent border on hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-200 dark:group-hover:border-teal-900 transition-colors duration-500 pointer-events-none"></div>

                  <div className="relative p-8">
                    {/* Top section with quote and rating */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-2xl">
                        <Quote className="w-6 h-6 text-teal-500" />
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <LanguageBadge language={testimonial.language} />
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={`${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                              } transition-transform duration-300 group-hover:scale-110 ml-1`}
                              style={{ transitionDelay: `${i * 50}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-8">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg line-clamp-4 group-hover:line-clamp-none transition-all duration-300 font-medium">
                        {testimonial.comments}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center pt-6 border-t border-gray-100 dark:border-gray-700">
                      <div className="relative">
                        <ModernAvatar
                          username={testimonial.username || "Anonymous"}
                          className="ring-4 ring-white dark:ring-gray-800 group-hover:ring-teal-100 dark:group-hover:ring-teal-900/50 transition-all duration-300 group-hover:scale-110 shadow-md"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.username || "Anonymous"}
                        </h3>
                        <p className="text-teal-600 dark:text-teal-400 text-sm font-medium">
                          {testimonial.type || "Patient"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {isTransitioning && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500 mb-2"></div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Loading...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Pagination Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`relative rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-12 bg-gradient-to-r from-teal-500 to-blue-500"
                  : "w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              } h-3 disabled:opacity-50 group`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse"></div>
              )}
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full bg-teal-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              500+
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              4.9
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              98%
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Satisfaction
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              24/7
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Support
            </div>
          </div>
        </div>

        {/* CTA Section */}
      </div>
    </div>
  );
};

export default TestimonialSection;
