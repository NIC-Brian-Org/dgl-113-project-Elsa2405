"use strict";
const user = [
  {
    id: 1,
    name: "Elsa",
    email: "admin@gmail.com",
    password: "123456",
    imgUrl: "assets/image/avatar.jpg",
  },
  {
    id: 2,
    name: "emily",
    email: "admin1@gmail.com",
    password: "1234567",
  },
];

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    try {
      var email = document.getElementById("email").value || "";
      var password = document.getElementById("password").value || "";

      if (!isValidEmail(email)) {
        alert("Email is not valid");
        return;
      }

      if (password.length < 6) {
        alert("Password must have at least 6 digits");
        return;
      }

      var foundUser = user.find(function (user) {
        return user.email === email && user.password === password;
      });

      if (foundUser) {
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 1);
        var expires = expiresDate.toUTCString();
        document.cookie =
          "username=" + foundUser.email + "; expires=" + expires + ";path=/";

        // Redirect or perform other action
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("loi: ", error);
    }
  });

function isValidEmail(email) {
  // Check valid email email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
