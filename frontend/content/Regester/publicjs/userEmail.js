export { userEmailinfo, userEmail };

import { singupuser } from "./singUp.js";
let userEmail = document.querySelector("#user-email");
let trueUseremail = document.querySelector("#true-useremail");
function userEmailinfo(event) {
  userEmail.style.textAlign = "center";
  userEmail.style.paddingLeft = 0;

  let inputusereamailvalue = event.target.value;
  let regexemailvalue = /.+@gmail.com/;
  let truetypeuseremail = regexemailvalue.test(inputusereamailvalue);

  if (truetypeuseremail && event.keyCode === 13) {
    trueUseremail.classList.add("md:hidden");
  } else if (!truetypeuseremail && event.keyCode === 13) {
    trueUseremail.classList.remove("md:hidden");
  }
}
