module.exports = {
    getLoggedInUser: (req, res, next) => {
        db = req.app.get('db');

        db.getLoggedInUser().then(user => {
            res.status(200).send(user);
        })
    }
}