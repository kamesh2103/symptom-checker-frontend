import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import medicinesData from "../../data/medicinesData";

const FeaturedSlider = () => {
  const scrollContainerRef = useRef(null);

  // Scroll handlers
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const featuredMedicines = medicinesData.slice(0, 5);

  return (
    <section className="py-10 px-4">
      <div
        className="container mx-auto text-center mb-8"
        style={{ maxWidth: "1370px" }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Featured Medicines
        </h2>
        <p className="text-lg text-gray-600">
          Discover our carefully selected range of premium medicines, trusted by
          healthcare professionals and customers for their quality and
          effectiveness.
        </p>
      </div>

      <div className="container mx-auto px-4" style={{ maxWidth: "1370px" }}>
        <div className="relative">
          {/* Navigation arrows */}
          <div className="flex justify-end mb-4 space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-xl border-2 bg-white text-black hover:bg-gray-100 transition-colors duration-300"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-lg" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-xl border-2 bg-white text-black hover:bg-gray-100 transition-colors duration-300"
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-lg" />
            </button>
          </div>

          {/* Product grid */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex space-x-6 scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredMedicines.map((medicine) => (
              <Link
                key={medicine.id}
                to={`/all-medicines/medicine-details/${medicine.id}`}
                className="block flex-shrink-0"
              >
                <div className="w-64 h-80 rounded-lg overflow-hidden shadow-lg relative snap-start group transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer">
                  {/* Medicine Image */}
                  <img
                    src={medicine.images[0]}
                    alt={medicine.title}
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-sm bg-black/20"></div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-300"></div>

                  {/* Medicine Information */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="text-white p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-medium text-lg group-hover:text-yellow-300 transition-colors duration-300 line-clamp-1"></h3>
                      <p className="text-white mb-2 group-hover:text-blue-200 transition-colors duration-300 line-clamp-2">
                        {medicine.title}
                      </p>
                      <p className="mt-1 text-xl font-bold group-hover:text-green-300 transition-colors duration-300">
                        ₹{medicine.price} /-
                      </p>
                    </div>
                  </div>

                  {/* Shimmer Effect - Fixed alignment */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;