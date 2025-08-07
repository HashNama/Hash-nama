const containerwachtlist = document.querySelector("#container-wachtlist");
const containermarket = document.querySelector("#container-market");

fetch("Http://localhost:4000/api/market")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    dashboardMarket(res.data.market);
  });

function dashboardMarket(res) {
  res.forEach((element) => {
    let tokenmarket = document.createElement("div");
    tokenmarket.setAttribute(
      "class",
      "w-[482px] h-[54px] flex justify-center items-center gap-[60px] ml-auto mr-auto border-b-[1px] border-white"
    );

    tokenmarket.innerHTML = `
    
       <ul class="w-[48px] text-center">
                  <h1
                    id="number-marketing"
                    class="text-[16px] font-medium text-[#E5E5E5]"
                  >
                    ${element.marketCapRank}
                  </h1>
                </ul>
                <ul class="w-[140px] flex gap-[5px]">
                  <img
                    class="w-[24px] h-[24px]"
                    id="img-markting"
                    src="${element.image}"
                    alt=""
                  />
                  <h1 class="text-[#E5E5E5] text-[16px] font-medium">
                   ${String(element.name).slice(0, 8)}
                  </h1>
                </ul>
                <ul>
                  <h1
                    id="price-markting"
                    class="text-[14px] w-[80px] font-medium text-[#E5E5E5]"
                  >
                   ${element.price}
                  </h1>
                </ul>
                <ul>
                  <h1
                    id="percent-markting"
                    class="text-[14px] w-[80px] font-medium text-[#00FFA3]"
                  >
                   ${String(element.priceChange24h).slice(0, 7)}
                  </h1>
                </ul>
    
    `;
    containermarket.append(tokenmarket);
  });
}
setTimeout(() => {
  let percentmarkting = document.querySelectorAll("#percent-markting");
  percentmarkting.forEach((e) => {
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
let access = localStorage.getItem("token");

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
    dashboardwachtlist(res.data.watchList);
  });

function dashboardwachtlist(res) {
  res.forEach((element) => {
    let tokenwachlist = document.createElement("div");
    tokenwachlist.setAttribute(
      "class",
      "w-[482px] h-[54px] flex justify-center items-center gap-[60px] ml-auto mr-auto border-b-[1px] border-white"
    );
    tokenwachlist.innerHTML = `
    
       <ul class="w-[48px] text-center">
                  <h1
                    id="number-marketing"
                    class="text-[16px] font-medium text-[#E5E5E5]"
                  >
                    1
                  </h1>
                </ul>
                <ul class="w-[140px] flex gap-[5px]">
                  <img
                    class="w-[24px] h-[24px]"
                    id="img-markting"
                    src="${element.coin.image}"
                    alt=""
                  />
                  <h1 class="text-[#E5E5E5] text-[16px] font-medium">
                   ${String(element.coin.name).slice(0, 8)}
                  </h1>
                </ul>
                <ul>
                  <h1
                    id="price-markting"
                    class="text-[14px] w-[80px] font-medium text-[#E5E5E5]"
                  >
                   ${element.coin.price}
                  </h1>
                </ul>
                <ul>
                  <h1
                    id="percent-markting"
                    class="text-[14px] w-[80px] font-medium text-[#00FFA3]"
                  >
                   ${String(element.coin.priceChange24h).slice(0, 7)}
                  </h1>
                </ul>
    
    `;

    containerwachtlist.append(tokenwachlist);
  });
}

setTimeout(() => {
  let percentmarkting = document.querySelectorAll("#percent-markting");
}, 1000);

const pricemarketcap = document.querySelector("#price-marketcap");
const Vtreaiding = document.querySelector("#V-treaiding");
const daminancetokeneth = document.querySelector("#daminance-tokeneth");
const daminancetokenbtc = document.querySelector("#daminance-tokenbtc");
const myvalue = document.querySelector("#myvalue");
const percentmarketcap = document.querySelector("#percent-marketcap");
fetch("../public/global.json", {
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
    percentmarketcap.innerHTML = `${String(
      res.data.market_cap_change_percentage_24h_usd
    ).slice(0, 7)}%`;

    if (res.data.market_cap_change_percentage_24h_usd < 0) {
      percentmarketcap.setAttribute(
        "class",
        "text-[#D92E4E] text-center text-[12px] font-bold w-[80px]"
      );
    } else if (res.data.market_cap_change_percentage_24h_usd > 0) {
      percentmarketcap.setAttribute(
        "class",
        "text-[#00FFA3] text-center text-[12px] font-bold w-[80px]"
      );
    }

    daminancetokenbtc.innerHTML = `${String(
      res.data.market_cap_percentage.btc
    ).slice(0, 5)}`;

    daminancetokeneth.innerHTML = `${String(
      res.data.market_cap_percentage.eth
    ).slice(0, 5)}`;

    Vtreaiding.innerHTML = `$${res.data.total_volume.usd}`;

    pricemarketcap.innerHTML = `$${res.data.total_market_cap.usd}`;

    myvalue.innerHTML = `$${res.data.active_cryptocurrencies}`;
  });

const numbersceard = document.querySelector("#number-sceard");
const textsceard = document.querySelector("#text-sceard");
fetch("../public/fng.json", {
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
    numbersceard.innerHTML = res.data[0].value;
    textsceard.innerHTML = res.data[0].value_classification;
    textsceard.setAttribute(
      "class",
      "text-[24px] w-[80px] text-[#D92E4E] font-bold"
    );
  });

fetch("Http://localhost:4000/api/market")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    daminances(res.data.market);
  });

