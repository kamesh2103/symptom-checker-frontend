import React from "react";

const Home = (props) => {
  return (
    <>
      <div className="max-w-[500px] mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-white mb-4">
            Symptom Checker
          </h1>
          <p className="text-blue-700 dark:text-white-9 text-lg leading-relaxed">
            Before using this symptom checker, please read carefully and accept
            our Terms and Services:
          </p>
        </div>

        {/* Terms List */}
        <div className="mb-8">
          <ul className="space-y-3">
            <li className="flex items-start p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <span className="text-blue-500 mr-3 mt-1">🔹</span>
              <span className="text-blue-700 dark:text-white-9">
                This checkup is not a diagnosis.
              </span>
            </li>
            <li className="flex items-start p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <span className="text-blue-500 mr-3 mt-1">🔹</span>
              <span className="text-blue-700 dark:text-white-9">
                This checkup is for informational purposes and is not a qualified
                medical opinion.
              </span>
            </li>
            <li className="flex items-start p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <span className="text-blue-500 mr-3 mt-1">🔹</span>
              <span className="text-blue-700 dark:text-white-9">
                Information that you provide is anonymous and not shared with
                anyone.
              </span>
            </li>
          </ul>
        </div>

        {/* Agreement Form */}
        <form className="mb-8">
          <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <input
              checked={props.isChecked}
              onChange={props.checked}
              className="mt-1 mr-4 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              id="truth"
              type="checkbox"
              name="historical-figures-1"
              value="truth"
            />
            <label
              className="text-blue-800 dark:text-white-9 text-lg cursor-pointer select-none"
              htmlFor="truth"
            >
              I agree to the TelMedSphere terms and conditions
            </label>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 bg-gradient-to-r from-[#A9D6E5] to-[#3a7ca5] hover:bg-gradient-to-r from-[#3a7ca5] to-[#A9D6E5] text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={props.onContinue}
            disabled={!props.isChecked}
          >
            Continue
          </button>
          
          <button
            className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-600 hover:bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;