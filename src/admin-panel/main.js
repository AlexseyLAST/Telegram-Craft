const http = require("http");
const PORT = 8080;

const html = "<h1>Hello</h1>";

const { getUsers } = require("../../bot/common/sequelize/user-model.sequelize");
const { generateContent } = require("../../bot/common/users/input-output.user");

http
  .createServer(async (req, res) => {
    // Get content
    const users = await getUsers();
    const content = generateContent(users);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  })
  .listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

