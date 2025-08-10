let access = localStorage.getItem("token");

fetch(`http://localhost:4000/api/alert`, {
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
    Alert(res);
  });
const containeralarm = document.querySelector("#container-alarm");

function Alert(res) {
  let aitemalert = res.data.alerts;

  aitemalert.forEach((element) => {
    let conttoken = document.createElement("div");
    //  console.log(element);
    conttoken.setAttribute(
      "class",
      "bg-[#181A24] w-[348px] h-[70px] rounded-[10px] flex justify-center items-center gap-[2rem]"
    );
    conttoken.innerHTML = `    
      <div class="flex gap-[5px] w-[100px]">
              <img id="photo-token-alarm" class="w-[24px] h-[24px]" src="${element.coinId.image}" alt="">
              <h1 id="name-token-alarm" class="text-[#E5E5E5] text-[18px] w-[70px] text-center font-medium">
           ${element.coinId.name}
              </h1>
            </div>
            <div class="w-[80px]">
              <h1 id="price-token-alarm" class="text-white text-[16px] text-center font-medium">
                $${element.price}
              </h1>
            </div>
            <div class="w-[68px]">
              <button id="rename-token">
                <img class="w-[30px] h-[30px]" src="../public/svgs/WatchList/Button.png" alt="">
              </button>
              <button id="remove-token-alert">
              <p class="hidden">${element._id}</p>
                <img class="w-[30px] h-[30px]" src="../public/svgs/WatchList/Button1.png" alt="">
              </button>
            </div>
          `;

    containeralarm.append(conttoken);
  });
}

setTimeout(() => {
  let removee = document.querySelectorAll("#remove-token-alert");

  removee.forEach((event) => {
    event.addEventListener("click", () => {
      let currentId = event.children[0].innerHTML;

      remove(currentId);
    });
  });
}, 1500);

function remove(currency) {
  fetch(`http://localhost:4000/api/alert/${currency}`, {
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
