export { singupuser };

let userRegistration = document.querySelector("#user-registration");
let welUser = document.querySelector("#wel-user");
import { userEmail } from "../register/userEmail.js";
import { userPasswordconfirm } from "../register/userPassword.js";
import { userName } from "../register/userName.js";
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
        return postTokenWallet(res);
      });
  } else if (
    !userName.value ||
    !userEmail.value ||
    !userPasswordconfirm.value
  ) {
    alert("لطفا تمامی فیلد ها را پر کنید");
  }
}

function postTokenWallet(res) {
  let dataToken = res.data.accessToken;
  // console.log(dataToken);
  localStorage.setItem("token", dataToken);
  let access = localStorage.getItem("token");

  fetch("Http://localhost:4000/api/wallet/", {
    method: "POST",
    headers: {
      authorization: `Bearer ${access}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      address: "0xf7b10d603907658f690da534e9b7dbc4dab3e2d6",
    }),
  })
    .then((respons) => {
      return respons.json();
    })
    .then((respons) => {
      console.log(respons);
    });
}
