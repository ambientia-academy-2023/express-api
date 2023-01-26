const db = require('../database');
const bcrypt = require('bcryptjs');

const saltRounds=10;
const user={
  getAll: function(callback) {
    return db.query('select * from user_table', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from user_table where id_user=?', [id], callback);
  },
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hashed_password) {
      return db.query('insert into user_table (username, password) values(?,?)',
      [user.username, hashed_password], callback);
    });
  },
  delete: function(id, callback) {
    return db.query('delete from user_table where id_user=?', [id], callback);
  },
  update: function(id, user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hashed_password) {
      return db.query('update user_table set username=?, password=? where id_user=?',
      [user.username, hashed_password, id], callback);
    });
  },
  checkPassword: function(username, callback) {
    return db.query('SELECT password FROM user_table WHERE username = ?',[username], callback); 
  }

}
          
module.exports = user;