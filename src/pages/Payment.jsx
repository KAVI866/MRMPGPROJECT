// import { useState, createContext, useContext, useEffect } from 'react';
// import { assets } from '../assets/assets';
// // Mock context and assets to make the file self-contained
// const AppContext = createContext();

// // SVG for ChevronDown icon to replace react-feather
// const ChevronDownSVG = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <polyline points="6 9 12 15 18 9"></polyline>
//   </svg>
// );

// // SVG for CheckCircle icon to replace react-feather
// const CheckCircleSVG = ({ className, size }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-8.08"></path>
//     <polyline points="22 4 12 14.01 9 11.01"></polyline>
//   </svg>
// );

// const StyledSelect = ({ name, value, onChange, children, label }) => {
//   return (
//     <div className="relative w-full">
//       {label && <label className="block text-gray-700 font-semibold mb-1">{label}</label>}
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full appearance-none p-3 border rounded-lg bg-white
//                    text-gray-700 focus:ring-2 focus:ring-indigo-500
//                    transition shadow-sm outline-none"
//       >
//         {children}
//       </select>
//       <ChevronDownSVG
//         className="absolute right-3 top-1/2 -translate-y-1/2
//                    text-gray-500 pointer-events-none"
//       />
//     </div>
//   );
// };

// const ThankYou = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4 text-center">
//         <CheckCircleSVG className="mx-auto text-green-500" size={64} />
//         <h1 className="text-3xl font-bold text-gray-800">Payment Submitted!</h1>
//         <p className="text-lg text-gray-600">
//           Your payment details have been successfully submitted for review.
//         </p>
//         <p className="text-sm text-gray-500">
//           You will receive a confirmation once it has been approved by the administrator.
//         </p>
//       </div>
//     </div>
//   );
// };

// export const Payment = () => {
//   const [form, setForm] = useState({
//     memberId: "",
//     firstname: "",
//     pgType: "",
//     pgLocation: "",
//     roomNo: "",
//     rentBillScreenshot: null,
//     electricityBillScreenshot: null,
//   });
  
//   const [pgLocations, setPgLocations] = useState([]);
//   const [pgRooms, setPgRooms] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoadingLocations, setIsLoadingLocations] = useState(false);
//   const [isLoadingRooms, setIsLoadingRooms] = useState(false);

//   // Effect to fetch PG locations based on PG type
//   useEffect(() => {
//     if (form.pgType) {
//       setIsLoadingLocations(true);
//       const pgTypeParam = form.pgType.toUpperCase() + 'S';
//       const url = `http://localhost:5000/api/v1/user/pg-locations?pgType=${pgTypeParam}`;
//       fetch(url)
//         .then(response => response.json())
//         .then(data => {
//           if (data.success) {
//             setPgLocations(data.data.pgs);
//           } else {
//             console.error("Failed to fetch PG locations:", data.message);
//             setPgLocations([]);
//           }
//         })
//         .catch(error => {
//           console.error("Error fetching PG locations:", error);
//           setPgLocations([]);
//         })
//         .finally(() => {
//           setIsLoadingLocations(false);
//         });
//     } else {
//       setPgLocations([]);
//     }
//     setForm(prevForm => ({ ...prevForm, pgLocation: "", roomNo: "" }));
//   }, [form.pgType]);

//   // Effect to fetch rooms based on selected PG location
//   useEffect(() => {
//     const selectedPg = pgLocations.find(pg => pg.location === form.pgLocation);
//     if (selectedPg) {
//       setIsLoadingRooms(true);
//       const url = `http://localhost:5000/api/v1/user/rooms?pgId=${selectedPg.id}`;
//       fetch(url)
//         .then(response => response.json())
//         .then(data => {
//           if (data.success) {
//             setPgRooms(data.data.rooms);
//           } else {
//             console.error("Failed to fetch rooms:", data.message);
//             setPgRooms([]);
//           }
//         })
//         .catch(error => {
//           console.error("Error fetching rooms:", error);
//           setPgRooms([]);
//         })
//         .finally(() => {
//           setIsLoadingRooms(false);
//         });
//     } else {
//       setPgRooms([]);
//     }
//     setForm(prevForm => ({ ...prevForm, roomNo: "" }));
//   }, [form.pgLocation, pgLocations]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'rentBillScreenshot' || name === 'electricityBillScreenshot') {
//       const file = files[0];
//       const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
//       if (file && file.size > MAX_FILE_SIZE) {
//         setErrorMessage("File size exceeds 5MB. Please choose a smaller file.");
//         setForm({ ...form, [name]: null });
//       } else {
//         setErrorMessage("");
//         setForm({ ...form, [name]: file });
//       }
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setIsSubmitting(true);

//     if (!form.rentBillScreenshot || !form.electricityBillScreenshot) {
//       setErrorMessage("Both rent bill and electricity bill screenshots are required.");
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('memberId', form.memberId);
//     formData.append('firstname', form.firstname);
//     formData.append('pgType', form.pgType);
//     formData.append('pgLocation', form.pgLocation);
//     formData.append('roomNo', form.roomNo);
//     formData.append('rentBillScreenshot', form.rentBillScreenshot);
//     formData.append('electricityBillScreenshot', form.electricityBillScreenshot);

