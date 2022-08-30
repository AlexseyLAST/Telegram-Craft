const { bot } = require("../../connections/token.connection");
const { CronJob } = require("cron");
const {
  getUsersByDelivered,
} = require("../../common/sequelize/user-model.sequelize");

module.exports = bot.on("message", async (ctx) => {
  try {
    const users = await getUsersByDelivered();
    const userIds = users.map(({ login }) => login);

    const send = [];
    const job = new CronJob({
      cronTime: "*/1 * * * * *",
      onTick: () => {
        ctx.telegram.sendMessage(userIds[0], "Hello");
        send.push(userIds[0]);
        if (send.length) {
          job.stop();
        }
      },
      onComplete: () => ctx.reply("Рассылка завершена!"),
      startNow: true,
    });
  } catch (err) {
    console.log(err);
  }
});

//  * * * * * *
//  ┬ ┬ ┬ ┬ ┬ ┬
//  │ │ │ │ │ │
//  │ │ │ │ │ └ День недели (0 - 7) (0 или 7 - это воскресенье)
//  │ │ │ │ └───── Месяц (1 - 12)
//  │ │ │ └────────── День месяца (1 - 31)
//  │ │ └─────────────── Часы (0 - 23)
//  │ └──────────────────── Минуты (0 - 59)
//  └───────────────────────── Секунды (0 - 59, ОПЦИОНАЛЬНО)

// "*/1 * * * *" - функция будет выполняться каждую минуту
// "28 * * * *" - функция будет выполняться в 23 минуты каждого часа
