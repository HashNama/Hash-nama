setTimeout(() => {
  const addtoken = document.querySelectorAll("#token-add");
  let access = localStorage.getItem("token");
  // console.log(addtoken);
  addtoken.forEach((event) => {
    //console.log(event);
    event.addEventListener("click", (aitem) => {
      let idtoken = event.children;
      let numberid = idtoken[1].innerHTML;

      fetch(`Http://localhost:4000/api/watchlist/${numberid}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${access}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === 400) {
            alert(res.error);
          } else if (res.status === 201) {
            alert(res.data.message);
          }
        });
    });
  });
}, 1000);
