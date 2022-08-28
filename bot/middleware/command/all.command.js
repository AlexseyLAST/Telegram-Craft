const {
  generateContent,
  generateFileName,
  generateFilePath,
  saveFile,
  sendFile,
  deleteFile,
} = require("../../common/users/input-output.user");
const { getUsers } = require("../../common/sequelize/user-model.sequelize");
const { bot } = require("../../connections/token.connection");

module.exports = bot.command("all", async (ctx) => {
  try {
    // Get content
    const users = await getUsers();
    const content = generateContent(users);

    // Send file
    const fileName = generateFileName();
    const filePath = generateFilePath();

    await saveFile(content, filePath);
    await sendFile(ctx, fileName, filePath);
    await deleteFile(filePath);

    return;
  } catch (err) {
    console.log(err);
  }
});
