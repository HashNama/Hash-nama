let continer = document.querySelector("#continer-token");

window.addEventListener("click", () => {
  let access = localStorage.getItem("token");

  fetch("Http://localhost:4000/api/wallet/", {
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
      assetstoken(res);
    });
});

function assetstoken(res) {
  let base = res.data.portfolio.base.assets;
  let bsc = res.data.portfolio.bsc.assets;
  let eth = res.data.portfolio.eth.assets;
  let polygon = res.data.portfolio.polygon.assets;
  basetoken(base);
  bsctoken(bsc);
  ethtoken(eth);
  polygontoken(polygon);
}
function basetoken(base) {
  base.forEach((event) => {
    //let usdAmounttoken = `${event.usdAmount}`;
    //  let numbertoken = usdAmounttoken.substr(1);
    //let amount = Number(parseFloat(numbertoken).toFixed(4));

    let creattoken = document.createElement("div");
    creattoken.setAttribute(
      "class",
      "w-[240px] h-[85px] bg-[#181A24] rounded-[10px]"
    );
    creattoken.innerHTML = `<div class="grid gap-[8px] items-center">
  <div class="flex  justify-center gap-[24px] pt-[16px]">
    <img
      src="${event.logo}"
      class="w-[24px] h-[24px]  rounded-[100%]"
      alt=""
    />
    <h1 class="text-[18px] text-[#E5E5E5] font-semibold">${event.balance}</h1>
    <h1 id="balanc" class="text-[20px] text-[#FFFFFF] font-bold">${event.usdAmount}</h1>
  </div>
  <div class="flex gap-[26px] ml-[16px]">
    <h1 class="text-[#A7A6B8] text-[14px] font-medium">${event.symbol}</h1>
    <div class="flex gap-[2px]">
      <h1 class="text-[#E5E5E5] text-[12px] font-medium">${event.price}</h1>
      <h1 class="text-[#30E0A1] text-[10px] mt-auto mb-auto">1.90%</h1>
      <img src="../public/svgs/wallet/trending-up.png" alt="" />
    </div>
  </div>
</div>`;

    continer.append(creattoken);
  });
  let amount = document.querySelectorAll("#balanc");
  const result = base.map((num) => {
    let usdAmounttoken = num.usdAmount;
    let numbertoken = usdAmounttoken.substr(1);
    return Number(parseFloat(numbertoken).toFixed(4));
  });
  console.log(result);
}
function bsctoken(bsc) {
  console.log(bsc);
}
function ethtoken(eth) {
  console.log(eth);
}
function polygontoken(polygon) {
  console.log(polygon);
}
