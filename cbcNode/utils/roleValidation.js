const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const { secretOrKey } = require("../../config/keys");

function auth(req, res, next, test) {
    let jwtPayload = req.header("Authorization");
    if (!jwtPayload) return res.status(400).send("Unauthorized");
    jwtPayload = jwtPayload.slice(7);
    jwt.verify(jwtPayload, secretOrKey, (err, decoded) => {
        if (err) return res.status(400).send("Unauthorized");
        User.findById(decoded.id)
            .then((user) => {
                if (user) {
                    if (user.isVerified && test(user.type)) {
                        return next();
                    } else {
                        return res.status(400).send("Unverified")
                    }
                }
                return res.status(400).send("Unauthorized");
            })
            .catch((e) => {
                console.log(e.message);
                res.status(500).send("Something went wrong");
            });
    });
}

function isAuthorizedAdmin(req, res, next) {
    return auth(req, res, next, /^a/i.test)
}

function isAuthorizedCommuter(req, res, next) {
    return auth(req, res, next, /^c/i.test)
}
module.exports = {
    isAuthorizedAdmin,
    isAuthorizedCommuter
}