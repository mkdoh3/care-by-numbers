const db = require("../models");


module.exports = app => {
    app.get("/", (req, res) => {
        db.Procedure.findAll({}).then(result => {
            let hbsObject = {
                names: result
            };
            res.render("index", hbsObject)
        })
    });

    app.get("/patient", (req, res) => {
        res.render("patientData");
    });

};
