//its possible to overlay google maps.. i might want to do that eventually, or find a way to add city markers at least


const updateMap = (map, state, id) =>

    $.get("/api/cost/" + state + "/" + id).then(function (data) {
        data.forEach(function (e) {
            let latitude = parseFloat(e.Provider.latitude);
            let longitude = parseFloat(e.Provider.longitude);
            let price = "$" + e.hospitalCharges;
            let hospital = e.Provider.providerName + "\n" + e.Provider.address_old
            map.dataProvider.images.push({
                "imageURL": "assets/img/hospital-icon.png",
                "height": 30,
                "width": 30,
                "rollOverScale": 2,
                "latitude": latitude,
                "longitude": longitude,
                "balloonText": `<h5> ${hospital} </h><br><p>Cost: ${price}</p>`
            })
        });


        //there's probably a more elegant way to do this, but for now it works.
        //timer is to make sure the map is done zooming before it updates
        setTimeout(function () {

            //set zoom to current location to mantain zoom after update
            map.dataProvider.zoomLevel = map.zoomLevel();
            map.dataProvider.zoomLatitude = map.dataProvider.zoomLatitudeC = map.zoomLatitude();
            map.dataProvider.zoomLongitude = map.dataProvider.zoomLongitudeC = map.zoomLongitude();

            map.validateData();

        }, 750)
    });


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
                    let title = event.mapObject.enTitle
                    $("#down-btn").show();
                    $("#up-btn").show();
                    $("#region-header").empty().prepend(`<h2>${title}<small> Min and Max Cost by Region</small></h2>`).show();
                    updateMap(map, state, id);
                    updateLineChart(state, id);
                }
            }, {
                "event": "homeButtonClicked",
                "method": function () {
                    $("#region-div").hide();
                    $("#down-btn").hide();
                    $("#up-btn").hide();
                    $("#region-header").hide();
                    $('html,body').animate({
                        scrollTop: $(".button-wrapper").offset().top
                    }, 800);
                    //zoom needs to be reset to defaults first
                    map.dataProvider.zoomLevel = 1;
                    map.dataProvider.zoomLatitudeC = 37.43716;
                    map.dataProvider.zoomLongitudeC = -92.4785;
                    map.dataProvider.images = [];
                    map.validateData();
                }
            }]
        });
        data.forEach(function (e) {
            let areaObj = {
                "id": e.state,
                "value": e.averageCost,
                "balloonText": `<h5>[[title]]</h><br><p>Avg. Cost: $[[value]]</p>`

            };
            map.dataProvider.areas.push(areaObj)
        });

        map.validateData();
    });
