import React, { useContext, useRef, useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import filtersContext from "../../contexts/filters/filterContext";
import FilterBarOptions from "./FilterBarOptions";

const FilterBar = () => {
  const { handleMobSortVisibility, handleMobFilterVisibility } =
    useContext(filtersContext);
  const footerRef = useRef(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Horizontal FilterBar - Desktop - Left Side */}
      <div className="hidden lg:block">
        <div className="flex items-center">
          {/* Filter Title */}
          <div className="flex items-center mr-6">
            <BiFilterAlt className="w-5 h-5 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mr-2" />
            <h3 className="font-semibold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent text-sm">
              Filters
            </h3>
          </div>
          
          {/* Horizontal Filter Options */}
          <div className="flex items-center gap-4">
            <FilterBarOptions />
          </div>
        </div>
      </div>

      {/* Mobile FilterBar */}
      {!isFooterVisible && (
        <div
          id="filterbar_mob"
          className="lg:hidden fixed z-[99] bottom-0 left-0 w-full p-4 bg-white-1 dark:bg-black-0 shadow-[0_-8px_15px_rgba(0,0,0,0.5)] dark:shadow-[0_-2px_10px_2px_rgba(13,148,136,0.3)] max-h-[30vh] overflow-y-auto border-t border-teal-200 dark:border-teal-800"
        >
          <div className="flex justify-around items-center text-sm mb-4">
            <h3
              className="flex items-center cursor-pointer bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-medium hover:from-teal-500 hover:to-teal-700 transition-all duration-200"
              onClick={() => handleMobSortVisibility(true)}
            >
              <BiFilterAlt className="w-5 h-5 text-teal-500" />
              <span className="ml-2">Sort</span>
            </h3>
            <span className="text-teal-400">|</span>
            <h3
              className="flex items-center cursor-pointer bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-medium hover:from-teal-500 hover:to-teal-700 transition-all duration-200"
              onClick={() => handleMobFilterVisibility(true)}
            >
              <BiFilterAlt className="w-5 h-5 text-teal-500" />
              <span className="ml-2">Filter</span>
            </h3>
          </div>
          <FilterBarOptions />
        </div>
      )}

      {/* Footer reference */}
      <div ref={footerRef} id="footer-observer" className="absolute bottom-0" />
    </>
  );
};

export default FilterBar;