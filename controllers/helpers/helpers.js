module.exports = {

    stateCostAverages: queryResults => {
        const averages = {};
        let results = []
        //push cost data into state: [costs array] pairs 
        queryResults.forEach(e => {
            let state = e.Provider.state;
            let cost = parseFloat(e.hospitalCharges);
            if (state in averages) {
                averages[state].push(cost);
            } else {
                averages[state] = [];
                averages[state].push(cost);
            }
        });
        //reduce and average all costs of the [costs array]
        for (const state in averages) {
            let costs = averages[state];
            let average = costs.reduce((a, b) => a + b, 0) / costs.length;
            average = average.toFixed(2);
            averages[state] = average;
            //build json formatted obj with state, average, and procedure id data. Push into results
            results.push({
                state: state,
                averageCost: average,
                procId: queryResults[0].ProcedureProcedureId
            });
        };
        //sort results from greatest to least average for ranked list
        results.sort((obj1, obj2) => obj2["averageCost"] - obj1["averageCost"])
        return results;
    },


    countryMinMax: queryResults => {
        let stateMax = queryResults[0].Provider.state_old;
        let max = queryResults[0].hospitalCharges;
        let stateMin = queryResults[queryResults.length - 1].Provider.state_old
        let min = queryResults[queryResults.length - 1].hospitalCharges;
        let minMax = [{
            state: stateMin,
            min: min
        }, {
            state: stateMax,
            max: max
        }];
        return minMax
    },
    zipCodeMinMax: queryResults => {
        let results = [];
        let minMaxData = {};
        queryResults.forEach(function (e) {
            let region = e.Provider.region.slice(5);
            let cost = parseFloat(e.hospitalCharges);
            //if results doesnt have the zip code yet..


            if (region in minMaxData) {
                if (minMaxData[region].min > cost) {
                    minMaxData[region].min = cost;
                } else if (minMaxData[region].max < cost) {
                    minMaxData[region].max = cost
                }
            } else {
                minMaxData[region] = {
                    min: cost,
                    max: cost
                }
            }
            //
            //
            //
            //
            //            if (results.indexOf(region) === -1) {
            //                minMaxData.region = region;
            //                minMaxData.min = cost;
            //                minMaxData.max = cost;
            //
            //                results.push(minMaxData)
            //
            //            } else if (results[region].min > cost) {
            //                results[region].min = cost;
            //            } else if (results[zip].max < cost) {
            //                results[region].max = cost;
            //            }
        })
        for (const key in minMaxData) {
            console.log(minMaxData[key])
            results.push({
                [key]: minMaxData[key]
            })
        }
        console.log(results[0])
        return results;
    }
}

//d733bw
//


// should look something like this
//results = [{
//    60643 : {
//      min: min,
//      max: max
//},
//}]
