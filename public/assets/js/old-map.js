    $(document).on("click", ".state-select", function () {
        $("#title-for-state").children("h1:first").remove();
        console.log("clicked")
        let stateCap = $(this).data("state");
        let state = $(this).data("state").toLowerCase();
        let procId = $(this).data("id");
        $("#title-for-state").append("<h1>" + stateCap + "<small> Procedure Cost by Hospital</small></h1>");
        getStateCostData(state, procId);
    })



    function getDataForMap(data, name) {
        var mapDataArray = [];
        mapDataArray.push(["State", 'Average Cost of Procedure']);
        $.each(data, function (key, value) {
            mapDataArray.push([value.state, parseInt(value.averageCost)]);
        });
        console.log(mapDataArray);
        createRegionMap();
        drawRegionsMap(mapDataArray, name);
    }




    function getDataForState(data, name) {
        var stateDataArray = [];
        stateDataArray.push(["Hospital Name", "Hospital Address", "Procedure Cost"]);
        var regionTemp = data[0].Provider.region;
        var region = "US-" + regionTemp.slice(0, 2);
        $.each(data, function (key, value) {
            stateDataArray.push([value.Provider.providerName, value.Provider.address + " " + value.Provider.city + " " + value.Provider.state, parseInt(value.hospitalCharges)]);
        })
        console.log(stateDataArray);
        createStateMap();
        drawMarkersMap(stateDataArray, name, region);
    }





    function createRegionMap() {

        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'AIzaSyCfZ7tXLzQQU_yWm7iJJwWjKwaasAFUUBY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);
    }

    function drawRegionsMap(dataArray, name) {
        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
            colorAxis: {
                colors: ['#dee1e5', '#4374e0']
            } // gray to blue
        };
        var chart = new google.visualization.GeoChart(document.getElementById('map'));
        chart.draw(data, options);
    };

    function createStateMap() {
        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'AIzaSyCfZ7tXLzQQU_yWm7iJJwWjKwaasAFUUBY'
        });
        google.charts.setOnLoadCallback(drawMarkersMap);
    }

    function drawMarkersMap(dataArray, name, region) {
        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
            sizeAxis: {
                minValue: 0,
                maxValue: 100
            },
            displayMode: 'markers',
            region: region,
            resolution: 'provinces',
            colorAxis: {
                colors: ['#dee1e5', '#4374e0']
            } // gray to blue
        };
        var chart = new google.visualization.GeoChart(document.getElementById('state_map'));
        chart.draw(data, options);
    };
