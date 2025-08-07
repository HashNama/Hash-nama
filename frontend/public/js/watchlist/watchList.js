const searchinput = document.querySelector("#sarch-input");
const searching = document.querySelector("#searching");
const alertbox = document.querySelector("#alert");
const containerlist = document.querySelector("#container-list");
searchinput.addEventListener("keypress", (event) => {
  searching.remove();
  searching.classList.add("text-center");
  if (event.keyCode) {
    //  console.log(event.target.value);
  }
});

let access = localStorage.getItem("token");
let body = document.querySelector("body");

fetch("Http://localhost:4000/api/watchlist", {
  method: "GET",
  headers: {
    authorization: `Bearer ${access}`,
    "Content-type": "application/json",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    childrencontainer(res);
  });

function childrencontainer(res) {
  let listtoken = res.data.watchList;
  // console.log(listtoken);
  listtoken.forEach((element) => {
    // console.log(element);
    let parentlist = document.createElement("div");
    parentlist.setAttribute(
      "class",
      "flex gap-[4.8rem] justify-center items-center border-b-[1px] border-white w-[1076px] h-[78px]"
    );
    parentlist.innerHTML = `
    
             <ul class="w-[28px] text-center">
              <h1 class="text-[16px] text-[#E5E5E5] font-medium">1</h1>
            </ul>
            <ul class="flex gap-[5px] w-[100px] text-center">
              <img id="token-list" class="w-[24px] h-[24px]" src="${
                element.coin.image
              }" alt="">
              <h1 id="name-token-list" class="text-[16px] text-[#E5E5E5] font-bold">
                ${String(element.coin.name).slice(0, 8)}
              </h1>
            </ul>
            <ul class="w-[90px]">
              <h1 id="balance-token-list" class="text-[16px] text-[#E5E5E5] font-bold">
                $${element.coin.price}
              </h1>
            </ul>
            <ul class="w-[90px]">
              <h1 id="price-token-list" class="text-[16px] text-[#00FFA3]  font-bold">
                ${String(element.coin.priceChange24h).slice(0, 7)}
              </h1>
            </ul>
            <ul style="direction: rtl" class="w-[64px] ">
              <h1 class=" text-[14px] text-[#E5E5E5] font-medium">${String(
                element.coin.marketCap
              ).slice(0, 4)}%</h1>
            </ul>
            <ul style="direction: rtl" class="w-[120px]">
              <img src="../public/svgs/WatchList/Frame 34408.png" id="chart-list" alt="">
            </ul>
            <ul class="flex gap-[5px] w-[80px]">
              <button class="w-[30px] h-[30px]" id="token-add">
                <p class="hidden" id="id-token">${element._id}</p> 
               <img class="w-[50px] h-[30px]" src="../public/svgs/WatchList/Group 162805.png" alt="">
              </button>
              <button class="w-[30px] h-[30px]" id="token-remove">
               <p class="hidden" id="id-token">${element._id}</p>   
              <img class="w-[30px] h-[30px]" src="../public/svgs/WatchList/Button1.png" alt="">
              </button>
            </ul>
    
    `;
    containerlist.append(parentlist);
  });
}

setTimeout(() => {
  let pricetokenlist = document.querySelectorAll("#price-token-list");
  pricetokenlist.forEach((e) => {
    let price24hc = +e.innerHTML <= 0;

    if (price24hc === true) {
      e.setAttribute(
        "class",
        "text-[16px] w-[80px] font-medium text-[#D92E4E]"
      );
      e.innerHTML = `$${e.innerHTML}`;
    } else if (price24hc === false) {
      e.setAttribute(
        "class",
        "text-[16px] w-[80px] font-medium text-[#00FFA3]"
      );
      e.innerHTML = `$${e.innerHTML}`;
    }
  });
}, 1000);

/*
function postidalert(event) {
  fetch(`http://localhost:4000/api/alert`, {
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
      console.log(res);
    });
}
*/
/*
let remove = document.querySelectorAll("#token-remove");

add.forEach((event) => {
  event.addEventListener("click", () => {
    let idadd = event.children[0].innerHTML;

    fetch(`Http://localhost:4000/api/watchlist/${idadd}`, {
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
        console.log(res);
      });
    console.log(idadd);
  });
});
remove.forEach((event) => {
  event.addEventListener("click", () => {
    //  let idremove = event.children[0].innerHTML;
  });
});
*/
