// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// // You'll need to include the assets file in your project or update the image source
// import { assets } from "../assets/assets"; 
// import { toast, ToastContainer } from "react-toastify";

// // Styled Select Component
// const StyledSelect = ({ children, value, onChange }) => (
//   <div className="relative w-full">
//     <select
//       value={value}
//       onChange={onChange}
//       className="w-full appearance-none p-3 border rounded-lg bg-white 
//                  text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary 
//                  transition shadow-sm"
//     >
//       {children}
//     </select>
//     <ChevronDown
//       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//     />
//   </div>
// );

// export const Registration = () => {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//     location: "",
//     email: "",
//     work: "",
//     pgLocation: "",
//     aadhar: null,
//     photo: null,
//     plan: "",
//   });
//   const [errors, setErrors] = useState({});

//   // ✅ Step 1 Validation (personal data)
//   const validateStep1 = async () => {
//     let newErrors = {};
//     if (formData.name.length <= 2)
//       newErrors.name = "Name must be more than 2 characters";
//     if (!formData.age || Number(formData.age) <= 15)
//       newErrors.age = "Age must be greater than 15";
//     if (!formData.gender) newErrors.gender = "Please select gender";
//     if (!/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Phone must be 10 digits";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       newErrors.email = "Enter valid email";
//     if (!formData.location || formData.location.length < 3)
//       newErrors.location = "Address must be at least 3 characters";

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return false;

//     // 🔗 Backend validation
//     try {
//       const res = await fetch("http://localhost:5000/api/v1/user/validate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           age: Number(formData.age),
//           gender: formData.gender.toUpperCase(),
//           phone: formData.phone,
//           email: formData.email,
//           location: formData.location,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         if (data.field) {
//           setErrors((prev) => ({ ...prev, [data.field]: data.message }));
//         } else {
//           toast.error(data.message || "Validation failed");
//         }
//         return false;
//       }
//       return true;
//     } catch {
//       toast.error("Network error, please try again.");
//       return false;
//     }
//   };

//   // ✅ Step 2 Validation (PG + ID)
//   const validateStep2 = () => {
//     let newErrors = {};
//     if (!formData.pgLocation) newErrors.pgLocation = "Select PG location";
//     if (!formData.work) newErrors.work = "Select work type";
//     if (!formData.aadhar) newErrors.aadhar = "Upload Aadhar";
//     if (!formData.photo) newErrors.photo = "Upload photo";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Step 3 Validation (plan)
//   const validateStep3 = () => {
//     let newErrors = {};
//     if (!formData.plan) newErrors.plan = "Select plan";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Step navigation
//   const handleNext = async () => {
//     if (step === 1) {
//       const valid = await validateStep1();
//       if (valid) setStep(2);
//     } else if (step === 2 && validateStep2()) {
//       setStep(3);
//     }
//   };

//   // ✅ Final Submit (registration)
//   const handleRegister = async () => {
//     if (!validateStep3()) return;

//     try {
//       setLoading(true);

//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("age", formData.age);
//       formDataToSend.append("gender", formData.gender.toUpperCase());
//       formDataToSend.append("phone", formData.phone);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("location", formData.location);
//       formDataToSend.append("work", formData.work);
//       formDataToSend.append("pgLocation", formData.pgLocation);
//       formDataToSend.append(
//         "rentType",
//         formData.plan === "short" ? "SHORT_TERM" : "LONG_TERM"
//       );

//       // 🔹 FIX: Map gender to PgType more robustly
//       const pgTypeMap = {
//         MALE: "MENS",
//         FEMALE: "WOMENS",
//         OTHER: "OTHER",
//       };
//       formDataToSend.append("pgType", pgTypeMap[formData.gender.toUpperCase()] || "OTHER");

//       if (formData.photo) formDataToSend.append("profileImage", formData.photo);
//       if (formData.aadhar) formDataToSend.append("aadharImage", formData.aadhar);

//       const res = await fetch("http://localhost:5000/api/v1/user/register", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Registration successful!");
//         setTimeout(() => {
//           window.location.href = "/"; // ✅ redirect on success
//         }, 2000);
        
//       } else {
//         if (data.field) {
//           setErrors((prev) => ({ ...prev, [data.field]: data.message }));
//         } else {
//           toast.error(data.message || "Something went wrong");
//         }
//       }
//     } catch {
//       toast.error("Network error, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@10.0.5/dist/ReactToastify.min.css" />
//       <ToastContainer position="top-right" /> 
//        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
      
//         {/* LEFT FORM */}
//         <div>
//           <h2 className="text-3xl font-bold mb-6 text-primary">
//             Registration Form
//           </h2>

