// import { useState } from 'react';

// const Form = () => {
//   const [submissionMessage, setSubmissionMessage] = useState('');
//   const [token, setToken] = useState('');

//   const handleSupportPost = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const mobileNo = form.mobile_no.value;
//     const category = form.category.value;
//     const currentDate = new Date().toISOString();

//     const data = {
//       mobileNo,
//       category,
//       date: currentDate,
//     };

//     try {
//       const newToken = generateToken(); // Generate a new token for each form submission

//       // Set the alert message with token at the top of the form
//       window.alert(Thank you! Your data was submitted successfully. Your token number is: ${newToken});

//       // Set the token in the state
//       setToken(newToken);

//       // Reset the form
//       form.reset();
//     } catch (error) {
//       console.error("Error:", error);
//       window.alert("There was an error submitting the form. Please try again.");
//     }
//   };

//   // Function to generate a random token
//   const generateToken = () => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let newToken = "";
//     for (let i = 0; i < 5; i++) {
//       newToken += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return newToken;
//   };

//   return (
//     <section className="container mx-auto p-12 mt-20">
//       <div className="max-w-lg mx-auto bg-gray-200 rounded-lg shadow-lg p-12">
//         <h1 className="text-2xl font-bold mb-6 text-center text-black">Support Panel</h1>
//         <form onSubmit={handleSupportPost} className="space-y-6">
//           <div>
//             <label
//               htmlFor="mobile_no"
//               className="block text-black text-xl font-semibold mb-2"
//             >
//               Your Phone Number
//             </label>
//             <input
//               type="text"
//               placeholder="Please Enter Your Phone Number"
//               name="mobile_no"
//               className="w-full px-4 py-2 border rounded text-black"
//               required
//             />
//           </div>
//           <div className="">
//             <label className="block text-black text-xl font-semibold mb-2">
//               Select a category
//             </label>
//             <select
//               className="w-full px-4 py-2 border border-gray-700 rounded text-black"
//               name="category"
//               required
//             >
//               <option value="" disabled selected>
//                 Select one
//               </option>
//               <option value="Hardware">Hardware</option>
//               <option value="Software">Software</option>
//             </select>
//           </div>
//           <div className="mt-8">
//             <button
//               className="w-full bg-black text-white px-4 py-2 rounded hover:bg-black"
//               type="submit"
//             >
//               SUBMIT
//             </button>
//           </div>
//         </form>
//         {/* Display token and reset button if token exists */}
//         {token && (
//           <div className="mt-4 text-center">
//             <p>Token Number: {token}</p>
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
//               onClick={() => {
//                 setToken('');
//                 setSubmissionMessage('');
//               }}
//             >
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// exportdefaultForm;