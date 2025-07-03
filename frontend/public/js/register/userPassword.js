export { userpassworsinfo, userPasswordconfirm };
import { passwordinput } from "../register/regester.js";
import { singupuser } from "../register/singUp.js";
let userPassword = document.querySelector("#user-password");
let userPasswordconfirm = document.querySelector("#user-password-confirm");
let svgHidePassword = document.querySelector(".svg-hide-password");
let svgVisibelPassword = document.querySelector(".svg-visibel-password");
let truePassword = document.querySelector("#true-password");
let truePasswordConfirm = document.querySelector("#true-password-confirm");

function userpassworsinfo(confirm) {
  let password1 = passwordinput[0].value;
  if (userPassword.value) {
    userPassword.style.textAlign = "center";
    userPassword.style.paddingLeft = 0;
  }

  let userPasswordvalue = password1;
  let regexuserpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
  let truetypepassword = regexuserpassword.test(userPasswordvalue);

  if (truetypepassword) {
    truePassword.classList.add("md:hidden");
  } else if (!truetypepassword) {
    truePassword.classList.remove("md:hidden");
  }

  let password2 = passwordinput[1].value;
  if (userPasswordconfirm.value) {
    userPasswordconfirm.style.textAlign = "center";
    userPasswordconfirm.style.paddingLeft = 0;
  }

  //console.log(password1, password2);

  if (password1 === password2 && confirm.keyCode === 13) {
    singupuser(truetypepassword);
    truePasswordConfirm.classList.add("md:hidden");
  } else if (password1 !== password2 && confirm.keyCode === 13) {
    truePasswordConfirm.classList.remove("md:hidden");
  }
}

svgHidePassword.addEventListener("click", (event) => {
  if (userPassword.type === "password") {
    userPassword.setAttribute("type", "text");
    svgHidePassword.setAttribute("src", "../public/svgs/regester/visible.png");
  } else if (userPassword.type === "text") {
    userPassword.setAttribute("type", "password");
    svgHidePassword.setAttribute("src", "../public/svgs/regester/hide.png");
  }
});
svgVisibelPassword.addEventListener("click", (event) => {
  if (userPasswordconfirm.type === "password") {
    userPasswordconfirm.setAttribute("type", "text");
    svgVisibelPassword.setAttribute(
      "src",
      "../public/svgs/regester/visible.png"
    );
  } else if (userPasswordconfirm.type === "text") {
    userPasswordconfirm.setAttribute("type", "password");
    svgVisibelPassword.setAttribute("src", "../public/svgs/regester/hide.png");
  }
});
