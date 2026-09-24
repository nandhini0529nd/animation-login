import { useState } from "react";
import "./Login.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleSignup = () => {
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill all fields");
  } else if (!email.includes("@")) {
    alert("Please enter a valid email");
  } else if (password !== confirmPassword) {
    alert("Passwords do not match");
  } else {
    setLoading(true);

    setTimeout(() => {
      alert("Account Created Successfully!");
      setLoading(false);
    }, 1000);
  }
};
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSignup();
  }
};

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div className="signup-page">
      <h1>Create Account</h1>
      <p className="subtitle">Create your account to continue</p>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

    <input
     type={showConfirmPassword ? "text" : "password"}
     placeholder="Confirm Password"
     value={confirmPassword}
     onChange={(e) => setConfirmPassword(e.target.value)}
     onKeyDown={handleKeyDown}
   />
   <div className="show-password">
    <input
    type="checkbox"
    checked={showConfirmPassword}
    onChange={(e) => setShowConfirmPassword(e.target.checked)}
    />
  <span>Show Confirm Password</span>
</div>
      <button onClick={handleSignup} disabled={loading}>
  {loading ? "Creating Account..." : "Sign Up"}
</button>

      <button onClick={handleBack}>Back to Login</button>
    </div>
  );
}

export default Signup;