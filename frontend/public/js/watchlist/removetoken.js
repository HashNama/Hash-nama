let access = localStorage.getItem("token");

setTimeout(() => {
  let removee = document.querySelectorAll("#token-remove");

  removee.forEach((event) => {
    event.addEventListener("click", () => {
      let currentId = event.children[0].innerHTML;

      remove(currentId);
      console.log(currentId);
    });
  });
}, 1500);

function remove(currency) {
  fetch(`http://localhost:4000/api/watchlist/${currency}`, {
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
      // console.log(data);
    });
}
