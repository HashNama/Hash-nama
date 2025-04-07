const $ = document;
export { passwordinput };
import { userEmailinfo } from "./userEmail.js";
import { userNameinfo } from "./userName.js";
import { userpassworsinfo } from "./userPassword.js";
import { singupuser } from "./singUp.js";
const userName = $.querySelector("#user-name");
const userEmail = $.querySelector("#user-email");
const userPassword = $.querySelector("#user-password");
const userPasswordconfirm = $.querySelector("#user-password-confirm");
let userRegistration = $.querySelector("#user-registration");
let passwordinput = [userPassword, userPasswordconfirm];

userName.addEventListener("keypress", (event) => {
  userNameinfo(event);
});

userEmail.addEventListener("keypress", (event) => {
  userEmailinfo(event);
});

passwordinput.forEach((event, index) => {
  event.addEventListener("keypress", (confirm) => {
    userpassworsinfo(confirm);
    //console.log(`${index + 1}:`, confirm.key);
  });
});

userRegistration.addEventListener("click", () => {
  singupuser();
});
