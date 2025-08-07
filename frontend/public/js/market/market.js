const notificationsimg = document.querySelector("#notifications-img");
const btnspeack = document.querySelector("#btn-speack");
const searching = document.querySelector("#searching");
const searchinput = document.querySelector("#search-input");

searchinput.addEventListener("keypress", (event) => {
  searching.remove();
  if (event.keyCode) {
    console.log(event.target.value);
  }
});

fetch("Http://localhost:4000/api/market")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    watchmarket(res.data.market);
  });

const containermarket = document.querySelector("#container-market");
const pagination = document.querySelector("#pagination");
let btnprev = document.querySelector("#btn-prev");
let btnnext = document.querySelector("#btn-next");

function watchmarket(data) {
  const items = [];
  for (let i = 1; i <= data.length; i++) {
    items.push(` شماره ${i}`);
  }

  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = 1;

  function displayItems(page) {
    containermarket.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);

    paginatedItems.forEach((event) => {
      let tokenmarket = document.createElement("div");
      tokenmarket.setAttribute(
        "class",
        "w-[1429px] h-[78px] flex gap-[4.5rem] items-center justify-center ml-auto mr-auto border-b-[1px] border-white mt-[20px]"
      );
      tokenmarket.innerHTML = `
        <ul class="w-[28px] text-center">
          <p id="number-currency" class="text-[16px] text-[#E5E5E5]">${
            event.marketCapRank
          }</p>
        </ul>
        <ul class="flex gap-[3px] w-[100px] text-center">
          <img class="w-[24px] h-[24px]" id="img-currency" src="${
            event.image
          }" alt="">
          <h1 id="name-currency" class="text-[#E5E5E5] w-[80px] font-medium text-center text-[16px]">
            ${String(event.name).slice(0, 8)}
          </h1>
        </ul>
        <ul class="w-[100px] h-[25px]">
          <h1 class="text-[#E5E5E5] w-[100px] text-[14px] font-medium" id="price-currency">
            $${event.price}
          </h1>
        </ul>
        <ul class="w-[100px] h-[25px]">
          <h1 id="difrent-currency" class="text-[#00FFA3] w-[100px] text-[12px]">
            ${String(event.priceChange24h).slice(0, 7)}
          </h1>
        </ul>
        <ul class="w-[100px] h-[25px]">
          <h1 id="cap-currency" class="text-[#E5E5E5] w-[100px] text-[14px] font-medium">
            $${String(event.marketCap).slice(0, 4)}T
          </h1>
        </ul>
        <ul class="w-[100px] h-[25px]">
          <h1 id="value-currency" class="text-[#E5E5E5] w-[100px] text-[14px] font-medium">
            $${String(event.volume24h).slice(0, 6)}B
          </h1>
        </ul>
        <ul class="w-[100px] h-[25px] text-center">
          <h1 id="type-currency" class="text-[#E5E5E5] w-[100px] text-[14px] font-medium">
            ${String(event.circulatingSupply).slice(0, 4)} ${event.symbol}
          </h1>
        </ul>
        <ul class="w-[100px] h-[25px] text-center">
          <img class="w-[80px] h-[24px]" src="../public/svgs/market/Frame 34408.png" alt="">
        </ul>
        <ul id="token-add" class="w-[70px] h-[30px] text-center flex justify-center">
        <img class="h-[28px] w-[70px]"  src="../public/svgs/market/Frame 34336.png" alt="">
        <p class="hidden" id="id-token">${event._id}</p> 
        </ul>`;

      containermarket.append(tokenmarket);
    });

    updatePagination(page);
  }

  setTimeout(() => {
    let difrentcurrency = document.querySelectorAll("#difrent-currency");
    difrentcurrency.forEach((e) => {
      let price24hc = +e.innerHTML <= 0;

      if (price24hc === true) {
        e.setAttribute(
          "class",
          "text-[14px] w-[80px] font-medium text-[#D92E4E]"
        );
        e.innerHTML = `${e.innerHTML}%`;
      } else if (price24hc === false) {
        e.setAttribute(
          "class",
          "text-[14px] w-[80px] font-medium text-[#00FFA3]"
        );
        e.innerHTML = `${e.innerHTML}%`;
      }
    });
  }, 1000);

  function updatePagination(current) {
    pagination.innerHTML = "";

    const maxButtons = 5;
    let start = Math.max(1, current - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    if (start > 1) {
      appendPageButton(1);
      if (start > 2) appendDots();
    }

    for (let i = start; i <= end; i++) {
      appendPageButton(i, i === current);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) appendDots();
      appendPageButton(totalPages);
    }
  }

  function appendPageButton(pageNumber, isActive = false) {
    const btn = document.createElement("ul");
    btn.className =
      "w-[32px] h-[32px] " +
      (isActive ? "bg-[#4667FB]" : "bg-[#181A24]") +
      " rounded-[10px] text-[12px] mt-[5px] cursor-pointer text-[#ffffff] font-medium flex justify-center items-center numberpage";
    btn.innerText = pageNumber;
    btn.addEventListener("click", () => {
      currentPage = pageNumber;
      displayItems(currentPage);
      setTimeout(() => {
        const addtoken = document.querySelectorAll("#token-add");
        let access = localStorage.getItem("token");
        // console.log(addtoken);
        addtoken.forEach((event) => {
          // console.log(event);
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
    });

    pagination.appendChild(btn);
  }

  function appendDots() {
    const dots = document.createElement("ul");
    dots.innerText = "...";
    dots.className =
      "w-[32px] h-[32px] rounded-[10px] text-[12px] mt-[5px] text-gray-400 font-medium flex justify-center items-center";
    pagination.appendChild(dots);
  }
  displayItems(1);
  btnprev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayItems(currentPage);
      setTimeout(() => {
        const addtoken = document.querySelectorAll("#token-add");
        let access = localStorage.getItem("token");
        // console.log(addtoken);
        addtoken.forEach((event) => {
          console.log(event);
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
    }
  });

  btnnext.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayItems(currentPage);
      setTimeout(() => {
        const addtoken = document.querySelectorAll("#token-add");
        let access = localStorage.getItem("token");
        // console.log(addtoken);
        addtoken.forEach((event) => {
          console.log(event);
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
    }
  });
}
