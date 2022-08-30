const { bot } = require("../../connections/token.connection");
const { CronJob } = require("cron");

module.exports = bot.on("message", async (ctx) => {
  try {
    const date = new Date(2022, 7, 29, 21, 39);
    const job = new CronJob({
        cronTime: date,
        onTick: () => ctx.reply("You will see this message every second"),
        onComplete: () => console.log("Complete!"),
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
