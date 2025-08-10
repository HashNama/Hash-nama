let continer = document.querySelector("#continer-token");

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
    let creattoken = document.createElement("div");
    creattoken.setAttribute(
      "class",
      "w-[240px] h-[85px] bg-[#181A24] rounded-[10px]"
    );
    creattoken.innerHTML = `<div class="grid gap-[8px] items-center">
  <div class="flex  justify-center gap-[15px] pt-[16px]">
    <img
      src="${event.logo}"
      class="w-[24px] h-[24px] mt-[3px] rounded-[100%]"
      alt=""
    />
    <h1 class="text-[18px] text-[#E5E5E5] mt-[3px] w-[60px] font-semibold">${String(
      event.balance
    ).slice(0, 6)}</h1>
    <h1 id="balanc" class="text-[20px] w-[80px] text-[#FFFFFF] font-bold">${String(
      event.usdAmount
    ).slice(0, 7)}M</h1>
  </div>
  <div class="flex justify-center gap-[26px] ml-[16px]">
    <h1 class="text-[#A7A6B8] text-[14px] font-medium">${event.symbol}</h1>
    <div class="flex gap-[2px]">
      <h1 class="text-[#E5E5E5] text-[12px] font-medium">${String(
        event.price
      ).slice(0, 7)}</h1>
      <h1 id="percentChange" class="text-[#30E0A1] text-[10px] mt-auto mb-auto">${String(
        event.price24HourPercentChange
      ).slice(0, 6)}</h1>
      <img id="img-percent" src="../public/svgs/wallet/trending-up.png" alt="" />
    </div>
  </div>
</div>`;

    continer.append(creattoken);
  });
}
function bsctoken(bsc) {
  let percentChange = document.querySelectorAll("#percentChange");
  let imgpercent = document.querySelectorAll("#img-percent");

  imgpercent.forEach((img) => {
    console.log(img);
  });

  percentChange.forEach((e) => {
    let price24hc = +e.innerHTML <= 0;

    if (price24hc === true) {
      e.setAttribute(
        "class",
        "text-[10px] mt-auto mb-auto font-medium text-[#D92E4E]"
      );
      e.innerHTML = `${e.innerHTML}%`;
    } else if (price24hc === false) {
      e.setAttribute(
        "class",
        "text-[10px] mt-auto mb-auto font-medium text-[#00FFA3]"
      );
      e.innerHTML = `${e.innerHTML}%`;
    }
  });

  //console.log(bsc);
}
function ethtoken(eth) {
  console.log(eth);
}
function polygontoken(polygon) {
  console.log(polygon);
}
