const db = require("../models");
const helpers = require("./helpers/helpers")


module.exports = app => {



    //all procedures
    app.get('/api/procedures', (req, res) => {
        db.Procedure.findAll({}).then(result => {
            res.json(result);
        });
    });



    //all procedures by id
    app.get('/api/procedures/:id', (req, res) => {
        db.Procedure.findAll({
            where: {
                procedureId: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    });



    //all cost data
    app.get("/api/costs", (req, res) => {
        db.Cost.findAll({}).then(result => {
            res.json(result);
        });
    });



    //all costs by zip code
    app.get("/api/cost/:zip", (req, res) => {
        db.Cost.findAll({
            order: [['hospitalCharges', 'DESC']],
            include: [{
                model: db.Provider,
                where: {
                    zipCode: req.params.zip
                },
            }],

        }).then(result => {
            res.json(result);
        });
    });


    //all costs by id and state
    app.get("/api/cost/:state/:id", (req, res) => {
        db.Cost.findAll({
            where: {
                ProcedureProcedureId: req.params.id,
            },
            include: [{
                model: db.Provider,
                where: {
                    state: req.params.state
                }
            }],

        }).then(result => {
            res.json(result);
        });
    });



    //    get state wide average cost for a given procedure using the 'stateCostAverage' helper function
    app.get("/api/avg/:id", (req, res) => {
        db.Cost.findAll({
            where: {
                ProcedureProcedureId: req.params.id,
            },
            attributes: ['ProcedureProcedureId', 'hospitalCharges'],
            include: [{
                model: db.Provider,
                attributes: ['state']
                }]
        }).then(result => {
            result = helpers.stateCostAverages(result)
            res.json(result);
        });
    });


    //get country wide min/max costs for a given procedure
    app.get("/api/mm/:id", (req, res) => {
        db.Cost.findAll({
            where: {
                ProcedureProcedureId: req.params.id,
            },
            attributes: ['ProcedureProcedureId', 'hospitalCharges'],
            include: [{
                model: db.Provider,
                attributes: ['state']
            }],
            order: [['hospitalCharges', 'DESC']]
        }).then(result => {
            console.log("stateMax", result[0].Provider.state);
            console.log("max", result[0].hospitalCharges);
            console.log("stateMin", result[result.length - 1].Provider.state)
            console.log("min", result[result.length - 1].hospitalCharges);
            result = helpers.costMinMax(result)
            res.json(result)
        })
    });


    //get state wide min/max for a given procedure
    app.get("/api/mm/:state/:id", (req, res) => {
        db.Cost.findAll({
            where: {
                ProcedureProcedureId: req.params.id,
            },
            attributes: ['ProcedureProcedureId', 'hospitalCharges'],
            include: [{
                model: db.Provider,
                where: {
                    state: req.params.state
                }
            }],
            order: [['hospitalCharges', 'DESC']]
        }).then(result => {
            result = helpers.costMinMax(result)
            res.json(result)
        })
    });



    app.get('/api/patient', (req, res) => {
        db.Patient.findAll({}).then(result => {
            res.json(result);
        });
    });



    app.post('/api/patient', (req, res) => {
        db.Patient.create(req.body).then(dbPatient => {
            res.json(dbPatient);
        });
    });
}
