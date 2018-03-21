module.exports = {
    addFriends: (req, res, next) => {
        const db = req.app.get('db');
        console.log(req.body)

        db.addFriend(req.body.id, req.body.friend_id).then(friends => {
            res.status(200).send(friends);
        })
    },

    getFriendList: (req, res, next) => {
        const db = req.app.get('db');

        db.getFriends().then(friends => {
            console.log('friends', friends)
            if (friends.length === 0) {
                res.status(200).send();
            } else {
                friends.filter(val => {
                    val.match_id === req.session.passport.user
                })
            }
            res.status(200).send(friends);
        })
    }
}