SELECT * FROM users
WHERE firstname = $2
AND id != $1
LIMIT 4 OFFSET $3;