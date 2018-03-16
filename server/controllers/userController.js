module.exports = {
    getLoggedInUser: (req, res, next) => {
        const db = req.app.get('db');

        db.getLoggedInUser().then(user => {
            res.status(200).send(user);
        })
    },

    updateUserInfo: (req, res, next) => {
        const db = req.app.get('db');

        db.updateUserInfo([req.params.id, req.body.firstName, req.body.lastName, req.body.hairColor, req.body.eyeColor, req.body.gender, req.body.hobby, req.body.birthDay, req.body.birthMonth, req.body.birthYear]).then(updateFirst => {
            res.status(200).send(updateFirst);
        })
    },

    getAllUsers: (req, res, next) => {
        const db = req.app.get('db');

        db.getAllUsers().then(allUsers => {
            allUsers = allUsers.filter(user =>
                // console.log('user', req.session.passport.user);
                user.id !== req.session.passport.user)
                res.status(200).send(allUsers);
        })
    }
}