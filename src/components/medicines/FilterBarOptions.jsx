import React, { useContext, useState } from "react";
import filtersContext from "../../contexts/filters/filterContext";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const FilterBarOptions = () => {
  const {
    sortedValue,
    setSortedValue,
    handlePrice,
    selectedPrice: { price, minPrice, maxPrice },
    mobFilterBar: { isMobSortVisible, isMobFilterVisible },
    handleMobSortVisibility,
    handleMobFilterVisibility,
    handleClearFilters,
  } = useContext(filtersContext);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const sortMenu = [
    {
      id: 1,
      title: "Latest",
    },
    {
      id: 2,
      title: "Price(Lowest First)",
    },
    {
      id: 3,
      title: "Price(Highest First)",
    },
  ];

  return (
    <div className="dark:bg-black-0">
      {/*===== Desktop Horizontal Layout with Dropdowns =====*/}
      <div className="hidden lg:flex items-center gap-6">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white-1 dark:bg-black-10 border border-black-2 dark:border-black-20 rounded-lg hover:bg-teal-200 dark:hover:bg-black-20 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-black-2 dark:text-white-1">
              {sortedValue || "Sort By"}
            </span>
            {isSortOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-grey-5 hover:text-grey-5" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-grey-5" />
            )}
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white-1 dark:bg-black-10 border border-grey-3 dark:border-black-20 rounded-lg shadow-lg z-50">
              <div className="p-2 space-y-1">
                {sortMenu.map((item) => {
                  const { id, title } = item;
                  return (
                    <button
                      key={id}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 ${
                        sortedValue === title
                          ? "bg-gradient-to-r from-teal-400 to-teal-600 text-white-1 shadow-md"
                          : "hover:bg-teal-50 dark:hover:bg-black-20 text-black-2 dark:text-white-1"
                      }`}
                      onClick={() => {
                        setSortedValue(title);
                        setIsSortOpen(false);
                      }}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Price Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white-1 dark:bg-black-10 border border-grey-3 dark:border-black-20 rounded-lg hover:bg-teal-200 dark:hover:bg-black-20 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-black-2 dark:text-white-1">
              Price: ₹{price}
            </span>
            {isPriceOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-grey-5" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-grey-5" />
            )}
          </button>

          {isPriceOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white-1 dark:bg-black-10 border border-grey-3 dark:border-black-20 rounded-lg shadow-lg z-50 p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-grey-5 dark:text-grey-4">Min: ₹{minPrice}</span>
                  <span className="text-grey-5 dark:text-grey-4">Max: ₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={price}
                  onChange={handlePrice}
                  className="w-full h-2 bg-teal-200 dark:bg-black-20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-teal-400 [&::-webkit-slider-thumb]:to-teal-600"
                />
                <div className="text-center">
                  <span className="text-sm font-medium bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                    ₹{price}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {(sortedValue || price !== maxPrice) && (
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-400 to-teal-600 text-white-1 border border-teal-500 rounded-lg hover:from-teal-500 hover:to-teal-700 transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/*===== Mobile Layout =====*/}
      <div className="lg:hidden">
        {/* Clear-Filters btn */}
        {(sortedValue || price !== maxPrice) && (
          <div className="">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white-1 px-4 py-3 rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out hover:from-teal-500 hover:to-teal-700 active:bg-teal-700 max-lg:mt-5 shadow-md hover:shadow-lg"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="max-lg:grid max-lg:grid-cols-2 gap-5">
          {/*===== Sort-menu =====*/}
          <div
            className={`w-full py-8 bg-white dark:bg-black-10 max-lg:col-span-1 ${
              isMobSortVisible ? "block" : ""
            }`}
          >
            {/* sort_head */}
            <div className="max-lg:flex max-lg:justify-between max-lg:items-center flex justify-between">
              <h3 className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-semibold">Sort By</h3>
              {/* close_btn */}
              <button
                type="button"
                className="text-[2rem] leading-5 cursor-pointer inline-block text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                onClick={() => handleMobSortVisibility(false)}
              >
                &times;
              </button>
            </div>

            <div className="mt-4 mb-4 border-t-[1px] border-grey-2 dark:border-teal-800"></div>

            <ul className="space-y-4">
              {sortMenu.map((item) => {
                const { id, title } = item;
                return (
                  <li
                    key={id}
                    className={`cursor-pointer transition-colors duration-200 ${
                      sortedValue === title
                        ? "bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-bold"
                        : "hover:bg-gradient-to-r hover:from-teal-400 hover:to-teal-600 hover:bg-clip-text hover:text-transparent dark:hover:text-teal-300"
                    }`}
                    onClick={() => setSortedValue(title)}
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </div>

          {/*===== Filter-menu =====*/}
          <div
            className={`w-full py-8 bg-white dark:bg-black-10 max-lg:col-span-1 ${
              isMobFilterVisible ? "block" : "inline-block"
            }`}
          >
            <div className="max-lg:flex max-lg:justify-between max-lg:items-center flex justify-between">
              <h3 className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-semibold">Filter By</h3>
              <button
                type="button"
                className="text-[2rem] leading-5 cursor-pointer inline-block text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                onClick={() => handleMobFilterVisibility(false)}
              >
                &times;
              </button>
            </div>

            <div className="mt-4 mb-4 border-t-[1px] border-grey-2 dark:border-teal-800"></div>

            {/* Filter by Price */}
            <div className="mb-10 last:mb-0">
              <h4 className="text-black-2 dark:text-white-1 mb-3">Price</h4>
              <div>
                <p className="font-semibold mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">₹ {price}</p>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={price}
                  onChange={handlePrice}
                  className="w-full h-2 bg-grey-3 dark:bg-teal-900 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-teal-400 [&::-webkit-slider-thumb]:to-teal-600"
                />
                <div className="flex justify-between text-xs text-grey-5 dark:text-teal-400 mt-1">
                  <span>₹{minPrice}</span>
                  <span>₹{maxPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBarOptions;