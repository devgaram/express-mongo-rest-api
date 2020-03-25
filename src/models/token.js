export default (Schema) => {
  const Token = new Schema({
    userid: String,
    refreshToken: String,
  });
  return Token;
};
