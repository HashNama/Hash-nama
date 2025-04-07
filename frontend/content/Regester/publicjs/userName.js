let userName = document.querySelector("#user-name");
let trueUserName = document.querySelector("#true-username");
export { userNameinfo, userName };
import { singupuser } from "./singUp.js";

function userNameinfo(event) {
  userName.style.textAlign = "center";
  userName.style.paddingLeft = 0;

  let inputusernamevalue = event.target.value;
  let regexusername = /^[a-zA-Z][a-zA-Z0-9._]{7,19}$/;
  let truetypeusername = regexusername.test(inputusernamevalue);

  if (truetypeusername && event.keyCode === 13) {
    trueUserName.classList.add("md:hidden");
  } else if (!truetypeusername && event.keyCode === 13) {
    trueUserName.classList.remove("md:hidden");
  }
}
