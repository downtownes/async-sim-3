INSERT INTO users
(username, auth_id, firstname, lastname, profilePic)
VALUES ($1, $2, $3, $4, $5) RETURNING *;