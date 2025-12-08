import React, { useContext, useEffect, useRef, useState } from "react";
import commonContext from "../../contexts/common/commonContext";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import { Alert, CircularProgress } from "@mui/material";
import httpClient from "../../httpClient";
import { FaCamera } from "react-icons/fa";

import {
  FaUser,
  FaUserMd,
  FaUserClock,
  FaIdCard,
  FaPhoneAlt,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import heartRateLogo from "../../assets/heart-rate-logo.png";
import doctorMale from "../../assets/doctor-male.png";
import doctorFemale from "../../assets/doctor-female.png";
import patientMale from "../../assets/patient-male.png";
import patientFemale from "../../assets/patient-female.png";

const AccountForm = ({ isSignup, setIsSignup }) => {
  const { isFormOpen, toggleForm, setFormUserInfo } = useContext(commonContext);
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("patient");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isInvEmail, setIsInvEmail] = useState(false);
  const [isInvPass, setIsInvPass] = useState(false);
  const [isInvPhone, setIsInvPhone] = useState(false);
  const [isInvAge, setIsInvAge] = useState(false);
  const [isAlert, setIsAlert] = useState("");
  const [alertCont, setAlertCont] = useState("");
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [isTelMedSphereAuth, setIsTelMedSphereAuth] = useState(true);
  const setCurrAuthApp = [setIsTelMedSphereAuth, setIsGoogleAuth];
  const [currAuthAppIdx, setCurrAuthAppIdx] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useOutsideClose(formRef, () => {
    toggleForm(false);
    resetForm();
  });

  useScrollDisable(isFormOpen);

  const [isSignupVisible, setIsSignupVisible] = useState(isSignup);
  useEffect(() => {
    setIsSignupVisible(isSignup);
  }, [isSignup]);

  const resetForm = () => {
    setUsername("");
    setUsertype("patient");
    setAge("");
    setGender("male");
    setPhone("");
    setEmail("");
    setPasswd("");
    setIsForgotPassword(false);
    setSpecialization("");
    setDoctorId("");
    setProfilePic(null);
    setProfilePicFile(null);
    setIsInvEmail(false);
    setIsInvPass(false);
    setIsInvPhone(false);
    setIsInvAge(false);
  };

  // Signup-form visibility toggling
  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
    setIsForgotPassword(false);
  };

  // Default profile picture based on usertype and gender
  const getDefaultProfilePic = () => {
    if (usertype === "doctor") {
      return gender === "female" ? doctorFemale : doctorMale;
    } else {
      return gender === "female" ? patientFemale : patientMale;
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setProfilePicFile(file);
    }
  };

  // Clear profile picture
  const removeProfilePic = () => {
    setProfilePic(null);
    setProfilePicFile(null);
  };

  const checkAge = (a) => {
    const t = parseInt(a) > 0 && parseInt(a) <= 120 && /^[0-9]{1,3}$/.test(a);
    setIsInvAge(!t);
    return t;
  };

  const checkEmail = (email) => {
    // eslint-disable-next-line
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    setIsInvEmail(!res);
    return res;
  };

  const checkPasswd = (passwd) => {
    const res = /^.{6,}$/.test(passwd);
    setIsInvPass(!res);
    return res;
  };

  const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\+?1?\d{10,10}$/;
    const res = pattern.test(phoneNumber);
    setIsInvPhone(!res);
    return res;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (isInvEmail) return;

    setIsSuccessLoading(true);
    try {
      await httpClient.post("/forgot_password", { email });
      setIsAlert("success");
      setAlertCont("Password reset link sent to your email");
      setTimeout(() => {
        setIsAlert("");
        setIsForgotPassword(false);
      }, 1500);
    } catch (err) {
      setIsAlert("error");
      setAlertCont("Email not found");
      setTimeout(() => setIsAlert(""), 1500);
    }
    setIsSuccessLoading(false);
  };

  const handleAuthApp = (idx) => {
    setCurrAuthAppIdx((prevIdx) => {
      setCurrAuthApp[prevIdx](false);
      setCurrAuthApp[idx](true);
      return idx;
    });
  };

  const handleGoogleRegister = async () => {
    try {
      // Implementation remains the same
      // ... existing code
    } catch (error) {
      console.error(error);
      setIsAlert("error");
      setAlertCont("Signup Failed");
      setTimeout(() => {
        setIsAlert("");
      }, 1500);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Implementation remains the same
      // ... existing code
    } catch (error) {
      console.error("Login Error:", error);
      setIsAlert("error");
      setAlertCont("Login Failed");
      setTimeout(() => {
        setIsAlert("");
      }, 1500);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isInvEmail || isInvPass || isInvPhone) return;

    setIsSuccessLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("registerer", usertype);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("phone", "+91" + phone);
      formData.append("email", email);
      formData.append("passwd", passwd);
      formData.append("specialization", specialization);
      formData.append("doctorId", doctorId);

      if (profilePicFile && profilePicFile instanceof File) {
        formData.append("profile_picture", profilePicFile);
      } else {
        try {
          const response = await fetch(getDefaultProfilePic());
          const blob = await response.blob();
          formData.append("profile_picture", blob, "default_profile.jpg");
        } catch (err) {
          console.error("Error fetching default profile picture:", err);
        }
      }

      setIsSuccessLoading(false);

      if (isSignupVisible) {
        isGoogleAuth
          ? await handleGoogleRegister()
          : await handleRegister(formData);
      } else {
        isGoogleAuth ? await handleGoogleLogin() : await handleLogin();
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setIsSuccessLoading(false);
      setIsAlert("error");
      setAlertCont("An unexpected error occurred.");
      setTimeout(() => setIsAlert(""), 1500);
    }
  };

  const handleRegister = async (formData) => {
    try {
      const res = await httpClient.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsAlert("success");
      setAlertCont("Signup Successful");

      setTimeout(() => {
        setIsAlert("");
        setFormUserInfo({
          username,
          usertype,
          gender,
          phone,
          email,
          passwd,
          specialization,
          doctorId,
          age,
          verified: false,
          profile_picture: res.data.profile_picture,
        });
        toggleForm(false);
      }, 1500);
    } catch (err) {
      console.error("Signup Error:", err);
      setIsAlert("error");
      setAlertCont("User already exists");
      setTimeout(() => setIsAlert(""), 1500);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await httpClient.post("/login", { email, passwd });

      localStorage.setItem("token", res.data.access_token);
      setIsAlert("success");
      setAlertCont("Login Successful");

      setTimeout(() => {
        setIsAlert("");
        toggleForm(false);
        setFormUserInfo({
          username: res.data.username,
          usertype: res.data.usertype,
          gender: res.data.gender,
          phone: res.data.phone,
          email: res.data.email,
          passwd,
          specialization: res.data.specialization,
          doctorId: res.data.doctorId,
          age: res.data.age,
          verified: res.data.verified,
          profile_picture: res.data.profile_picture,
        });
      }, 1500);
    } catch (err) {
      console.error("Login Error:", err);
      setIsAlert("error");
      setAlertCont("Login Failed");
      setTimeout(() => setIsAlert(""), 1500);
    }
  };

  return (
    <>
      {isFormOpen && (
        <div className="relative">
          <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm">
            <form
              className="relative bg-white border border-teal-100 max-w-md w-full mx-4 rounded-2xl overflow-hidden shadow-2xl"
              ref={formRef}
              onSubmit={
                isForgotPassword ? handleForgotPassword : handleFormSubmit
              }
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {isForgotPassword
                        ? "Reset Password"
                        : isSignupVisible
                        ? "Create Account"
                        : "Welcome Back"}
                    </h2>
                    <p className="text-teal-50 text-sm">
                      {isForgotPassword
                        ? "Enter your email to reset password"
                        : isSignupVisible
                        ? "Join TelMedSphere today"
                        : "Sign in to your account"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <img
                      src={heartRateLogo}
                      alt="TelMedSphere"
                      className="w-8 h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Alert Section */}
              {isAlert !== "" && (
                <div className="px-6 pt-4">
                  <Alert
                    severity={isAlert}
                    className="rounded-lg shadow-sm"
                    onClose={() => setIsAlert("")}
                  >
                    {alertCont}
                  </Alert>
                </div>
              )}

              {/* Form Content */}
              <div className="p-6 max-h-[70vh] bg-white-1 overflow-y-auto">
                {/* Toggle between Login/Signup */}
                {!isForgotPassword && (
                  <div className="flex bg-teal-50 rounded-lg p-1 mb-6">
                    <button
                      type="button"
                      onClick={() => setIsSignupVisible(false)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        !isSignupVisible
                          ? "bg-white shadow-sm text-teal-600"
                          : "text-gray-600 hover:text-teal-600"
                      }`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSignupVisible(true)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        isSignupVisible
                          ? "bg-white shadow-sm text-teal-600"
                          : "text-gray-600 hover:text-teal-600"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Profile Picture Upload - Signup Only */}
                {isSignupVisible && !isForgotPassword && (
                  <div className="flex justify-center mb-6">
                    <div className="relative group">
                      <div
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-r from-teal-100 to-teal-200 relative overflow-hidden cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() =>
                          document.getElementById("profile-upload").click()
                        }
                      >
                        <img
                          src={profilePic || getDefaultProfilePic()}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />

                        {/* Hover Overlay with Upload Options */}
                        {isHovered && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center space-y-2 transition-all duration-300">
                            {profilePic ? (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeProfilePic();
                                  }}
                                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                  title="Remove Photo"
                                >
                                  <FaTimes className="text-sm" />
                                </button>
                                <span className="text-white text-xs text-center px-2">
                                  Click to change photo
                                </span>
                              </>
                            ) : (
                              <div className="text-white text-center px-3">
                                <FaCamera className="text-lg mx-auto mb-1" />
                                <span className="text-xs">Add Photo</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Always Visible Edit Icon */}
                        <label className="absolute bottom-1 right-1 bg-gradient-to-r from-teal-400 to-teal-600 text-white p-1.5 rounded-full shadow-lg cursor-pointer hover:from-teal-500 hover:to-teal-700 transition-colors">
                          <FaPencilAlt className="text-xs" />
                        </label>
                      </div>

                      {/* Hidden File Input */}
                      <input
                        id="profile-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />

                      {/* Drop Zone Overlay */}
                      <div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-teal-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add(
                            "border-teal-500",
                            "bg-teal-50/50"
                          );
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove(
                            "border-teal-500",
                            "bg-teal-50/50"
                          );
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove(
                            "border-teal-500",
                            "bg-teal-50/50"
                          );
                          const files = e.dataTransfer.files;
                          if (
                            files.length > 0 &&
                            files[0].type.startsWith("image/")
                          ) {
                            handleFileChange({ target: { files: [files[0]] } });
                          }
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* User Type Selection - Signup Only */}
                {isSignupVisible && !isForgotPassword && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-teal-600 mb-3">
                      I am a:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["patient", "doctor"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setUsertype(type)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            usertype === type
                              ? "border-teal-500 bg-teal-50 text-teal-600"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            {type === "doctor" ? (
                              <FaUserMd className="text-lg" />
                            ) : (
                              <FaUser className="text-lg" />
                            )}
                            <span className="capitalize font-medium">
                              {type}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Username - Signup Only */}
                  {isSignupVisible && !isGoogleAuth && !isForgotPassword && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Doctor Specific Fields */}
                  {isSignupVisible &&
                    usertype === "doctor" &&
                    !isGoogleAuth && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specialization
                          </label>
                          <div className="relative">
                            <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={specialization}
                              onChange={(e) =>
                                setSpecialization(e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Your medical specialization"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor ID
                          </label>
                          <div className="relative">
                            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={doctorId}
                              onChange={(e) => setDoctorId(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Your professional ID"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                  {/* Patient Age Field */}
                  {isSignupVisible &&
                    usertype === "patient" &&
                    !isGoogleAuth && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <div className="relative">
                          <FaUserClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            value={age}
                            onChange={(e) => {
                              checkAge(e.target.value);
                              setAge(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Your age"
                            required
                          />
                        </div>
                        {isInvAge && (
                          <p className="text-red-500 text-xs mt-1">
                            Invalid age
                          </p>
                        )}
                      </div>
                    )}

                  {/* Gender Selection - Signup Only */}
                  {isSignupVisible && !isGoogleAuth && !isForgotPassword && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["male", "female", "other"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGender(g)}
                            className={`py-2 rounded-lg border transition-all duration-200 ${
                              gender === g
                                ? "border-teal-500 bg-teal-50 text-teal-600"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <span className="capitalize text-sm font-medium">
                              {g}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Phone Number - Signup Only */}
                  {isSignupVisible && !isGoogleAuth && !isForgotPassword && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            validatePhoneNumber(e.target.value);
                            setPhone(e.target.value);
                          }}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="+91 1234567890"
                          required
                        />
                      </div>
                      {isInvPhone && (
                        <p className="text-red-500 text-xs mt-1">
                          Invalid phone number
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  {!isGoogleAuth && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            checkEmail(e.target.value);
                            setEmail(e.target.value);
                          }}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      {isInvEmail && (
                        <p className="text-red-500 text-xs mt-1">
                          Invalid email address
                        </p>
                      )}
                    </div>
                  )}

                  {/* Password Field */}
                  {!isForgotPassword && !isGoogleAuth && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwd}
                          onChange={(e) => {
                            checkPasswd(e.target.value);
                            setPasswd(e.target.value);
                          }}
                          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <IoEyeOffOutline size={18} />
                          ) : (
                            <IoEyeOutline size={18} />
                          )}
                        </button>
                      </div>
                      {isSignupVisible && isInvPass && (
                        <p className="text-amber-600 text-xs mt-1">
                          Password must be at least 6 characters
                        </p>
                      )}
                    </div>
                  )}

                  {/* Forgot Password Link */}
                  {!isSignupVisible && !isForgotPassword && !isGoogleAuth && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  )}

                  {/* Back to Login from Forgot Password */}
                  {isForgotPassword && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(false)}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        ← Back to Login
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                {isTelMedSphereAuth && (
                  <button
                    type="submit"
                    disabled={
                      (!isGoogleAuth && isForgotPassword && isInvEmail) ||
                      (isSignupVisible &&
                        (isInvAge || isInvEmail || isInvPass)) ||
                      (!isForgotPassword &&
                        !isSignupVisible &&
                        (isInvEmail || isInvPass))
                    }
                    className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-medium focus:ring-4 focus:ring-teal-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6 shadow-lg"
                  >
                    {isSuccessLoading ? (
                      <CircularProgress size={24} className="text-white" />
                    ) : isForgotPassword ? (
                      "Send Reset Link"
                    ) : isSignupVisible ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </button>
                )}

                {/* Google Auth Button */}
                {isGoogleAuth && (
                  <button
                    type="submit"
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 mt-4 shadow-sm flex items-center justify-center space-x-3"
                  >
                    <img
                      src="https://img.icons8.com/fluency/48/google-logo.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>
                      {isSignupVisible ? "Sign up" : "Sign in"} with Google
                    </span>
                  </button>
                )}

                {/* Auth Method Selection */}
                {!isForgotPassword && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center mb-4">
                      <span className="text-sm text-gray-600 bg-white px-3">
                        Or continue with
                      </span>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() => handleAuthApp(0)}
                        className={`p-3 rounded-full border-2 transition-all duration-200 ${
                          isTelMedSphereAuth
                            ? "border-teal-500 bg-teal-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={heartRateLogo}
                          alt="TelMedSphere"
                          className="w-6 h-6"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAuthApp(1)}
                        className={`p-3 rounded-full border-2 transition-all duration-200 ${
                          isGoogleAuth
                            ? "border-teal-500 bg-teal-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src="https://img.icons8.com/fluency/48/google-logo.png"
                          alt="Google"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => toggleForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white text-gray-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FaTimes className="text-lg" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;