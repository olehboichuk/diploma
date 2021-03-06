const createUser = 'INSERT INTO users (login, password, first_name, last_name) VALUES ($1, $2, $3, $4)';
const find_all_users = 'select id, login, password, first_name, last_name, active from users where active=TRUE';
const find_users = 'select id, login, password, first_name, last_name, active from users order by id';
const find_users_count = 'SELECT COUNT (*) FROM users';
const find_user_with_id = 'select id, login, password, first_name, last_name, active from users where id=$1';
const find_user_with_login = 'select id, login, password, first_name, last_name, active from users where login=$1';
const change_password = 'update users set password = $1 where id = $2';
const change_user = 'update users set first_name = $1, last_name = $2 where id = $5';
const deactivate_by_user_id = 'update users set active=FALSE where users.id=$1';

module.exports = {
  change_user,
  deactivate_by_user_id,
  find_all_users,
  find_users,
  find_users_count,
  find_user_with_id,
  find_user_with_login,
  change_password,
  createUser
}
