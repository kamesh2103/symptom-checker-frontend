import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MedicalEcommerceHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Your trusted source for medical supplies',
      description: 'Shop premium medical products from top brands. Fast shipping, competitive prices, and expert customer support for all your healthcare needs.',
      bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop',
      products: [
        {
          name: 'Digital Thermometer',
          category: 'Diagnostic Tools',
          price: '₹2,499',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop'
        },
        {
          name: 'Blood Pressure Monitor',
          category: 'Health Monitoring',
          price: '₹7,499',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=300&fit=crop'
        },
        {
          name: 'First Aid Kit',
          category: 'Emergency Care',
          price: '₹3,899',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop'
        },
        {
          name: 'Pulse Oximeter',
          category: 'Vital Signs',
          price: '₹3,299',
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      title: 'Professional medical equipment for every need',
      description: 'From diagnostic tools to rehabilitation equipment, find everything you need to maintain optimal health. Certified products with warranty coverage.',
      bgImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&h=1080&fit=crop',
      products: [
        {
          name: 'Stethoscope Pro',
          category: 'Professional Tools',
          price: '₹10,999',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop'
        },
        {
          name: 'Wheelchair Deluxe',
          category: 'Mobility Aid',
          price: '₹29,499',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=400&h=300&fit=crop'
        },
        {
          name: 'Nebulizer Kit',
          category: 'Respiratory Care',
          price: '₹6,799',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop'
        },
        {
          name: 'Massage Gun',
          category: 'Recovery Tools',
          price: '₹13,499',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      title: 'Home healthcare made simple',
      description: 'Monitor your health from the comfort of your home. Easy-to-use devices with mobile app connectivity and real-time health tracking.',
      bgImage: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1920&h=1080&fit=crop',
      products: [
        {
          name: 'Smart Scale',
          category: 'Body Metrics',
          price: '₹4,999',
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400&h=300&fit=crop'
        },
        {
          name: 'Glucose Monitor',
          category: 'Diabetes Care',
          price: '₹8,499',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=400&h=300&fit=crop'
        },
        {
          name: 'Air Purifier',
          category: 'Home Health',
          price: '₹16,999',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop'
        },
        {
          name: 'UV Sterilizer',
          category: 'Sanitization',
          price: '₹4,299',
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      title: 'Emergency care essentials',
      description: 'Be prepared for any situation with our comprehensive emergency medical supplies. Hospital-grade quality for home and workplace safety.',
      bgImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920&h=1080&fit=crop',
      products: [
        {
          name: 'AED Defibrillator',
          category: 'Emergency Equipment',
          price: '₹1,09,999',
          rating: 5.0,
          image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop'
        },
        {
          name: 'Trauma Kit',
          category: 'Emergency Care',
          price: '₹7,599',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop'
        },
        {
          name: 'Oxygen Tank',
          category: 'Respiratory Support',
          price: '₹21,199',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
        },
        {
          name: 'CPR Mask',
          category: 'Life Saving',
          price: '₹2,099',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      title: 'Wellness and personal care',
      description: 'Enhance your daily wellness routine with our curated selection of personal care products. Quality you can trust, results you can feel.',
      bgImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=1080&fit=crop',
      products: [
        {
          name: 'Infrared Thermometer',
          category: 'Quick Screening',
          price: '₹3,399',
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop'
        },
        {
          name: 'Compression Socks',
          category: 'Circulation Support',
          price: '₹1,699',
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop'
        },
        {
          name: 'Heating Pad',
          category: 'Pain Relief',
          price: '₹2,949',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
        },
        {
          name: 'Pill Organizer',
          category: 'Medication Management',
          price: '₹1,249',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50" />
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            backgroundImage: `url(${slides[currentSlide].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: currentSlide ? 'scale(1)' : 'scale(1.1)',
          }}
        />
        
        {/* Overlay Gradient - Reduced opacity */}
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/8 to-white/15"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-400 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-cyan-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Medical Cross Decoration */}
        <div className="absolute top-1/4 right-1/6 transform opacity-5">
          <div className="relative w-32 h-32">
            <div className="absolute top-1/2 left-0 right-0 h-6 bg-teal-400 transform -translate-y-1/2 rounded-full" />
            <div className="absolute left-1/2 top-0 bottom-0 w-6 bg-teal-400 transform -translate-x-1/2 rounded-full" />
          </div>
        </div>
        
        {/* Small Cross Decoration */}
        <div className="absolute bottom-1/4 left-1/4 transform opacity-5">
          <div className="relative w-16 h-16">
            <div className="absolute top-1/2 left-0 right-0 h-3 bg-cyan-500 transform -translate-y-1/2 rounded-full" />
            <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-cyan-500 transform -translate-x-1/2 rounded-full" />
          </div>
        </div>
        
        {/* Floating Circles */}
        <div className="absolute top-1/3 left-1/6 w-4 h-4 bg-teal-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-cyan-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/5 w-5 h-5 bg-teal-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-16 lg:px-24 py-12 h-full">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-teal-500 text-white px-5 py-2.5 rounded text-sm font-semibold uppercase tracking-wide shadow-lg">
                Premium Quality
              </span>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">{slides[currentSlide].title.split(' ').slice(0, -2).join(' ')} </span>
                <span className="text-teal-400">{slides[currentSlide].title.split(' ').slice(-2).join(' ')}</span>
              </h1>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button 
                onClick={() => navigate('/all-medicines')}
                className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                All Medicines
              </button>
              
              <button 
                
                className="w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/40"
              >
                <svg className="w-5 h-5 text-white fill-white ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>

            {/* Available indicator */}
            <div className="flex items-center text-teal-400">
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Free Shipping on Orders Over ₹4,000</span>
            </div>
          </div>
        </div>

        {/* Right side - Phone mockup */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="relative">
            {/* Phone frame */}
            <div className="w-80 h-[640px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700">
              <div className="w-full h-full bg-gradient-to-b from-teal-50 to-cyan-50 rounded-[2.5rem] overflow-hidden">
                {/* Phone status bar */}
                <div className="bg-teal-500 px-6 py-3 flex justify-between items-center text-white text-xs">
                  <span>••• Medical Store</span>
                  <span>9:41 AM</span>
                  <span>100% ⚡︎</span>
                </div>

                {/* App header */}
                <div className="bg-gradient-to-r from-teal-400 to-cyan-400 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-white text-xl font-bold">Featured</h2>
                      <p className="text-teal-50 text-xs">Premium Medical Products</p>
                    </div>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Product grid */}
                <div className="p-4 space-y-3 overflow-y-auto h-[500px] bg-gradient-to-b from-white to-teal-50">
                  {slides[currentSlide].products.map((product, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex gap-3">
                        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center overflow-hidden shadow-md relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-white/10"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-800 font-semibold text-sm mb-1">{product.name}</h3>
                          <p className="text-teal-600 text-xs mb-2">{product.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-600 font-bold text-lg">{product.price}</span>
                            <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-gray-700 text-xs font-semibold">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 transition-all duration-300 ${
                    currentSlide === index ? 'bg-teal-400 h-8 rounded-sm' : 'bg-white/50 hover:bg-white/80 h-2 rounded-sm'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-teal-600 p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-20 shadow-lg hover:shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-teal-600 p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-20 shadow-lg hover:shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-teal-400 w-8 h-2 rounded-sm' 
                : 'bg-white/50 w-2 h-2 hover:bg-white/80 rounded-sm'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}