const $ = document;
const btnLoginGoogel = $.querySelector("#btn-login-googel");
const btnLogin = $.querySelector(".btn-login");
let emailLogin = $.querySelector(".email-login");
let passwordLogin = $.querySelector(".password-login");
let newPassword = $.querySelector(".new-password");
let creatNewAccount = $.querySelector(".creat-new-account");
let falstypeinputemail = $.querySelector("#falstypeinputemail");
let falstypeinputpassword = $.querySelector("#falstypeinputpassword");
let imgHidePassword = $.querySelector(".img-hade-password");

let incorrectvalue = [falstypeinputpassword, falstypeinputemail];

incorrectvalue.forEach((event) => {
  event.style.display = "none";
});

btnLoginGoogel.addEventListener("click", () => {
  console.log("click");
});

emailLogin.addEventListener("keypress", (event) => {
  emailLogin.style.textAlign = "center";
  emailLogin.style.paddingLeft = 0;

  let valueInputemail = event.target.value;
  let regexinputemail = /.+@gmail.com/;
  let truetypeemail = regexinputemail.test(valueInputemail);

  if (truetypeemail && event.keyCode === 13) {
    falstypeinputemail.style.display = "none";
  } else if (!truetypeemail && event.keyCode === 13) {
    falstypeinputemail.style.display = "block";
    falstypeinputemail.style.paddingTop = "10px";
  }
});

passwordLogin.addEventListener("keypress", (event) => {
  passwordLogin.style.textAlign = "center";
  passwordLogin.style.paddingLeft = 0;

  let valueInputpassword = event.target.value;
  let regexinputpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
  let truetypepassword = regexinputpassword.test(valueInputpassword);
  if (
    valueInputpassword.length > 8 &&
    truetypepassword &&
    event.keyCode === 13
  ) {
    falstypeinputpassword.style.display = "none";
  } else if (
    valueInputpassword.length < 8 &&
    !truetypepassword &&
    event.keyCode === 13
  ) {
    falstypeinputpassword.style.display = "block";
    falstypeinputpassword.style.paddingTop = "10px";
  }
});

imgHidePassword.addEventListener("click", (event) => {
  if (passwordLogin.type === "password") {
    passwordLogin.setAttribute("type", "text");
    imgHidePassword.setAttribute("src", "../public/svgs/login/visible.png");
  } else if (passwordLogin.type === "text") {
    passwordLogin.setAttribute("type", "password");
    imgHidePassword.setAttribute("src", "../public/svgs/login/hide.svg");
  }
});

btnLogin.addEventListener("click", () => {
  let displaypassword = falstypeinputpassword.style.display;
  let displayemail = falstypeinputemail.style.display;
  if (
    displayemail === "none" &&
    displaypassword === "none" &&
    emailLogin.value &&
    passwordLogin.value
  ) {
    console.log(emailLogin.value, passwordLogin.value);

    fetch("Http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailLogin.value,
        password: passwordLogin.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  } else {
    alert("لطفا فیلد ها را برسی کنید");
  }
});
