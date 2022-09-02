const { bot } = require("../../connections/token.connection");
const { saveUser } = require("../../common/sequelize/user-model.sequelize");
const TelegrafI18n = require("telegraf-i18n");
const path = require("path");

const i18n = new TelegrafI18n({
  directory: path.resolve("./bot/locales"),
  useSession: true,
  sessionName: "sessionLanguage",
  allowMissing: false,
  defaultLanguage: "ru",
});

bot.use(i18n);

module.exports = bot.start(async (ctx) => {
  try {
    const { id, username = "anon" } = ctx.chat;

    const result = await saveUser(String(id), username);
    console.log(result);

    // console.log(ctx.i18n)
    // console.log(ctx.i18n.locale())

    const a = ctx.i18n.locale();
    ctx.i18n.locale(a);

    // "ru"

    const myMessage = ctx.i18n.t("start.text");
    await ctx.reply(myMessage);
    
    return;
  } catch (err) {
    console.log(err);
  }
});
