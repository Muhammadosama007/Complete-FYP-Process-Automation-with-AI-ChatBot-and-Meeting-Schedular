import { useState } from "react";
import bgImage from "../assets/images/bg.jpg";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google Login Success:", decoded);
    localStorage.setItem("googleUser", JSON.stringify(decoded));
    navigate("/dashboard");
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="backgroundImage"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* White overlay */}
      <div className="absolute top-0 left-0 h-[400px] w-[35%] bg-white bg-opacity-80 p-6 shadow-lg flex flex-col border-r-[10px] border-r-blue-950 rounded-br-[200px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">FYP PORTAL</h1>
        
        <div className="ml-14">
          <label htmlFor="username" className="block text-md">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mr-12 rounded-full mb-3 px-3 py-1.5 border border-gray-500 w-[300px]"
          />
        </div>

        <div className="ml-14">
          <label htmlFor="password" className="block text-md">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full px-3 py-1.5 border border-gray-500 w-[300px]"
          />
        </div>

        <div className="pt-3 flex flex-col items-center">
          <button className="w-1/2 rounded-full bg-white hover:bg-gray-100 text-black border border-gray-300 flex items-center justify-center gap-2 py-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white text-xs">●</span>
            </div>
            Login With Odoo
          </button>

          <div className="text-center py-1 text-sm">Or</div>

          {/* Google Login Button */}
          <div className="w-1/2 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}





























// import { useState } from "react";
// import bgImage from "../assets/images/bg.jpg";
// import { useNavigate } from "react-router-dom";
// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../auth/msalConfig";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const { instance } = useMsal();

//   const handleMicrosoftLogin = () => {
//     instance.loginPopup(loginRequest)
//       .then((response) => {
//         console.log("Login successful:", response);
//         // Optionally save user info or redirect
//         navigate("/dashboard");
//       })
//       .catch((error) => {
//         console.error("Login failed:", error);
//       });
//   };

//   return (
//     <div className="h-screen w-full overflow-hidden relative">
//       {/* Background Image */}
//       <img
//         src={bgImage}
//         alt="backgroundImage"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* White overlay */}
//       <div className="absolute top-0 left-0 h-[400px] w-[35%] bg-white bg-opacity-80 p-6 shadow-lg flex flex-col border-r-[10px] border-r-blue-950 rounded-br-[200px]">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">FYP PORTAL</h1>
//         <div className="ml-14">
//           <label htmlFor="username" className="block text-md">Username</label>
//           <input
//             id="username"
//             type="text"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mr-12 rounded-full mb-3 px-3 py-1.5 border border-gray-500 w-[300px]"
//           />
//         </div>

//         <div className="ml-14">
//           <label htmlFor="password" className="block text-md">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="rounded-full px-3 py-1.5 border border-gray-500 w-[300px]"
//           />
//         </div>

//         <div className="pt-3 flex flex-col items-center">
//           <button className="w-1/2 rounded-full bg-white hover:bg-gray-100 text-black border border-gray-300 flex items-center justify-center gap-2 py-2">
//             <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
//               <span className="text-white text-xs">●</span>
//             </div>
//             Login With Odoo
//           </button>

//           <div className="text-center py-1 text-sm">Or</div>

//           <button
//             onClick={handleMicrosoftLogin}
//             className="w-1/2 rounded-full bg-white hover:bg-gray-100 text-black border border-gray-300 flex items-center justify-center gap-2 py-2"
//           >
//             <div className="w-4 h-4 flex items-center justify-center">
//               <svg width="14" height="14" viewBox="0 0 21 21">
//                 <rect x="1" y="1" width="9" height="9" fill="#f25022" />
//                 <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
//                 <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
//                 <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
//               </svg>
//             </div>
//             Login With Microsoft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
