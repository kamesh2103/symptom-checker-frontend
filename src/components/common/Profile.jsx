import React, { useState, useContext, useRef } from "react";
import commonContext from "../../contexts/common/commonContext";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import { Alert, CircularProgress } from "@mui/material";
import httpClient from "../../httpClient";
import {
  FaPencilAlt,
  FaTimes,
  FaUser,
  FaUserMd,
  FaUserClock,
  FaIdCard,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import doctorMale from "../../assets/doctor-male.png";
import doctorFemale from "../../assets/doctor-female.png";
import patientMale from "../../assets/patient-male.png";
import patientFemale from "../../assets/patient-female.png";
import heartRateLogo from "../../assets/heart-rate-logo.png";

const Profile = () => {
  const { isProfileOpen, toggleProfile, setFormUserInfo } =
    useContext(commonContext);
  const [username, setUsername] = useState(
    localStorage.getItem("username") ?? ""
  );
  const [age, setAge] = useState(localStorage.getItem("age") ?? "");
  const [gender, setGender] = useState(localStorage.getItem("gender") ?? "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") ?? "");
  const [specialization, setSpecialization] = useState(
    localStorage.getItem("specialization") ?? ""
  );
  const [doctorId, setDoctorId] = useState(
    localStorage.getItem("doctorId") ?? ""
  );
  const [fee, setFee] = useState(localStorage.getItem("fee") ?? 199);
  const email = localStorage.getItem("email") ?? "";
  const [isChPasswd, setChPasswd] = useState(false);
  const [passwd, setPasswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInvPass, setIsInvPass] = useState(false);
  const [isInvAge, setIsInvAge] = useState(false);
  const [isAlert, setIsAlert] = useState("");
  const [alertCont, setAlertCont] = useState("");
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const isDoctor = localStorage.getItem("usertype") === "doctor";

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profile_picture") ?? null
  );
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const profileRef = useRef();

  useOutsideClose(profileRef, () => {
    toggleProfile(false);
    resetForm();
  });

  useScrollDisable(isProfileOpen);

  const resetForm = () => {
    setUsername(localStorage.getItem("username") ?? "");
    setAge(localStorage.getItem("age") ?? "");
    setGender(localStorage.getItem("gender") ?? "");
    setPhone(localStorage.getItem("phone") ?? "");
    setSpecialization(localStorage.getItem("specialization") ?? "");
    setFee(localStorage.getItem("fee") ?? 0);
    setDoctorId(localStorage.getItem("doctorId") ?? "");
    setPasswd("");
    setChPasswd(false);
    setProfilePic(localStorage.getItem("profile_picture") ?? null);
    setProfilePicFile(null);
    setShowPassword(false);
  };

  // Default profile picture based on usertype and gender
  const getDefaultProfilePic = () => {
    if (isDoctor) {
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
    const valid =
      parseInt(a) > 0 && parseInt(a) <= 120 && /^[0-9]{1,3}$/.test(a);
    setIsInvAge(!valid);
    return valid;
  };

  const checkPasswd = (passwd) => {
    const valid = /^.{6,}$/.test(passwd);
    setIsInvPass(!valid);
    return valid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isInvAge || (isChPasswd && isInvPass)) {
      return;
    }

    setIsSuccessLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("usertype", isDoctor ? "doctor" : "patient");
    formData.append("age", age);
    formData.append("specialization", specialization);
    formData.append("gender", gender);
    formData.append("phone", phone);
    if (isChPasswd) {
      formData.append("passwd", passwd);
    }
    formData.append("fee", fee);
    formData.append("doctorId", doctorId);

    // Handle profile picture
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

    try {
      const res = await httpClient.put("/update_details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res) {
        setIsSuccessLoading(false);
        setIsAlert("success");
        setAlertCont("Profile updated successfully!");
        setTimeout(() => {
          setIsAlert("");
          setAlertCont("");
          setFormUserInfo({
            username,
            usertype: isDoctor ? "doctor" : "patient",
            gender,
            phone,
            email,
            passwd: passwd ?? localStorage.getItem("passwd"),
            specialization,
            doctorId,
            age,
            fee,
            profile_picture: res.data.profile_picture,
          });
          toggleProfile(false);
        }, 1500);
      }
    } catch (error) {
      setIsSuccessLoading(false);
      setIsAlert("error");
      setAlertCont("Something went wrong. Please try again later");
      setTimeout(() => {
        setIsAlert("");
        setAlertCont("");
      }, 1500);
    }
  };

  return (
    <>
      {isProfileOpen && (
        <div className="relative">
          <div className="fixed inset-0 flex items-center justify-center z-[9999]  ">
            <form
              className="relative bg-white-1 border border-gray-200 max-w-md w-full mx-4 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-xl"
              ref={profileRef}
              onSubmit={handleFormSubmit}
            >
              {/* Header Section */}
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Profile Settings
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Update your personal information
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
              {isAlert && (
                <div className="px-6 pt-4">
                  <Alert severity={isAlert} className="rounded-lg shadow-sm">
                    {alertCont}
                  </Alert>
                </div>
              )}

              {/* Form Content */}
              <div className="p-6 bg-white">
                {/* Profile Picture Upload */}
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 relative overflow-hidden cursor-pointer"
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

                      {/* Hover Overlay */}
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
                              <FaPencilAlt className="text-lg mx-auto mb-1" />
                              <span className="text-xs">Upload Photo</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Edit Icon */}
                      <label className="absolute bottom-1 right-1 bg-teal-400 text-white p-1.5 rounded-full shadow-lg cursor-pointer hover:bg-teal-500 transition-colors">
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
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Username */}
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
                        className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Doctor Specific Fields */}
                  {isDoctor && (
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
                            onChange={(e) => setSpecialization(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white"
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
                            className="w-full pl-10 pr-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white"
                            placeholder="Your professional ID"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Patient Age Field */}
                  {!isDoctor && (
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
                          className="w-full pl-10 pr-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white"
                          placeholder="Your age"
                          required
                        />
                      </div>
                      {isInvAge && (
                        <p className="text-red-500 text-xs mt-1">Invalid age</p>
                      )}
                    </div>
                  )}

                  {/* Gender Selection */}
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

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                        placeholder="+91 1234567890"
                        required
                      />
                    </div>
                  </div>

                  {/* Doctor Fee */}
                  {isDoctor && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Consultation Fee (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={fee}
                          onChange={(e) => setFee(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                          placeholder="Consultation fee"
                          min={1}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Change Password Toggle */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="changePassword"
                        checked={isChPasswd}
                        onChange={() => setChPasswd((prev) => !prev)}
                        className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                      />
                      <label
                        htmlFor="changePassword"
                        className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Change Password
                      </label>
                    </div>

                    {isChPasswd && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
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
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                            placeholder="Enter new password"
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
                        {passwd !== "" && isInvPass && (
                          <p className="text-amber-600 text-xs mt-1">
                            Password must be at least 6 characters
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isInvAge || (isChPasswd && isInvPass)}
                  className="w-full bg-gradient-to-r from-teal-400 to-teal-600 
                    hover:from-teal-500 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-medium focus:ring-4 focus:ring-teal-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6 shadow-lg"
                >
                  {isSuccessLoading ? (
                    <CircularProgress size={24} className="text-white" />
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => toggleProfile(false)}
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

export default Profile;