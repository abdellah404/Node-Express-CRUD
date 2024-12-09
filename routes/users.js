const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

router.get("/", (req, res) => {
  res.send(JSON.stringify({ users }, null, 4));
});

router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.send(users.filter((user) => user.email === email));
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send("user with name " + user.firstName + " has been added!!!");
});

router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided
    let user = req.body;
    let DOB = user.DOB;
    if (DOB) {
      filtered_user.DOB = DOB;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} updated`);
  } else {
    // Send error message if no user found
    res.send("Unable to find user!");
  }
});

router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);
});

module.exports = router;
