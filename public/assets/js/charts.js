Chart.defaults.global.animation.duration = 1200;
Chart.defaults.global.defaultFontColor = '#4d2c02';
Chart.defaults.global.defaultFontFamily = 'roboto';
Chart.defaults.global.defaultFontSize = 16;

let barChart;
let lineChart;

function drawBarChart() {
    const barCtx = document.getElementById("min-max").getContext("2d");
    barChart = Chart.Bar(barCtx, {
        data: {
            labels: ["Pennsylvania", "Average", "Arizona"],
            datasets: [{
                backgroundColor: ["#4374e0", "#b6b6b6", "#f2af58"],
                data: [2794182, 1000000, 382051],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    barThickness: 70
                }]
            },
            tooltips: {
                //convert tooltips to dollar format
                callbacks: {
                    label: function (tooltipItem, data) {
                        return "$" + Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function (c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                        });
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                position: 'top',
                padding: 10,
                text: ['Maximum and Minimum Cost Country Wide', "Heart Transplant"]
            }
        }
    });
}

function drawLineChart() {
    const lineCtx = document.getElementById("region-div").getContext("2d");
    lineChart = Chart.Line(lineCtx, {
        data: {
            labels: [],
            datasets: [{
                label: "Min",
                backgroundColor: "#f2af58",
                borderColor: "#f2af58",
                data: [],
                fill: false,
            }, {
                label: "Max",
                fill: false,
                backgroundColor: "#4374e0",
                borderColor: "#4374e0",
                data: [],
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 4,
                        suggestedMax: 10
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return "$" + Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function (c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                        });
                    }
                }
            }
        }
    });
}

const updateBarChart = (procedure, state1, num1, state2, num2) => {
    //very unscientific average.. will fix later!
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let average = num1 + num2 / 2;
    barChart.data.labels = [state2, "Average", state1]
    barChart.data.datasets[0].data = [num2, average, num1];
    barChart.options.title.text[1] = procedure
    barChart.update();
}

//the updateLineChart get request is wired to return the corresponding hospital name along with each min/max
//eventually I'd like to add those names into custom tooltips for the linechart

//would like to add handle for the few cases where there are not enough data points to draw a line chart

//called from maps.js
const updateLineChart = function (state, id) {
    lineChart.data.labels = [];
    lineChart.data.datasets[0].data = [];
    lineChart.data.datasets[1].data = [];
    $.get("/api/mm/" + state + "/" + id).then(function (data) {
        data.forEach(function (e) {
            lineChart.data.labels.push(e.region);
            lineChart.data.datasets[0].data.push(e.min);
            lineChart.data.datasets[1].data.push(e.max);
        });
        lineChart.update();
        $("#region-div").show();
    });
}