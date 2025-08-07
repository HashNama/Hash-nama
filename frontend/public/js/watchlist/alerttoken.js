const alertbox = document.querySelector("#alert");
const inputpricealert = document.querySelector("#input-price-alert");
const closealert = document.querySelector("#close-alert");
const bgblur = document.querySelector("#bg-blur");
const incrroctvalue = document.querySelector("#incrroct-value");
let currentId = null;

setTimeout(() => {
  let add = document.querySelectorAll("#token-add");

  add.forEach((event) => {
    event.addEventListener("click", () => {
      alertbox.classList.remove("hidden");
      bgblur.classList.remove("hidden");

      currentId = event.children[0].innerHTML;
    });
  });
}, 1500);

inputpricealert.addEventListener("keypress", (element) => {
  let valuealert = element.target.value;
  tokenalert(currentId, valuealert, element);
});

closealert.addEventListener("click", () => {
  alertbox.classList.add("hidden");
  bgblur.classList.add("hidden");
});

bgblur.addEventListener("click", () => {
  alertbox.classList.add("hidden");
  bgblur.classList.add("hidden");
});

let access = localStorage.getItem("token");

function tokenalert(idadd, valuealert, element) {
  if (/^\d+(\.\d+)?$/.test(valuealert) && element.keyCode === 13) {
    alertbox.classList.add("hidden");
    bgblur.classList.add("hidden");
    incrroctvalue.classList.add("hidden");
    inputpricealert.value = "";

    console.log(valuealert, idadd);

    fetch(`http://localhost:4000/api/alert`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${access}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        coinId: idadd,
        price: valuealert,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  }
}
