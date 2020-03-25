export default (Schema) => {
  const Auth = new Schema({
    userid: String,
    password: String,
    salt: String,
  });
  Auth.query.byUserId = function byUserId(userid) {
    return this.where({ userid });
  };
  Auth.query.byUser = function byUser({ userid, password }) {
    return this.where({ userid, password });
  };
  return Auth;
};
