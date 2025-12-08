import React, { Component } from "react";

class Patient2 extends Component {
  state = {
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
    next_button_available: "",
    all_answer: [],
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        const allAnswered = [
          "question_1",
          "question_2",
          "question_3",
          "question_4",
          "question_5",
          "question_6",
        ].every((key) => this.state[key] !== "");

        const allAnswers = [
          {
            question: "Patient is overweight or obese",
            answer: this.state.question_1,
          },
          {
            question: "Patient smokes cigarettes",
            answer: this.state.question_2,
          },
          {
            question: "Patient has been recently injured",
            answer: this.state.question_3,
          },
          {
            question: "Patient has high cholesterol",
            answer: this.state.question_4,
          },
          {
            question: "Patient has hypertension",
            answer: this.state.question_5,
          },
          { question: "Patient has diabetes", answer: this.state.question_6 },
        ];

        this.setState(
          {
            next_button_available: allAnswered ? "Available" : "Not available",
            all_answer: allAnswers,
          },
          () => {
            this.props.callback(allAnswers, this.state.next_button_available);
          }
        );
      }
    );
  };

  render() {
    const questions = [
      {
        title: "I am overweight",
        stateKey: "question_1",
        name: "question_1",
      },
      {
        title: "I smoke cigarettes",
        stateKey: "question_2",
        name: "question_2",
      },
      {
        title: "I have been recently injured",
        stateKey: "question_3",
        name: "question_3",
      },
      {
        title: "I have high cholesterol",
        stateKey: "question_4",
        name: "question_4",
      },
      {
        title: "I have hypertension",
        stateKey: "question_5",
        name: "question_5",
      },
      {
        title: "I have diabetes",
        stateKey: "question_6",
        name: "question_6",
      },
    ];

    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 rounded-xl p-5 mb-6 text-white">
          <h2 className="text-xl font-bold mb-2">
            Medical History Assessment
          </h2>
          <p className="text-teal-50 text-md">
            Please check all the statements below that apply to you
          </p>
          <p className="text-teal-100 mt-1 text-sm">
            Select one answer in each row
          </p>
        </div>

        {/* Questions Grid */}
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div 
              key={question.name} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start mb-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">
                  {index + 1}
                </div>
                <p className="text-md font-semibold text-teal-700 dark:text-white">
                  {question.title}
                </p>
              </div>
              
              <div className="flex gap-4 items-center flex-wrap">
                {[
                  { value: "Yes", label: "Yes", color: "bg-red-500" },
                  { value: "No", label: "No", color: "bg-green-500" },
                  { value: "Patient doesn't know", label: "I don't know", color: "bg-yellow-500" },
                ].map((option) => (
                  <label
                    key={`${question.name}-${option.value}`}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name={question.name}
                        value={option.value}
                        checked={this.state[question.stateKey] === option.value}
                        onChange={this.handleOnChange}
                        className="appearance-none w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full checked:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                        style={{
                          backgroundColor: this.state[question.stateKey] === option.value ? 
                            option.color === "bg-red-500" ? "#ef4444" :
                            option.color === "bg-green-500" ? "#22c55e" : "#eab308" 
                            : "transparent"
                        }}
                      />
                      <div className={`absolute inset-0 rounded-full border-2 border-transparent group-hover:border-teal-300 transition-all duration-200 ${
                        this.state[question.stateKey] === option.value ? 'scale-125' : ''
                      }`}></div>
                    </div>
                    <span className="text-teal-700 dark:text-gray-300 font-medium text-sm group-hover:text-teal-600 dark:group-hover:text-white transition-colors duration-200">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-md font-semibold text-teal-800 dark:text-white">
              Completion Status
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              this.state.next_button_available === "Available" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}>
              {this.state.next_button_available === "Available" ? "Ready to Continue" : "Please complete all questions"}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(Object.values(this.state).filter(val => val !== "" && val !== "Not available" && val !== "Available" && !Array.isArray(val)).length / 6) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Patient2;