//           {/* Progress Steps */}
//           <div className="flex justify-between mb-8">
//             {["Personal", "ID", "Plan"].map((label, index) => {
//               const current = index + 1;
//               return (
//                 <div key={label} className="flex-1 text-center">
//                   <span
//                     className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 text-white font-bold 
//                       ${step >= current ? "bg-primary" : "bg-gray-300"}`}
//                   >
//                     {current}
//                   </span>
//                   <p
//                     className={`${
//                       step === current
//                         ? "text-primary font-semibold"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {label}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* STEP 1 */}
//           {step === 1 && (
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {errors.name && <p className="text-primary text-sm">{errors.name}</p>}

//               <input
//                 type="number"
//                 placeholder="Enter your age"
//                 value={formData.age}
//                 onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {errors.age && <p className="text-primary text-sm">{errors.age}</p>}

//               <input
//                 type="text"
//                 placeholder="Enter your address"
//                 value={formData.location}
//                 onChange={(e) =>
//                   setFormData({ ...formData, location: e.target.value })
//                 }
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {errors.location && (
//                 <p className="text-primary text-sm">{errors.location}</p>
//               )}

//               <StyledSelect
//                 value={formData.gender}
//                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//               >
//                 <option value="">Choose Gender</option>
//                 <option value="MALE">Male</option>
//                 <option value="FEMALE">Female</option>
//                 <option value="OTHER">Other</option>
//               </StyledSelect>
//               {errors.gender && (
//                 <p className="text-primary text-sm">{errors.gender}</p>
//               )}

//               <input
//                 type="text"
//                 placeholder="Enter your phone"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {errors.phone && (
//                 <p className="text-primary text-sm">{errors.phone}</p>
//               )}

//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
//               />
//               {errors.email && (
//                 <p className="text-primary text-sm">{errors.email}</p>
//               )}

//               <button
//                 onClick={handleNext}
//                 className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition"
//               >
//                 Next
//               </button>
//             </div>
//           )}

//           {/* STEP 2 */}
//           {step === 2 && (
//             <div className="space-y-3">
//               <StyledSelect
//                 value={formData.pgLocation}
//                 onChange={(e) =>
//                   setFormData({ ...formData, pgLocation: e.target.value })
//                 }
//               >
//                 <option value="">Select PG Location</option>
//                 <option>Hyderabad</option>
//                 <option>Bangalore</option>
//                 <option>Delhi</option>
//               </StyledSelect>
//               {errors.pgLocation && (
//                 <p className="text-primary text-sm">{errors.pgLocation}</p>
//               )}

//               <StyledSelect
//                 value={formData.work}
//                 onChange={(e) => setFormData({ ...formData, work: e.target.value })}
//               >
//                 <option value="">Select Work</option>
//                 <option>IT</option>
//                 <option>Banking</option>
//                 <option>Marketing</option>
//                 <option>Other</option>
//               </StyledSelect>
//               {errors.work && <p className="text-primary text-sm">{errors.work}</p>}

//               {/* Aadhar Upload with Preview */}
//               <div className="grid grid-cols-2 gap-4">
//                 {/* First row: input fields */}
//                 <div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file && file.size > 5 * 1024 * 1024) {
//                         toast.error("Aadhar image size cannot exceed 5MB.");
//                         setFormData({ ...formData, aadhar: null });
//                         e.target.value = null; // Clear the input field
//                       } else {
//                         setFormData({ ...formData, aadhar: file });
//                       }
//                     }}
//                     className="w-full p-3 border rounded-lg bg-white"
//                     placeholder="Upload Aadhar Image"
//                   />
//                   {errors.aadhar && (
//                     <p className="text-primary text-sm mt-1">{errors.aadhar}</p>
//                   )}
//                 </div>
//                 <div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file && file.size > 5 * 1024 * 1024) {
//                         toast.error("Profile image size cannot exceed 5MB.");
//                         setFormData({ ...formData, photo: null });
//                         e.target.value = null; // Clear the input field
//                       } else {
//                         setFormData({ ...formData, photo: file });
//                       }
//                     }}
//                     className="w-full p-3 border rounded-lg bg-white"
//                     placeholder="Upload Profile Image"
//                   />
//                   {errors.photo && (
//                     <p className="text-primary text-sm mt-1">{errors.photo}</p>
//                   )}
//                 </div>
//                 {/* Second row: image previews */}
//                 <div>
//                   <div className="w-24 h-24 mx-auto rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden mt-2">
//                     {formData.aadhar ? (
//                       <img
//                         src={URL.createObjectURL(formData.aadhar)}
//                         alt="Aadhar Preview"
//                         className="object-cover w-full h-full"
//                       />
//                     ) : (
//                       <span className="text-xs text-gray-400 text-center px-2">Aadhar Image<br/>Preview</span>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <div className="w-24 h-24 mx-auto rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden mt-2">
//                     {formData.photo ? (
//                       <img
//                         src={URL.createObjectURL(formData.photo)}
//                         alt="Profile Preview"
//                         className="object-cover w-full h-full"
//                       />
//                     ) : (
//                       <span className="text-xs text-gray-400 text-center px-2">Profile Image<br/>Preview</span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handleNext}
//                 className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition"
//               >
//                 Next
//               </button>
//             </div>
//           )}

//           {/* STEP 3 */}
//           {step === 3 && (
//             <div className="space-y-3">
//               <label className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                 <input
//                   type="radio"
//                   name="plan"
//                   value="short"
//                   checked={formData.plan === "short"}
//                   onChange={(e) =>
//                     setFormData({ ...formData, plan: e.target.value })
//                   }
//                   className="mr-2"
//                 />
//                 Short Term Accommodation
//               </label>

//               <label className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                 <input
//                   type="radio"
//                   name="plan"
//                   value="long"
//                   checked={formData.plan === "long"}
//                   onChange={(e) =>
//                     setFormData({ ...formData, plan: e.target.value })
//                   }
//                   className="mr-2"
//                 />
//                 Long Term Accommodation
//               </label>
//               {errors.plan && <p className="text-primary text-sm">{errors.plan}</p>}

//               <button
//                 onClick={handleRegister}
//                 disabled={loading}
//                 className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400"
//               >
//                 {loading ? "Submitting..." : "Register"}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="hidden md:block">
//           <img
//             src={assets.img9}
//             alt="Modern PG Room"
//             className="rounded-2xl shadow-lg h-full object-cover w-full"
//           />
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {assets} from '../assets/assets.js'
// For this environment, we use a placeholder image as local file imports are not supported.
import { toast, ToastContainer } from "react-toastify";

// Styled Select Component
const StyledSelect = ({ children, value, onChange }) => (
  <div className="relative w-full">
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none p-3 border rounded-lg bg-white 
                 text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary 
                 transition shadow-sm"
    >
      {children}
    </select>
    <ChevronDown
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>
);

export const Registration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    location: "",
    email: "",
    work: "",
    pgLocation: "",
    aadhar: null,
    photo: null,
    plan: "",
  });
  const [errors, setErrors] = useState({});

  // ✅ Step 1 Validation (personal data)
  const validateStep1 = async () => {
    let newErrors = {};
    if (formData.name.length <= 2)
      newErrors.name = "Name must be more than 2 characters";
    if (!formData.age || Number(formData.age) <= 15)
      newErrors.age = "Age must be greater than 15";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter valid email";
    if (!formData.location || formData.location.length < 3)
      newErrors.location = "Address must be at least 3 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return false;

    // 🔗 Backend validation
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          age: Number(formData.age),
          gender: formData.gender.toUpperCase(),
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.field) {
          setErrors((prev) => ({ ...prev, [data.field]: data.message }));
        } else {
          toast.error(data.message || "Validation failed");
        }
        return false;
      }
      return true;
    } catch {
      toast.error("Network error, please try again.");
      return false;
    }
  };

  // ✅ Step 2 Validation (PG + ID)
  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.pgLocation) newErrors.pgLocation = "Select PG location";
    if (!formData.work) newErrors.work = "Select work type";
    if (!formData.aadhar) newErrors.aadhar = "Upload Aadhar";
    if (!formData.photo) newErrors.photo = "Upload photo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Step 3 Validation (plan)
  const validateStep3 = () => {
    let newErrors = {};
    if (!formData.plan) newErrors.plan = "Select plan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Step navigation
  const handleNext = async () => {
    if (step === 1) {
      const valid = await validateStep1();
      if (valid) setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  // ✅ Final Submit (registration)
  const handleRegister = async () => {
    if (!validateStep3()) return;

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender.toUpperCase());
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("work", formData.work);
      formDataToSend.append("pgLocation", formData.pgLocation);
      formDataToSend.append(
        "rentType",
        formData.plan === "short" ? "SHORT_TERM" : "LONG_TERM"
      );

      // 🔹 FIX: Map gender to PgType more robustly
      const pgTypeMap = {
        MALE: "MENS",
        FEMALE: "WOMENS",
        OTHER: "OTHER",
      };
      formDataToSend.append("pgType", pgTypeMap[formData.gender.toUpperCase()] || "OTHER");

      if (formData.photo) formDataToSend.append("profileImage", formData.photo);
      if (formData.aadhar) formDataToSend.append("aadharImage", formData.aadhar);

      const res = await fetch("http://localhost:5000/api/v1/user/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful!");
        setTimeout(() => {
          window.location.href = "/"; // ✅ redirect on success
        }, 2000);
      } else {
        if (data.field) {
          setErrors((prev) => ({ ...prev, [data.field]: data.message }));
        } else {
          toast.error(data.message || "Something went wrong");
        }
      }
    } catch {
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@10.0.5/dist/ReactToastify.min.css" />
      <ToastContainer position="top-right" /> 
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT FORM */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Registration Form
          </h2>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {["Personal", "ID", "Plan"].map((label, index) => {
              const current = index + 1;
              return (
                <div key={label} className="flex-1 text-center">
                  <span
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 text-white font-bold 
                      ${step >= current ? "bg-primary" : "bg-gray-300"}`}
                  >
                    {current}
                  </span>
                  <p
                    className={`${
                      step === current
                        ? "text-primary font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.name && <p className="text-primary text-sm">{errors.name}</p>}

              <input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.age && <p className="text-primary text-sm">{errors.age}</p>}

              <input
                type="text"
                placeholder="Enter your address"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.location && (
                <p className="text-primary text-sm">{errors.location}</p>
              )}

              <StyledSelect
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Choose Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </StyledSelect>
              {errors.gender && (
                <p className="text-primary text-sm">{errors.gender}</p>
              )}

              <input
                type="text"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.phone && (
                <p className="text-primary text-sm">{errors.phone}</p>
              )}

              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-primary text-sm">{errors.email}</p>
              )}

              <button
                onClick={handleNext}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition"
              >
                Next
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-3">
              <StyledSelect
                value={formData.pgLocation}
                onChange={(e) =>
                  setFormData({ ...formData, pgLocation: e.target.value })
                }
              >
                <option value="">Select PG Location</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
                <option>Delhi</option>
              </StyledSelect>
              {errors.pgLocation && (
                <p className="text-primary text-sm">{errors.pgLocation}</p>
              )}

              <StyledSelect
                value={formData.work}
                onChange={(e) => setFormData({ ...formData, work: e.target.value })}
              >
                <option value="">Select Work</option>
                <option>IT</option>
                <option>Banking</option>
                <option>Marketing</option>
                <option>Other</option>
              </StyledSelect>
              {errors.work && <p className="text-primary text-sm">{errors.work}</p>}

              {/* Aadhar Upload with Preview */}
              <div className="grid grid-cols-2 gap-4">
                {/* First row: input fields */}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size > 5 * 1024 * 1024) {
                        toast.error("Aadhar image size cannot exceed 5MB.");
                        setFormData({ ...formData, aadhar: null });
                        e.target.value = null; // Clear the input field
                      } else {
                        setFormData({ ...formData, aadhar: file });
                      }
                    }}
                    className="w-full p-3 border rounded-lg bg-white"
                    placeholder="Upload Aadhar Image"
                  />
                  {errors.aadhar && (
                    <p className="text-primary text-sm mt-1">{errors.aadhar}</p>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size > 5 * 1024 * 1024) {
                        toast.error("Profile image size cannot exceed 5MB.");
                        setFormData({ ...formData, photo: null });
                        e.target.value = null; // Clear the input field
                      } else {
                        setFormData({ ...formData, photo: file });
                      }
                    }}
                    className="w-full p-3 border rounded-lg bg-white"
                    placeholder="Upload Profile Image"
                  />
                  {errors.photo && (
                    <p className="text-primary text-sm mt-1">{errors.photo}</p>
                  )}
                </div>
                {/* Second row: image previews */}
                <div>
                  <div className="w-24 h-24 mx-auto rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden mt-2">
                    {formData.aadhar ? (
                      <img
                        src={URL.createObjectURL(formData.aadhar)}
                        alt="Aadhar Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center px-2">Aadhar Image<br/>Preview</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="w-24 h-24 mx-auto rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden mt-2">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Profile Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center px-2">Profile Image<br/>Preview</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition"
              >
                Next
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-3">
              <label className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="plan"
                  value="short"
                  checked={formData.plan === "short"}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                  className="mr-2"
                />
                Short Term Accommodation
              </label>

              <label className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="plan"
                  value="long"
                  checked={formData.plan === "long"}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                  className="mr-2"
                />
                Long Term Accommodation
              </label>
              {errors.plan && <p className="text-primary text-sm">{errors.plan}</p>}

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block">
          <img
            src={assets.img9}
            alt="Modern PG Room"
            className="rounded-2xl shadow-lg h-full object-cover w-full"
          />
        </div>
      </div>
    </>
  );
};
