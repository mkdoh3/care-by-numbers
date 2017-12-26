const updateMap = (map, state, id) =>

    $.get("/api/cost/" + state + "/" + id).then(function (data) {
        console.log("all state cost data", data);
        data.forEach(function (e) {
            let latitude = parseFloat(e.Provider.latitude);
            let longitude = parseFloat(e.Provider.longitude);
            let price = "$" + e.hospitalCharges;
            let hospital = e.Provider.providerName + "\n" + e.Provider.address_old
            map.dataProvider.images.push({
                "imageURL": "assets/img/hospital-icon.png",
                "height": 15,
                "width": 15,
                "rollOverScale": 2,
                "latitude": latitude,
                "longitude": longitude,
                "balloonText": `<h5> ${hospital} </h><br><p>Cost: ${price}</p>`
            })
        });


        //there's probably a more elegant way to do this, but for now it works.
        //this is just to make sure the map is done zooming before it updates
        setTimeout(function () {
            map.dataProvider.zoomLevel = map.zoomLevel();
            map.dataProvider.zoomLatitude = map.dataProvider.zoomLatitudeC = map.zoomLatitude();
            map.dataProvider.zoomLongitude = map.dataProvider.zoomLongitudeC = map.zoomLongitude();

            map.validateData();

        }, 750)

        console.log("map", map);
    })


const drawMap = id =>

    $.get('/api/avg/' + id).then(function (data) {
        const map = AmCharts.makeChart("map-div", {
            "type": "map",
            "theme": "none",
            "colorSteps": 10,
            mouseWheelZoomEnabled: true,
            "dataProvider": {
                "map": "usa2Low",
                "areas": [],
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
            },
            "listeners": [{
                "event": "clickMapObject",
                "method": function (event) {
                    let state = event.mapObject.id;
                    updateMap(map, state, id);
                }
            }]
        });
        data.forEach(function (e) {
            let areaObj = {
                "id": e.state,
                "value": e.averageCost
            };
            map.dataProvider.areas.push(areaObj)
        });
        map.validateData();
    });









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
