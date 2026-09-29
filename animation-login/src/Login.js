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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
  const savedUsername = localStorage.getItem("username");

  if (savedUsername) {
    setUsername(savedUsername);
    setRememberMe(true);
  }
}, []);
 const handleLogin = async () => {
  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();

    console.log(data);
    if (response.ok) {
      alert(data.message);
      setIsLoggedIn(true)
     } else {
     alert(data.message);
     }
  } catch (error) {
      alert("Backend connection failed");
  }

  setLoading(false);
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
 
  if (isLoggedIn) {
  return (
    <div className="login">
      <h1>Welcome, {username}!</h1>
      <p className="subtitle">You are successfully logged in.</p>

      <button
         onClick={() => {
    setIsLoggedIn(false);
    setpassword("");
  }}
>
  Logout
</button>
    </div>
  );
}
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


            