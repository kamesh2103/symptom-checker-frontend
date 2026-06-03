import React, { Component } from "react";
import { Diseases } from "../../data/diseases";
import { Symptoms } from "../../data/symptoms";

class Symptom extends Component {
  state = {
    gender: this.props.gender,
    age: this.props.age,
    user_symptoms: this.props.userSymptoms || [],
    disease_possibility: this.props.disease_possibility || [],
    searched: "",
    loading: false,
    error: null
  };

  API_URL = "https://disease-predictor-model.onrender.com/predict";

  sendSymptomsToBackend = () => {
    if (!this.state.user_symptoms || this.state.user_symptoms.length === 0) {
      alert("Please select at least one symptom before proceeding.");
      return;
    }

    // Set loading state
    this.setState({ loading: true, error: null });

    fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.user_symptoms),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then(errorData => {
              throw new Error(errorData.error || 'Bad request');
            });
          }
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Full API Response:", result);

        // FIXED: Handle the actual response structure
        let predictions = [];

        if (result && result.predictions && Array.isArray(result.predictions)) {
          // Response has predictions array
          predictions = result.predictions;
          console.log("Extracted predictions from result.predictions:", predictions);
        } else if (result && Array.isArray(result)) {
          // Direct array response (fallback)
          predictions = result;
          console.log("Extracted predictions from direct array:", predictions);
        } else {
          console.log("No valid predictions found in response");
        }

        this.setState({
          disease_possibility: predictions,
          loading: false
        });
        this.props.updateDiseasePossibility(predictions);

        // Show message if no predictions found
        if (predictions.length === 0) {
          alert("No disease predictions found for the given symptoms.");
        }
      })
      .catch((error) => {
        console.error("Error sending symptoms:", error);
        this.setState({
          error: error.message,
          loading: false,
          disease_possibility: []
        });

        if (error.message.includes('recognized symptoms') ||
          error.message.includes('symptom combination') ||
          error.message.includes('Bad request')) {
          alert(`Prediction failed: ${error.message}`);
        } else {
          alert("Failed to connect to the prediction service. Please try again.");
        }

        this.props.updateDiseasePossibility([]);
      });
  };

  addSymptom = (symptom) => {
    if (!this.state.user_symptoms.includes(symptom)) {
      this.setState(
        (prevState) => {
          const newSymptoms = [symptom, ...prevState.user_symptoms];
          return {
            user_symptoms: newSymptoms,
            searched: "",
            error: null
          };
        },
        () => {
          this.props.updateSymptoms(this.state.user_symptoms);
          // Clear previous predictions when symptoms change
          if (this.state.disease_possibility.length > 0) {
            this.setState({ disease_possibility: [] });
            this.props.updateDiseasePossibility([]);
          }
        }
      );
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searched: e.target.value });
  };

  on_click_reset_button = () => {
    this.setState(
      {
        user_symptoms: [],
        disease_possibility: [],
        error: null,
        loading: false
      },
      () => {
        this.props.updateSymptoms([]);
        this.props.updateDiseasePossibility([]);
      }
    );
  };

  deleteSymptomButtonEvent = (symptomToDelete) => {
    this.setState(
      (prevState) => ({
        user_symptoms: prevState.user_symptoms.filter(
          (s) => s !== symptomToDelete
        ),
        error: null
      }),
      () => {
        this.props.updateSymptoms(this.state.user_symptoms);
        // Clear predictions when symptoms are removed
        if (this.state.disease_possibility.length > 0) {
          this.setState({ disease_possibility: [] });
          this.props.updateDiseasePossibility([]);
        }
      }
    );
  };

  testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:7000/health');
      if (response.ok) {
        console.log("Backend connection successful");
        return true;
      }
    } catch (error) {
      console.error("Backend connection failed:", error);
      alert("Cannot connect to prediction service. Please make sure the backend server is running on port 7000.");
      return false;
    }
  };

  componentDidMount() {
    this.testBackendConnection();
  }

  render() {
    const { user_symptoms, searched, loading, error } = this.state;

    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-teal-700 dark:text-white mb-2">
            Select Your Symptoms
          </h1>
          <p className="text-teal-600 dark:text-teal-200 text-sm">
            Search and choose symptoms you're experiencing
          </p>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                <span className="text-teal-800 dark:text-white">Analyzing symptoms...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Section */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-teal-800 dark:text-white mb-1">
                Search Symptoms
              </label>
              <input
                className="w-full p-2 border border-teal-300 dark:border-gray-600 rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white dark:bg-gray-700 text-teal-900 dark:text-white text-sm"
                type="text"
                value={searched}
                onChange={this.handleSearchChange}
                placeholder="Type symptom name..."
                disabled={loading}
              />
            </div>

            {/* Symptoms List */}
            <div className="h-60 overflow-y-auto border border-teal-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
              <div className="p-2 space-y-1">
                {Symptoms.filter((symptom) =>
                  symptom.toLowerCase().includes(searched.toLowerCase())
                ).map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => this.addSymptom(symptom)}
                    className="w-full p-2 text-left text-teal-800 dark:text-white rounded-md hover:bg-teal-50 dark:hover:bg-gray-600 transition-colors text-sm disabled:opacity-50"
                    disabled={loading}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Symptoms */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-teal-800 dark:text-white">
                Selected Symptoms
              </label>
              <span className="text-xs text-teal-600 dark:text-teal-300">
                {user_symptoms.length} selected
              </span>
            </div>

            <div className="h-60 overflow-y-auto border border-teal-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 p-3">
              {user_symptoms.length === 0 ? (
                <div className="text-center text-teal-500 dark:text-teal-300 py-6">
                  <p className="text-sm">No symptoms selected yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {user_symptoms.map((symptom) => (
                    <div
                      key={symptom}
                      className="flex items-center justify-between p-2 bg-teal-50 dark:bg-gray-600 rounded-md"
                    >
                      <span className="text-teal-800 dark:text-white text-sm">
                        {symptom}
                      </span>
                      <button
                        onClick={() => this.deleteSymptomButtonEvent(symptom)}
                        className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                        disabled={loading}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={this.on_click_reset_button}
            className="px-5 py-2 b text-white font-medium rounded-lg border border-teal-700 transition-all duration-200 transform hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            disabled={user_symptoms.length === 0 || loading}
          >
            Reset All
          </button>
        </div>

        {/* Debug Info - Remove in production */}
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Debug Info:</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Selected Symptoms: {user_symptoms.length} |
            Current Predictions: {this.state.disease_possibility.length}
          </p>
        </div>
      </div>
    );
  }
}

export default Symptom;
