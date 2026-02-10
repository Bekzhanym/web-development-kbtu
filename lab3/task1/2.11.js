"use strict";

let userName = prompt("Who's there?", "");

if (userName === "Admin") {

  let password = prompt("Password?", "");

  if (password === "Bekzhan") {
    alert("Welcome!");
  } else if (password === "" || password === null) {
    alert("Canceled");
  } else {
    alert("Wrong password");
  }

} else if (userName === "" || userName === null) {
  alert("Canceled");
} else {
  alert("I don’t know you");
}
