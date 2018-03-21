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
    },

    getPaginatedUsers: (req, res, next) => {
        const db = req.app.get('db');
        let userId = req.session.passport.user;
        let count = 0;

        db.getPaginatedFriends(userId, req.query.page).then(users => {
            console.log(users);
            count = users.length+1;//THIS DOES NOT WORK. THIS WILL ONLY GIVE A MAX OF 5. WE NEED THE COUNT FOR ALL OF THE USERS ON THE DATABASE THAT ARE NOT THE CURRENTLY LOGGED IN USER
            res.status(200).send([users, count])
        })
    }
}