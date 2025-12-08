import React, { Component, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHome, FaUser, FaStethoscope, FaDiagnoses, FaCheckCircle } from "react-icons/fa";
import Home from "../components/diseasePrediction/Home";
import Patient2 from "../components/diseasePrediction/Patient2";
import Symptom from "../components/diseasePrediction/Symptom";
import Disease from "../components/diseasePrediction/Disease";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import { useNavigate } from "react-router-dom";

class DP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: "Home",
      tab_name: "Welcome",
      tab_progress: 25,
      button_is_disabled: false,
      home_button_checked: false,
      age: localStorage.getItem("age") ? localStorage.getItem("age") : "18",
      button_name: "Next",
      gender: localStorage.getItem("gender")
        ? localStorage.getItem("gender").toUpperCase()
        : "Male",
      home_nav_icon: <FaHome className="text-sm" />,
      patient_nav_icon: <FaUser className="text-sm" />,
      symptom_nav_icon: <FaStethoscope className="text-sm" />,
      disease_nav_icon: <FaDiagnoses className="text-sm" />,
      patient_question: localStorage.getItem("patient_question")
        ? localStorage.getItem("patient_question")
        : [],
      home_nav_value: false,
      patient_nav_value: false,
      symptom_nav_value: false,
      disease_nav_value: false,
      disease_possibility: [],
      user_symptoms: [],
      user_symptom_length: 0,
      analyzingSymptoms: false, // Added state for symptom analysis
    };
    this.symptomRef = React.createRef();
  }

  get_next_page = (e) => {
    switch (this.state.current_page) {
      case "Home":
        return this.setState({
          current_page: "Patient-2",
          tab_progress: 50,
          home_nav_value: true,
          button_is_disabled: true,
          home_button_checked: true,
          button_name: "Next",
        });
      case "Patient-2":
        return this.setState({
          current_page: "Symptom",
          tab_progress: 75,
          button_name: "Analyze Symptoms",
          patient_nav_value: true,
          button_is_disabled: true,
          user_symptom_length: 0,
          home_button_checked: true,
          patient_question: localStorage.getItem("patient_question")
            ? JSON.parse(localStorage.getItem("patient_question"))
            : [],
        });
      case "Symptom":
        if (this.symptomRef.current) {
          this.setState({ analyzingSymptoms: true }); // Set analyzing state
          this.symptomRef.current.sendSymptomsToBackend();
        }
        return;
      case "Disease":
        localStorage.removeItem("patient_question");
        return this.setState({
          tab_progress: 25,
          current_page: "Home",
          button_is_disabled: false,
          home_button_checked: false,
          age: "18",
          button_name: "Next",
          gender: "Male",
          home_nav_icon: <FaHome className="text-sm" />,
          patient_nav_icon: <FaUser className="text-sm" />,
          symptom_nav_icon: <FaStethoscope className="text-sm" />,
          disease_nav_icon: <FaDiagnoses className="text-sm" />,
          home_nav_value: false,
          patient_nav_value: false,
          symptom_nav_value: false,
          disease_nav_value: false,
          disease_possibility: [],
          user_symptoms: [],
          user_symptom_length: 0,
          analyzingSymptoms: false,
        });
      default:
        return null;
    }
  };

  // New method to handle successful symptom analysis
  handleSymptomAnalysisComplete = (predictions) => {
    this.setState({
      current_page: "Disease",
      button_name: "Start Over",
      tab_progress: 100,
      symptom_nav_value: true,
      disease_nav_value: true,
      button_is_disabled: false,
      home_button_checked: true,
      analyzingSymptoms: false,
      disease_possibility: predictions
    });
  };

  // New method to handle symptom analysis error
  handleSymptomAnalysisError = () => {
    this.setState({
      analyzingSymptoms: false,
      button_is_disabled: false
    });
  };

  get_gender = (e) => {
    if (e.target.value === "male") {
      this.setState({
        male: true,
        female: false,
        gender: "Male",
      });
    } else if (e.target.value === "female") {
      this.setState({
        male: false,
        female: true,
        gender: "Female",
      });
    }
  };

  get_age_event = (e) => {
    this.setState({ age: e.target.value });
  };

  patient_2_callback = async (data) => {
    let d = data.filter((key) => {
      return key.answer !== "";
    });
    let avl = data.length !== d.length;
    this.setState({
      patient_question: data,
      button_is_disabled: avl,
      symptom_nav_value: true,
    });
    localStorage.setItem("patient_question", JSON.stringify(data));
  };

  updateSymptoms = (user_symptoms) => {
    this.setState({ user_symptoms });
    this.setState({ user_symptom_length: user_symptoms.length });
    if (user_symptoms.length >= 2) {
      this.setState({ button_is_disabled: false });
    } else {
      this.setState({ button_is_disabled: true });
    }
  };

  updateDiseasePossibility = (disease_possibility) => {
    console.log("Parent received disease predictions:", disease_possibility);
    this.setState({ disease_possibility });
    
    if (disease_possibility && disease_possibility.length > 0) {
      // Automatically navigate to Disease page when predictions are received
      this.setState({
        current_page: "Disease",
        button_name: "Start Over",
        tab_progress: 100,
        symptom_nav_value: true,
        disease_nav_value: true,
        button_is_disabled: false,
        home_button_checked: true,
        analyzingSymptoms: false
      });
    } else {
      // Keep button enabled even if no predictions to allow navigation
      this.setState({ 
        button_is_disabled: false,
        analyzingSymptoms: false 
      });
    }
  };

  home_button_check_event = (e) => {
    if (e.target.checked === true) {
      return this.setState({
        button_is_disabled: false,
        home_button_checked: true,
        home_nav_value: true,
        patient_nav_value: true,
      });
    } else if (e.target.checked === false) {
      return this.setState({
        button_is_disabled: true,
        home_button_checked: false,
        home_nav_value: false,
        patient_nav_value: false,
      });
    }
  };

  get_previous_page = (e) => {
    switch (this.state.current_page) {
      case "Disease":
        return this.setState({
          current_page: "Symptom",
          button_name: "Analyze Symptoms",
          tab_progress: 75,
          disease_nav_value: false,
          user_symptoms: [],
          user_symptom_length: 0,
          button_is_disabled: false,
          home_button_checked: true,
          disease_possibility: [],
          analyzingSymptoms: false,
        });
      case "Symptom":
        return this.setState({
          current_page: "Patient-2",
          tab_progress: 50,
          button_name: "Next",
          button_is_disabled: true,
          home_button_checked: true,
          patient_nav_value: false,
          disease_possibility: [],
          user_symptoms: [],
          user_symptom_length: 0,
          analyzingSymptoms: false,
        });
      case "Patient-2":
        return this.setState({
          current_page: "Home",
          button_name: "Next",
          home_nav_value: false,
          button_is_disabled: false,
          home_button_checked: false,
          user_symptoms: [],
          user_symptom_length: 0,
          tab_progress: 25,
          analyzingSymptoms: false,
        });
      default:
        return null;
    }
  };

  showPage = () => {
    const { current_page, home_button_checked, age, gender, disease_possibility, analyzingSymptoms } = this.state;
    
    switch (current_page) {
      case "Home":
        return (
          <Home
            isChecked={home_button_checked}
            checked={this.home_button_check_event}
          />
        );
      case "Patient-2":
        return <Patient2 callback={this.patient_2_callback} />;
      case "Symptom":
        return (
          <Symptom
            ref={this.symptomRef}
            userSymptoms={this.state.user_symptoms}
            disease_possibility={this.state.disease_possibility}
            getPossibleDisease={this.symptomInfoCallback}
            pageCallback={this.symptom_page_button_callback}
            setResult={(result) => this.setState({ result })}
            updateDiseasePossibility={this.updateDiseasePossibility}
            updateSymptoms={this.updateSymptoms}
            onAnalysisComplete={this.handleSymptomAnalysisComplete}
            onAnalysisError={this.handleSymptomAnalysisError}
          />
        );
      case "Disease":
        return disease_possibility && disease_possibility.length > 0 ? (
          <Disease
            patientInfo={this.state.patient_question}
            disease_possibility={disease_possibility}
            gender={gender}
            age={age}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-center max-w-md">
              {analyzingSymptoms ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-3 mx-auto"></div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    Analyzing Symptoms
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Processing your symptoms with AI...
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    No Predictions Available
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    No disease predictions were generated for your symptoms.
                  </p>
                  <button
                    onClick={this.get_previous_page}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Back to Symptoms
                  </button>
                </>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const {
      tab_progress,
      button_is_disabled,
      current_page,
      home_button_checked,
      button_name,
      analyzingSymptoms,
    } = this.state;

    const steps = [
      { key: "Home", label: "Welcome", icon: FaHome, progress: 25 },
      { key: "Patient-2", label: "Patient", icon: FaUser, progress: 50 },
      { key: "Symptom", label: "Symptoms", icon: FaStethoscope, progress: 75 },
      { key: "Disease", label: "Results", icon: FaDiagnoses, progress: 100 },
    ];

    // Determine if next button should be disabled
    const isNextDisabled = current_page === "Symptom" 
      ? (analyzingSymptoms || button_is_disabled)
      : (!home_button_checked || button_is_disabled);

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto px-3">
          {/* Compact Header */}
          <div className="text-center pt-4 pb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full shadow-md mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-1">
              Disease Prediction
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xl mx-auto">
              AI-powered symptom analysis for preliminary diagnosis
            </p>
          </div>

          <div className="flex gap-4 mb-2">
            {/* Vertical Progress Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 flex-shrink-0">
              <div className="flex flex-col items-center space-y-3">
                {steps.map((step, index) => {
                  const isActive = tab_progress >= step.progress;
                  const isCurrent = current_page === step.key;
                  const IconComponent = step.icon;
                  
                  return (
                    <div key={step.key} className="flex flex-col items-center relative">
                      <div className="flex flex-col items-center">
                        <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-400 to-teal-600 border-teal-100 dark:border-teal-900 text-white shadow-md'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-400'
                        } ${isCurrent ? 'ring-2 ring-teal-200 dark:ring-teal-800 scale-105' : ''}`}>
                          {isActive ? (
                            <FaCheckCircle className="text-sm" />
                          ) : (
                            <IconComponent className="text-sm" />
                          )}
                        </div>
                        
                        {index < steps.length - 1 && (
                          <div 
                            className={`w-1 h-8 rounded-full my-1 ${
                              tab_progress > step.progress 
                                ? 'bg-gradient-to-b from-teal-400 to-teal-600' 
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          />
                        )}
                      </div>
                      
                      <span className={`text-xs font-medium mt-1 text-center ${
                        isCurrent 
                          ? 'text-teal-600 dark:text-teal-400 font-semibold' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compact Main Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex-1">
              <div className="p-5 min-h-[350px] max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100 dark:scrollbar-thumb-teal-600 dark:scrollbar-track-gray-700">
                {this.showPage()}
              </div>

              {/* Compact Navigation */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-900">
                <div className="flex justify-between items-center">
                  <button
                    disabled={current_page === "Home" || analyzingSymptoms}
                    onClick={this.get_previous_page}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      current_page === "Home" || analyzingSymptoms
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <FaArrowLeft className="text-xs" />
                    <span>Back</span>
                  </button>

                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Step {Math.floor(tab_progress / 25)} of 4
                  </span>

                  <button
                    disabled={isNextDisabled}
                    onClick={this.get_next_page}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isNextDisabled
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    <span>
                      {analyzingSymptoms ? "Analyzing..." : button_name}
                    </span>
                    {!analyzingSymptoms && <FaArrowRight className="text-xs" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Disclaimer */}
          <div className="text-center p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800">
            <p className="text-xs text-teal-700 dark:text-teal-300">
              🩺 Preliminary analysis only. Consult a healthcare professional for diagnosis.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const DiseasePrediction = () => {
  const { isLoading, toggleLoading } = useContext(commonContext);
  const navigate = useNavigate();

  const userNotExists =
    !localStorage.getItem("username") ||
    localStorage.getItem("username") === "undefined";

  useEffect(() => {
    if (userNotExists) {
      navigate("/");
    } else {
      toggleLoading(true);
      setTimeout(() => toggleLoading(false), 2000);
    }
  }, []);

  useScrollDisable(isLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return <DP />;
};

export default DiseasePrediction;