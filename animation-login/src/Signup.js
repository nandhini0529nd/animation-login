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
  

  const handleSignup = async () => {
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });

    const data = await response.json();

    console.log(data);

    alert("Account Created Successfully!");
  } catch (error) {
    alert("Backend connection failed");
  }

  setLoading(false);
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