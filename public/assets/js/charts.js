Chart.defaults.global.animation.duration = 800;
Chart.defaults.global.defaultFontColor = '#4d2c02';
Chart.defaults.global.defaultFontFamily = 'roboto';
Chart.defaults.global.defaultFontSize = 16;


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

const barChart = Chart.Bar($("#min-max"), {
    data: {
        labels: ["Pennsylvania", "Average", "Arizona"],
        datasets: [
            {
                backgroundColor: ["#4374e0", "#b1b1b1", "#f2af58"],
                data: [2794182, 1000000, 382051],
        }],
    },
    options: {
        animation: {
            duration: 1500
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                barThickness: 100
        }]
        },

        legend: {
            display: false
        },
        title: {
            display: true,
            position: 'top',
            padding: 10,
            text: ['Maximum and Minimum Cost Country Wide', "Heart Transplant"]
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
    }
})




const lineChart = Chart.Line($("#region-div"), {
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
        title: {
            display: true,
            text: 'Min and Max Cost by Region'
        },
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
        //        tooltips: {
        //            enabled: true,
        //            mode: 'single',
        //            callbacks: {
        //                label: function (tooltipItems, data) {
        //***********hospital name to be added later*******
        //                }
        //            }
        //        }
    }
});



//the updateLineChart get request is wired to return the corresponding hospital name along with each min/max
//eventually I'd like to add those names into custom tooltips for the linechart



//called from maps.js
const updateLineChart = (state, id) =>
    $.get("/api/mm/" + state + "/" + id).then(function (data) {

        //not sure how much I like this approach for handling when there are not enough data points to draw the chart properly
        //might have to add some html updates at least so user knows whats happened
        if (data.length < 2) {
            return;
        }
        lineChart.data.labels = [];
        lineChart.data.datasets[0].data = [];
        lineChart.data.datasets[1].data = [];
        data.forEach(function (e) {
            lineChart.data.labels.push(e.region);
            lineChart.data.datasets[0].data.push(e.min);
            lineChart.data.datasets[1].data.push(e.max);
        });
        lineChart.update();
        $("#region-div").show();
    });