//     fetch('http://localhost:5000/api/v1/user/payment', {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         setIsSubmitted(true);
//       } else {
//         setErrorMessage(data.message || "Failed to submit payment.");
//       }
//     })
//     .catch(error => {
//       console.error("Error submitting payment:", error);
//       setErrorMessage("An error occurred. Please try again later.");
//     })
//     .finally(() => {
//       setIsSubmitting(false);
//     });
//   };

//   if (isSubmitted) {
//     return <ThankYou />;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-sans">
//       {/* Left side - Form */}
//       <div className="flex-1 flex items-center justify-center p-6">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4"
//         >
//           <h1 className="text-3xl font-bold text-center text-indigo-700">
//             Payment Form
//           </h1>
//           <p className="text-center text-gray-500">
//             Please fill out your details to submit your monthly payment.
//           </p>
          
//           <input
//             type="text"
//             name="memberId"
//             placeholder="Member ID"
//             value={form.memberId}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             required
//           />
//           <input
//             type="text"
//             name="firstname"
//             placeholder="First Name"
//             value={form.firstname}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             required
//           />
          
//           <StyledSelect name="pgType" value={form.pgType} onChange={handleChange} label="Select PG Type">
//             <option value="">Select PG Type</option>
//             <option value="Men">Men's</option>
//             <option value="Women">Women's</option>
//           </StyledSelect>

//           <StyledSelect
//             name="pgLocation"
//             value={form.pgLocation}
//             onChange={handleChange}
//             label="Select PG Location"
//           >
//             <option value="">
//               {isLoadingLocations ? "Loading..." : "Select PG Location"}
//             </option>
//             {pgLocations.map(pg => (
//               <option key={pg.id} value={pg.location}>
//                 {pg.name}
//               </option>
//             ))}
//           </StyledSelect>

//           <StyledSelect name="roomNo" value={form.roomNo} onChange={handleChange} label="Select Room No">
//             <option value="">
//               {isLoadingRooms ? "Loading..." : "Select Room No"}
//             </option>
//             {pgRooms.map(room => (
//               <option key={room.id} value={room.roomNo}>
//                 {room.roomNo}
//               </option>
//             ))}
//           </StyledSelect>
          
//           <div className="space-y-4 border rounded-xl p-4 bg-gray-50">
//             <p className="font-semibold text-gray-700">Payment Screenshots</p>
//             <div className="flex flex-col">
//               <label htmlFor="rentBill" className="text-sm font-medium text-gray-700 mb-1">Rent Bill Screenshot</label>
//               <input
//                 id="rentBill"
//                 type="file"
//                 name="rentBillScreenshot"
//                 onChange={handleChange}
//                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label htmlFor="electricityBill" className="text-sm font-medium text-gray-700 mb-1">Electricity Bill Screenshot</label>
//               <input
//                 id="electricityBill"
//                 type="file"
//                 name="electricityBillScreenshot"
//                 onChange={handleChange}
//                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
//               />
//             </div>
//             {errorMessage && (
//               <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Payment"}
//           </button>
//         </form>
//       </div>

//       {/* Right side - Image */}
//       <div className="flex-1 hidden lg:flex items-center justify-center p-6">
//         <img
//           src={assets.img10}
//           alt="Payment illustration"
//           className="w-full h-full object-cover rounded-2xl shadow-lg"
//         />
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";

// Mock assets object to replace external asset imports
const assets = {
  img10: "https://placehold.co/600x800/e2e8f0/334155?text=Payment+Form"
};

// SVG for ChevronDown icon to replace react-feather
const ChevronDownSVG = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// SVG for CheckCircle icon to replace react-feather
const CheckCircleSVG = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.08"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const StyledSelect = ({ name, value, onChange, children, label, disabled }) => {
  return (
    <div className="relative w-full">
      {label && <label className="block text-gray-700 font-semibold mb-1">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full appearance-none p-3 border rounded-lg bg-white
                   text-gray-700 focus:ring-2 focus:ring-indigo-500
                   transition shadow-sm outline-none disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {children}
      </select>
      <ChevronDownSVG
        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-gray-500 pointer-events-none"
      />
    </div>
  );
};

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4 text-center">
        <CheckCircleSVG className="mx-auto text-green-500" size={64} />
        <h1 className="text-3xl font-bold text-gray-800">Payment Submitted!</h1>
        <p className="text-lg text-gray-600">
          Your payment details have been successfully submitted for review.
        </p>
        <p className="text-sm text-gray-500">
          You will receive a confirmation once it has been approved by the administrator.
        </p>
      </div>
    </div>
  );
};

