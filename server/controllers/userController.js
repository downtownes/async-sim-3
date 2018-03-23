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
        let userCount;
        db.countPages(userId).then(count => {
            console.log('count', count[0].count)
            userCount = count[0].count;
        })

        db.getPaginatedFriends(userId, req.query.page).then(users => {
            console.log('userCount', users);
            // count = users.length+1;//THIS DOES NOT WORK. THIS WILL ONLY GIVE A MAX OF 5. WE NEED THE COUNT FOR ALL OF THE USERS ON THE DATABASE THAT ARE NOT THE CURRENTLY LOGGED IN USER
            res.status(200).send([users, userCount])
        })
    },

    getFilteredUsers: (req, res, next) => {
        const db = req.app.get('db');
        let userId = req.session.passport.user;

        if (req.query.firstName) {
            db.getByFirstName(userId, req.query.firstName, req.query.page).then(users => {
                res.status(200).send(users);
            })
        } else if(req.query.lastName){
            db.getByLastName(userId, req.query.lastName, req.query.page).then(users => {
                res.status(200).send(users);
            })
        }
    }
}