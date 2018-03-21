select * from users
WHERE id != $1
limit 4 offset $2;