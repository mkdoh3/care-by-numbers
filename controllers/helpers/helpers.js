module.exports = {

    stateCostAverages: queryResults => {
        const averages = {};
        let results = []
        //push cost data into state: [costs array] pairs 
        queryResults.forEach(e => {
            let state = e.Provider.state;
            let charge = parseFloat(e.hospitalCharges);
            if (state in averages) {
                averages[state].push(charge);
            } else {
                averages[state] = [];
                averages[state].push(charge);
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
        let stateMax = queryResults[0].Provider.state;
        let max = queryResults[0].hospitalCharges;
        let stateMin = queryResults[queryResults.length - 1].Provider.state
        let min = queryResults[queryResults.length - 1].hospitalCharges;
        let minMax = [{
            state: stateMin,
            min: min
        }, {
            state: stateMax,
            max: max
        }];
        return minMax
    }
};
