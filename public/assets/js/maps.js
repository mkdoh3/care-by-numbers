function drawMap(id) {

    $.get('/api/avg/' + id).then(function (data) {
        console.log(data)
        let dataObj = {
            "type": "map",
            "theme": "none",
            "colorSteps": 10,
            "dataProvider": {
                "map": "usaLow",
                "areas": []
            },

            "areasSettings": {
                "autoZoom": true
            },

            "valueLegend": {
                "right": 10,
                "minValue": "$",
                "maxValue": "$$$"
            },

            "export": {
                "enabled": false
            }

        };
        data.forEach(function (e) {
            let areaObj = {
                "id": e.state,
                "value": e.averageCost
            };
            dataObj.dataProvider.areas.push(areaObj)

        })


        const map = AmCharts.makeChart("map-div", dataObj);
        console.log(map.dataProvider.areas[49])
    })
}

//should the map make the ajax call????????????????

//area has to be pushed objects like so:
//    {
//      "id": "US-AL",
//      "value": 4447100
//    }

//db has been modified to include US- in state
//make call for country-wide average and push the id value pairs
//probably have to ignore US-DC
