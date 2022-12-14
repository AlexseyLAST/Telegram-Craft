const { bot } = require("../../connections/token.connection");
const { CronJob } = require("cron");
const {
  getUsersByDelivered,
  updateUserByDelivered,
  updateUserByDead,
} = require("../../common/sequelize/user-model.sequelize");

module.exports = bot.on("message", async (ctx) => {
  try {
    // const users = await getUsersByDelivered();
    // const userIds = users.map(({ login }) => login);
    const userIds = [
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      "567890987",
      '968541891',
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
      // "123456789",
      // "234567898",
      // "345678987",
      // "456789098",
      // "567890987",
      // "678908876",
      // "546457547",
      // "345346346",
      // "634634636",
      // "234315253",
    ];

    // 1 секунду = 20 сообщений
    // limit: 1 секунду не более 30 сообщений
    // 20 * 60 секунд = 1200 сообщений
    // 2 минуты = сон
    // 3 минуты = 1200 сообщений
    // 5 к 10 || 1 к 2

    count = 0;

    // 2 минуты отдых, 1 минута рассылка
    const job = new CronJob({
      cronTime: "*/3 * * * *",
      onTick: async () => {
        if (!userIds.length) {
          job.stop();
          return;
        }

        // Целую минуту по 20 записей в секунду
        const shortJob = new CronJob({
          cronTime: "*/1 * * * * *",
          onTick: async () => {
            const rangeUserIds = userIds.splice(0, 20);
            count++;

            for await (userId of rangeUserIds) {
              try {
                await ctx.telegram.sendMessage(userId, "my_text");
                console.log(userId);
                await updateUserByDelivered(userId);
              } catch (err) {
                console.log(`Cообщение не отправлено – ${userId}`);
                await updateUserByDead(userId);
              }
            }

            if (count === 60 || !userIds.length) {
              shortJob.stop();
              count = 0;
              return;
            }
          },
          onComplete: async () =>
            await ctx.replyWithHTML("<b>Итерация завершена!</b>"),
          startNow: true,
        });
      },
      onComplete: async () =>
        await ctx.replyWithHTML("<b>Рассылка завершена!</b>"),
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
