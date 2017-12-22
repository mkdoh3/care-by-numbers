function drawMap(id) {

    $.get('/api/avg/' + id).then(function (data) {
        console.log(data)
        let dataObj = {
            "type": "map",
            "theme": "none",
            "colorSteps": 10,
            "dataProvider": {
                "map": "usaLow",
                "areas": [],
                "images": []
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
        console.log(map.dataProvider)

        map.addListener("clickMapObject", function (event) {
            let state = event.mapObject.id;
            updateMap(map, state, id);

        });

    })
};


function updateMap(map, state, id) {
    //state will look something like, US-IL 


    $.get("/api/cost/" + state + "/" + id).then(function (data) {
        console.log("all state cost data", data);
        data.forEach(function (e) {
            let latitude = parseFloat(e.Provider.latitude);
            console.log("lat", latitude)
            let longitude = parseFloat(e.Provider.longitude);
            console.log("long", longitude)
            let label = "$" + e.hospitalCharges;
            let title = e.Provider.providerName + "\n" + e.Provider.address_old
            map.dataProvider.images.push({
                "latitude": latitude,
                "longitude": longitude,
                "label": label,
                "title": title,
                "imgURL": "https://www.amcharts.com/images/weather/weather-rain.png",
                height: 20,
                width: 20,
            })
        });

        setTimeout(function () {

            //this is supposed to maintain zoom after update..
//            map.dataProvider.zoomLevel = map.zoomLevel();
  //            map.dataProvider.zoomLatitude = map.dataProvider.zoomLatitude = map.zoomLatitude();
  //            map.dataProvider.zoomLongitude = map.dataProvider.zoomLongitude = map.zoomLongitude();
  //            console.log(map.dataProvider);
            map.validateData();
            console.log("map", map);
        }, 3000)

    })

    //    console.log("inside update map", map.dataProvider.areas)
    //    console.log("state", state)
    //    console.log(map.dataProvider.areas.id.state)

    //    let areas = map.dataProvider.areas;

    //    for (let i = 0; i < areas.length; i++) {
    //        console.log(areas[i])
    //        if (areas[i].id === state) {
    //            areas[i].value = 0;
    //            break;
    //        }
    //    };







}

//When data is changed, all you need to do is set new data for data set:
//
//dataSet.dataProvider = yourDataArray;
//and then call
//
//stockChart.validateData();

// for updating after zoom..
//map will probs have to be completely updated(prob with a new ajax call) after each zoom in and zoom out.
//for state zoom i should be able to update only the required field.. 
//with the above event listener I should be able to make an ajax call based on the 'id', get the state wide cost data, and then update just that state on the map
//might want to store the previous data somehow? so when you click on an adjacent state or zoom out, just that previous state is redrawn back to showing state wide average
