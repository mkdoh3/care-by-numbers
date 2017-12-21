Chart.defaults.global.animation.duration = 800;
Chart.defaults.global.defaultFontColor = '#4d2c02';
Chart.defaults.global.defaultFontFamily = 'roboto';
Chart.defaults.global.defaultFontSize = 16;


const addData = (procedure, state1, num1, state2, num2) => {
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
                backgroundColor: ["#4374e0", "#dee1e5", "#f2af58"],
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
