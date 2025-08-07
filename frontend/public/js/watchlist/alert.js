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
    conttoken.setAttribute(
      "class",
      "bg-[#181A24] w-[348px] h-[70px] rounded-[10px] flex justify-center items-center gap-[2rem]"
    );

    conttoken.innerHTML = `      <div class="flex gap-[5px] w-[100px]">
              <img id="photo-token-alarm" class="w-[24px] h-[24px]" src="../public/svgs/WatchList/Bitcoin.png" alt="">
              <h1 id="name-token-alarm" class="text-[#E5E5E5] text-[18px] w-[70px] text-center font-medium">
                Bitcoin
              </h1>
            </div>
            <div class="w-[80px]">
              <h1 id="price-token-alarm" class="text-white text-[16px] text-center font-medium">
                $64350
              </h1>
            </div>
            <div class="w-[68px]">
              <button id="rename-token">
                <img class="w-[30px] h-[30px]" src="../public/svgs/WatchList/Button.png" alt="">
              </button>
              <button id="remove-token">
                <img class="w-[30px] h-[30px]" src="../public/svgs/WatchList/Button1.png" alt="">
              </button>
            </div>
          `;
    containeralarm.append(conttoken);
  });
}
