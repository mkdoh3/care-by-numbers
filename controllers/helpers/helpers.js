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


    costMinMax: queryResults => {
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

    //would love to know a better way of doing this.. this seems a little much but was the only way I could think of
    //results return in json format, but it was easiest to filter through as an object and then build the new data back into json format for easier looping in the chart drawing function..
    regionMinMax: queryResults => {
        console.log(queryResults[0].Provider)
        let results = [];
        let minMaxData = {};
        queryResults.forEach(function (e) {
            let region = e.Provider.region.slice(5);
            let cost = parseFloat(e.hospitalCharges);
            let name = e.Provider.providerName
            if (region in minMaxData) {
                if (minMaxData[region].min > cost) {
                    minMaxData[region].min = cost;
                    minMaxData[region].minProvider = name;
                } else if (minMaxData[region].max < cost) {
                    minMaxData[region].max = cost
                    minMaxData[region].maxProvider = name;

                }
            } else {
                minMaxData[region] = {
                    min: cost,
                    minProvider: name,
                    max: cost,
                    maxProvider: name
                }
            }

        });
        for (const region in minMaxData) {
            results.push({
                region: region,
                min: minMaxData[region].min,
                minProvider: minMaxData[region].minProvider,
                max: minMaxData[region].max,
                maxProvider: minMaxData[region].maxProvider

            })
        }
        return results;
    }
}
