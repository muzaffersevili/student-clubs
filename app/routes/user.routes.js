const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/student",
        [authJwt.verifyToken,authJwt.isStudent],
        controller.studentBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/test/chairperson",
        [authJwt.verifyToken, authJwt.isChairPerson],
        controller.chairPersonBoard
    );

    app.get(
        "/api/test/counselor",
        [authJwt.verifyToken, authJwt.isCounselor],
        controller.counselorBoard
    );
};
