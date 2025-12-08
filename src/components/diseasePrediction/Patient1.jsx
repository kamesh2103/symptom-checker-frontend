import React from "react";

const Patient = ({ age, ageChange, male, female, gender }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Age Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
        <form className="usa-form">
          <label className="usa-label text-lg font-semibold text-teal-700 dark:text-white mb-3" htmlFor="range-slider">
            What is your age?
          </label>
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block min-w-[80px]">
              {age}
            </span>
            <span className="text-md text-gray-600 dark:text-gray-400 ml-2">years</span>
          </div>
          <input 
            id="range-slider" 
            className="usa-range w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg appearance-none cursor-pointer slider-thumb" 
            type="range" 
            min="0" 
            max="120" 
            value={age} 
            onChange={ageChange} 
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>0</span>
            <span>60</span>
            <span>120</span>
          </div>
        </form>
      </div>

      {/* Gender Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
        <p className="text-lg font-semibold text-teal-700 dark:text-white mb-4">
          What is your sex?
        </p>
        <form className="usa-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`usa-radio p-3 border-2 rounded-lg transition-all duration-300 cursor-pointer ${
              male 
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
            }`}>
              <input 
                className="usa-radio__input absolute opacity-0" 
                id="male" 
                type="radio" 
                checked={male} 
                onChange={gender} 
                name="gender" 
                value="male" 
              />
              <label 
                className="usa-radio__label flex items-center cursor-pointer text-md font-medium text-teal-800 dark:text-white" 
                htmlFor="male"
              >
                <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                  male 
                    ? 'border-teal-500 bg-teal-500' 
                    : 'border-gray-400 dark:border-gray-500'
                }`}>
                  {male && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
                Male
              </label>
            </div>
            
            <div className={`usa-radio p-3 border-2 rounded-lg transition-all duration-300 cursor-pointer ${
              female 
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
            }`}>
              <input 
                className="usa-radio__input absolute opacity-0" 
                id="female" 
                type="radio" 
                checked={female} 
                onChange={gender} 
                name="gender" 
                value="female" 
              />
              <label 
                className="usa-radio__label flex items-center cursor-pointer text-md font-medium text-teal-800 dark:text-white" 
                htmlFor="female"
              >
                <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                  female 
                    ? 'border-teal-500 bg-teal-500' 
                    : 'border-gray-400 dark:border-gray-500'
                }`}>
                  {female && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
                Female
              </label>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0d9488, #14b8a6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0d9488, #14b8a6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Patient;