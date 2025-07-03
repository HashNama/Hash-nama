window.onload = function () {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Blue", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [70, 30],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: false,
      cutout: "80%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};
