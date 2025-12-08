import React, { useContext, useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import FilterBar from "../components/medicines/FilterBar";
import ProductCard from "../components/medicines/ProductCard";
import filtersContext from "../contexts/filters/filterContext";
import EmptyView from "../components/common/EmptyView";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";

const AllMedicines = () => {
  const { isLoading, toggleLoading } = useContext(commonContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useDocTitle("All Medicines");

  const navigate = useNavigate();
  const userNotExists =
    localStorage.getItem("usertype") === undefined ||
    localStorage.getItem("usertype") === null;

  useEffect(() => {
    if (userNotExists) {
      navigate("/");
    } else {
      toggleLoading(true);
      setTimeout(() => toggleLoading(false), 2000);
    }
    //eslint-disable-next-line
  }, []);

  useScrollDisable(isLoading);

  const { allProducts } = useContext(filtersContext);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="dark:bg-black-6 min-h-screen">
      {/* Header Section with Horizontal FilterBar */}
      <header className={`sticky top-0 z-40 bg-white-1 dark:bg-black-10 shadow-sm transition-all duration-300 ${isSearchExpanded ? 'pb-4' : ''}`}>
        <div className="container mx-auto">
          {/* Header Content - Filters on Left, Search on Right */}
          <div className={`px-4 transition-all duration-300 ${isSearchExpanded ? 'pt-4' : 'py-3'}`}>
            <div className="flex items-center justify-between">
              {/* Left Side - Filters */}
              {!isSearchExpanded && (
                <div className="flex-1">
                  <FilterBar />
                </div>
              )}
              
              {/* Right Side - Search Bar */}
              <div className={`${isSearchExpanded ? 'w-full' : 'w-auto'}`}>
                <SearchBar 
                  onSearchExpand={() => setIsSearchExpanded(true)}
                  onSearchCollapse={() => setIsSearchExpanded(false)}
                  isExpanded={isSearchExpanded}
                />
              </div>
            </div>
          </div>
          
          {/* Expanded Search Results Area */}
          {isSearchExpanded && (
            <div className="px-4 transition-all duration-300">
              {/* Search results will appear here from SearchBar component */}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Products Section */}
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <EmptyView
              icon={<BsExclamationCircle className="dark:text-yellow-1" />}
              msg="No Results Found"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AllMedicines;