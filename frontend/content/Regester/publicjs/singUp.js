export { singupuser };

let userRegistration = document.querySelector("#user-registration");
let welUser = document.querySelector("#wel-user");
import { userEmail } from "./userEmail.js";
import { userPasswordconfirm } from "./userPassword.js";
import { userName } from "./userName.js";
//import { json } from "stream/consumers";
function singupuser(truetypepassword) {
  if (
    truetypepassword &&
    userEmail.value &&
    userName.value &&
    userPasswordconfirm.value
  ) {
    fetch("Http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userName.value,
        email: userEmail.value,
        password: userPasswordconfirm.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  } else if (
    !userName.value ||
    !userEmail.value ||
    !userPasswordconfirm.value
  ) {
    alert("لطفا تمامی فیلد ها را پر کنید");
  }
}