const daminanceeth = document.querySelector("#daminanceeth");
const daminancebtc = document.querySelector("#daminancebtc");
function daminances(res) {
  // console.log(res);
  const tokenbtc = res.find((u) => u.name === "Bitcoin");
  daminancebtc.innerHTML = `${String(tokenbtc.priceChangePercentage24h).slice(
    0,
    6
  )}%`;
  if (tokenbtc.priceChangePercentage24h < 0) {
    daminancebtc.setAttribute(
      "class",
      "w-[80px] text-[#D92E4E] text-[18px] font-medium"
    );
  } else if (tokenbtc.priceChangePercentage24h > 0) {
    daminancebtc.setAttribute(
      "class",
      "w-[80px] text-[#00FFA3] text-[18px] font-medium"
    );
  }
  const tokeneth = res.find((u) => u.name === "Ethereum");
  daminanceeth.innerHTML = `${String(tokeneth.priceChangePercentage24h).slice(
    0,
    6
  )}%`;
  if (tokeneth.priceChangePercentage24h < 0) {
    daminanceeth.setAttribute(
      "class",
      "w-[80px] text-[#D92E4E] text-[18px] font-medium"
    );
  } else if (tokeneth.priceChangePercentage24h > 0) {
    daminanceeth.setAttribute(
      "class",
      "w-[80px] text-[#00FFA3] text-[18px] font-medium"
    );
  }
}

fetch("Http://localhost:4000/api/market")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    let data = res.data.market;

    const minChangeObj = data.reduce((minObj, current) => {
      return current.priceChangePercentage24h < minObj.priceChangePercentage24h
        ? current
        : minObj;
    });
    const maxChangeObj = data.reduce((maxObj, current) => {
      return current.priceChangePercentage24h > maxObj.priceChangePercentage24h
        ? current
        : maxObj;
    });

    minmaxPercentage(maxChangeObj, minChangeObj);
  });

const imgmax = document.querySelector("#img-max");
const maxtoken = document.querySelector("#max-token");
const pricemax = document.querySelector("#price-max");
const maxPercentage = document.querySelector("#max-Percentage");
const imgmin = document.querySelector("#img-min");
const mintoken = document.querySelector("#min-token");
const pricemin = document.querySelector("#price-min");
const minPercentage = document.querySelector("#min-Percentage");
function minmaxPercentage(maxChangeObj, minChangeObj) {
  imgmax.setAttribute("src", maxChangeObj.image);
  maxtoken.innerHTML = String(maxChangeObj.symbol).slice(0, 3);
  pricemax.innerHTML = `$${maxChangeObj.price}`;
  if (maxChangeObj.priceChangePercentage24h <= 0) {
    maxPercentage.innerHTML = `${String(
      maxChangeObj.priceChangePercentage24h
    ).slice(0, 7)}%`;
    maxPercentage.setAttribute(
      "class",
      "font-medium text-[20px] text-[#D92E4E]"
    );
  } else if (maxChangeObj.priceChangePercentage24h > 0) {
    maxPercentage.innerHTML = `${String(
      maxChangeObj.priceChangePercentage24h
    ).slice(0, 7)}%`;
    maxPercentage.setAttribute(
      "class",
      "font-medium text-[20px] text-[#00FFA3]"
    );
  }
  imgmin.setAttribute("src", minChangeObj.image);
  mintoken.innerHTML = String(minChangeObj.symbol).slice(0, 3);
  pricemin.innerHTML = `$${minChangeObj.price}`;
  if (minChangeObj.priceChangePercentage24h <= 0) {
    minPercentage.innerHTML = `${String(
      minChangeObj.priceChangePercentage24h
    ).slice(0, 7)}%`;
    minPercentage.setAttribute(
      "class",
      "font-medium text-[20px] text-[#D92E4E]"
    );
  } else if (minChangeObj.priceChangePercentage24h > 0) {
    minPercentage.innerHTML = `${String(
      maxChangeObj.priceChangePercentage24h
    ).slice(0, 7)}%`;
    minPercentage.setAttribute(
      "class",
      "font-medium text-[20px] text-[#00FFA3]"
    );
  }
}
