let access = localStorage.getItem("token");

setTimeout(() => {
  let add = document.querySelectorAll("#token-add");

  add.forEach((event) => {
    event.addEventListener("click", () => {
      let currentId = event.children[0].innerHTML;

      remove(currentId);
    });
  });
}, 1500);

function remove(currency) {
  fetch(`http://localhost:4000/api/watchlist/:${currency}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
