
import React, { Component } from "react";
import { FaUser, FaBirthdayCake, FaStethoscope, FaClinicMedical, FaShieldAlt, FaExclamationTriangle, FaExternalLinkAlt } from "react-icons/fa";

class Disease extends Component {
  state = {
    gender: this.props.gender,
    age: this.props.age,
    patientInfo:
      JSON.parse(localStorage.getItem("patient_question") || "[]") ||
      this.props.patientInfo ||
      [],
    disease_possibility: this.props.disease_possibility || [],
  };

  get_current_html = () => {
    const filtered_list = this.state.disease_possibility.filter(
      (e) => e.probability
    );
    filtered_list.sort(
      (a, b) =>
        b.probability - a.probability || a.disease.localeCompare(b.disease)
    );

    return filtered_list.length !== 0 ? (
      <div className="space-y-6">
        {/* Patient Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
              <FaUser className="text-teal-600 dark:text-teal-400 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Patient Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <FaUser className="text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
                <p className="font-semibold text-gray-800 dark:text-white">{this.state.gender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <FaBirthdayCake className="text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                <p className="font-semibold text-gray-800 dark:text-white">{this.state.age} years</p>
              </div>
            </div>
          </div>

          {this.state.patientInfo.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                <FaStethoscope className="text-teal-600 dark:text-teal-400" />
                <span>Medical History</span>
              </h3>
              <div className="space-y-3">
                {this.state.patientInfo.map((key, id) => (
                  <div
                    key={id}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <p className="font-medium text-gray-800 dark:text-white mb-2">{key.question}</p>
                    <p className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-600 p-2 rounded border">
                      {key.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Diagnosis Report */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
              <FaClinicMedical className="text-teal-600 dark:text-teal-400 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Diagnosis Report</h2>
          </div>

          <div className="space-y-6">
            {filtered_list.map((key, id) => (
              <div
                key={id}
                className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Disease Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-3 lg:mb-0">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {key.disease}
                    </h3>
                    <a
                      href={`https://en.wikipedia.org/wiki/${key.name || key.disease.replace(/\s+/g, '_')}`}
                      title="Learn more on Wikipedia"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white p-2 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  </div>
                  
                  {/* Probability Section */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Probability</span>
                      <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                        {(key.probability * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${key.probability * 100}%` }}
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center space-x-2">
                    <FaStethoscope className="text-teal-600 dark:text-teal-400" />
                    <span>Description</span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {key.description}
                  </p>
                </div>

                {/* Precautions */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                    <FaShieldAlt className="text-teal-600 dark:text-teal-400" />
                    <span>Recommended Precautions</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {key.precautions.map((precaution, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                        <span className="text-teal-800 dark:text-teal-300 text-sm">
                          {precaution}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-full flex-shrink-0">
              <FaExclamationTriangle className="text-amber-600 dark:text-amber-400 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                Important Medical Disclaimer
              </h3>
              <p className="text-amber-700 dark:text-amber-400 mb-3">
                This AI-powered analysis is for informational purposes only and should not be considered as medical advice.
              </p>
              <div className="space-y-2 text-amber-700 dark:text-amber-400 text-sm">
                <p>• Always consult with qualified healthcare professionals for medical diagnosis</p>
                <p>• In case of emergency, contact your local emergency services immediately</p>
                <p>• Follow your doctor's recommendations for treatment and medication</p>
              </div>
              <button className="mt-4 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                Find Healthcare Providers Near You
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="space-y-6">
        {/* Patient Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
              <FaUser className="text-teal-600 dark:text-teal-400 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Patient Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <FaUser className="text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
                <p className="font-semibold text-gray-800 dark:text-white">{this.state.gender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <FaBirthdayCake className="text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                <p className="font-semibold text-gray-800 dark:text-white">{this.state.age} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* No Results Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="bg-teal-100 dark:bg-teal-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaStethoscope className="text-teal-600 dark:text-teal-400 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            No Clear Diagnosis Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto leading-relaxed">
            We couldn't determine possible diseases based on the provided symptoms. 
            This could be due to insufficient symptom information or symptoms that 
            don't match known disease patterns.
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <button className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
              Retry with Different Symptoms
            </button>
            <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Consult Healthcare Professional
            </button>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-full flex-shrink-0">
              <FaExclamationTriangle className="text-amber-600 dark:text-amber-400 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                Important Medical Disclaimer
              </h3>
              <p className="text-amber-700 dark:text-amber-400">
                Always visit a doctor if you have any symptoms of a disease or call your local hospital. 
                This tool is for informational purposes only and does not replace professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div id="Disease" className="max-w-6xl mx-auto">
        {this.get_current_html()}
      </div>
    );
  }
}

export default Disease;