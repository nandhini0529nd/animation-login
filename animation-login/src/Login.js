import { useState, useEffect } from "react";
import "./Login.css";
import Signup from "./Signup";

function Login(prop){
    const[username,setUsername]=useState("");
    const[password,setpassword]=useState("");
    const [showSignup, setShowSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
  const savedUsername = localStorage.getItem("username");

  if (savedUsername) {
    setUsername(savedUsername);
    setRememberMe(true);
  }
}, []);
  const handleLogin = () => {
  if (username === "" || password === "") {
    alert("Please enter username and password");
  } else {
    setLoading(true);

    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem("username", username);
      } else {
        localStorage.removeItem("username");
      }

      alert("Login Successful!");
      setLoading(false);
    }, 1000);
  }
};
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleLogin();
  }
};
    const handleForgot = () => {
     alert("Password reset link sent!");
    
};
if (showSignup) {
  return <Signup />;
}
const handleSignup = () => {
  setShowSignup(true);
};
 return(
        <>
        <div className="circle"></div>
        <div className="circle2"></div>

        <div className="login">
            <h1>{prop.title}</h1>
            <p className="subtitle">Please login to continue</p>

            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            />
          <input
             type={showPassword ? "text" : "password"}
             placeholder="password"
             value={password}
             onChange={(e) => setpassword(e.target.value)}
             onKeyDown={handleKeyDown}
              />
        <div className="show-password">
      <input
      type="checkbox"
      checked={showPassword}
      onChange={(e) => setShowPassword(e.target.checked)}
      />
        <span>Show Password</span>
          </div>
              
            <div className="remember">
            <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
           <span>Remember Me</span>
        </div>
             <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
             </button>
             <p className="forgot" onClick={handleForgot}>
             Forgot Password?
             </p>
             <p className="signup">
             Don't have an account? <span onClick={handleSignup}>Sign Up</span> 
             </p>
        
        </div>
        
</>
    );
}
export default Login;


            