const { bot } = require("../../connections/token.connection");
const { saveUser } = require("../../common/sequelize/user-model.sequelize");

module.exports = bot.start(async (ctx) => {
  try {
    const { id, username = "anon" } = ctx.chat;

    const result = await saveUser(String(id), username);
    console.log(result);

    return;
  } catch (err) {
    console.log(err);
  }
});