export const Payment = () => {
  const [form, setForm] = useState({
    memberId: "",
    firstname: "",
    pgType: "",
    pgLocation: "",
    roomNo: "",
    rentBillScreenshot: null,
    electricityBillScreenshot: null,
  });

  const [pgLocations, setPgLocations] = useState([]);
  const [pgRooms, setPgRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  // Effect to fetch PG locations based on PG type
  useEffect(() => {
    const fetchPgLocations = async () => {
      if (!form.pgType) {
        setPgLocations([]);
        setForm(prevForm => ({ ...prevForm, pgLocation: "", roomNo: "" }));
        return;
      }

      setIsLoadingLocations(true);
      setErrorMessage("");
      try {
        const pgTypeParam = form.pgType.toUpperCase() + 'S';
        const url = `http://localhost:5000/api/v1/user/pg-locations?pgType=${pgTypeParam}`;
        const response = await fetch(url);
        console.log("Response:", response);
        const data = await response.json();
        data.forEach(item => {
  console.log("User Name:", item.value); // Replace 'name' with your property
  console.log("User Email:", item.label); // Replace 'email' with your property
});


        if (data.success) {
          setPgLocations(data.data?.pgs || []);
        } else {
          setPgLocations([]);
          setErrorMessage(data.message || "Failed to fetch PG locations.");
        }
      } catch (error) {
        console.error("Error fetching PG locations:", error);
        setPgLocations([]);
        setErrorMessage("An error occurred while fetching PG locations. Please check your network connection.");
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchPgLocations();
  }, [form.pgType]);

  // Effect to fetch rooms based on selected PG location
  useEffect(() => {
    const fetchPgRooms = async () => {
      if (!form.pgLocation) {
        setPgRooms([]);
        setForm(prevForm => ({ ...prevForm, roomNo: "" }));
        return;
      }

      setIsLoadingRooms(true);
      setErrorMessage("");
      try {
        const url = `http://localhost:5000/api/v1/user/rooms?pgId=${form.pgLocation}`;
        const response = await fetch(url);
        console.log("Response:", response);
        
        const data = await response.json();
        console.log("Data:", data);
        

        if (data.success) {
          setPgRooms(data.data?.rooms || []);
        } else {
          setPgRooms([]);
          setErrorMessage(data.message || "Failed to fetch rooms.");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setPgRooms([]);
        setErrorMessage("An error occurred while fetching rooms. Please check your network connection.");
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchPgRooms();
  }, [form.pgLocation]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'rentBillScreenshot' || name === 'electricityBillScreenshot') {
      const file = files[0];
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file && file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB. Please choose a smaller file.");
        setForm({ ...form, [name]: null });
      } else {
        setErrorMessage("");
        setForm({ ...form, [name]: file });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    if (!form.rentBillScreenshot || !form.electricityBillScreenshot) {
      setErrorMessage("Both rent bill and electricity bill screenshots are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('memberId', form.memberId);
      formData.append('firstname', form.firstname);
      formData.append('pgType', form.pgType);
      formData.append('pgLocation', form.pgLocation);
      formData.append('roomNo', form.roomNo);
      formData.append('rentBillScreenshot', form.rentBillScreenshot);
      formData.append('electricityBillScreenshot', form.electricityBillScreenshot);

      const response = await fetch('http://localhost:5000/api/v1/user/payment', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit payment.");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-sans">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4"
        >
          <h1 className="text-3xl font-bold text-center text-indigo-700">
            Payment Form
          </h1>
          <p className="text-center text-gray-500">
            Please fill out your details to submit your monthly payment.
          </p>

          <input
            type="text"
            name="memberId"
            placeholder="Member ID"
            value={form.memberId}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />

          <StyledSelect name="pgType" value={form.pgType} onChange={handleChange} label="Select PG Type">
            <option value="">Select PG Type</option>
            <option value="Men">Men's</option>
            <option value="Women">Women's</option>
          </StyledSelect>

          <StyledSelect
            name="pgLocation"
            value={form.pgLocation}
            onChange={handleChange}
            label="Select PG Location"
            disabled={isLoadingLocations || !form.pgType}
          >
            <option value="">
              {isLoadingLocations ? "Loading..." : "Select PG Location"}
            </option>
            {pgLocations?.map(pg => (
              <option key={pg.value} value={pg.value}>
                {pg.label}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect name="roomNo" value={form.roomNo} onChange={handleChange} label="Select Room No" disabled={isLoadingRooms || !form.pgLocation}>
            <option value="">
              {isLoadingRooms ? "Loading..." : "Select Room No"}
            </option>
            {pgRooms?.map(room => (
              <option key={room.id} value={room.roomNo}>
                {room.roomNo}
              </option>
            ))}
          </StyledSelect>

          <div className="space-y-4 border rounded-xl p-4 bg-gray-50">
            <p className="font-semibold text-gray-700">Payment Screenshots</p>
            <div className="flex flex-col">
              <label htmlFor="rentBill" className="text-sm font-medium text-gray-700 mb-1">Rent Bill Screenshot</label>
              <input
                id="rentBill"
                type="file"
                name="rentBillScreenshot"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="electricityBill" className="text-sm font-medium text-gray-700 mb-1">Electricity Bill Screenshot</label>
              <input
                id="electricityBill"
                type="file"
                name="electricityBillScreenshot"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Payment"}
          </button>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 hidden lg:flex items-center justify-center p-6">
        <img
          src={assets.img10}
          alt="Payment illustration"
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};
