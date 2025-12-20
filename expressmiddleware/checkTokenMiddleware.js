let myToken = "12344";
let checkToken = (req, res, next) => {
    if (req.query.token === "" || req.query.token === undefined) {
        return res.send({
            msg: "please fill the token"
        });
    }

    if (req.query.token !== myToken) {
        return res.send({
            msg: "please fill the correct Token"
        });
    }
    next();
};

module.exports = {checkToken};