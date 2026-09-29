const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
let users = [
{
    username: "nandhini",
    password: "1234"
  },
   {
    username: "devendiran",
    password: "5678"
  }
];
app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.get("/users",(req,res)=>{
    res.json(users);

});

app.post("/users", (req, res) => {
   console.log("POST request received:", req.body);
  const user = req.body;
  users.push(user);

  res.json({
    message: "User added successfully",
    user:user
  });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (item) =>
      item.username === username &&
      item.password === password
  );

  if (user) {
    res.json({
      message: "Login Successful!"
    });
  } else {
    res.status(401).json({
      message: "Invalid username or password"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});