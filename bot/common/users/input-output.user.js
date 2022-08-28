const { createWriteStream, createReadStream, unlink, stat } = require("fs");
const { join } = require("path");
const { getHTMLTemplate } = require("./get-html-template.user");

exports.generateContent = (users) => {
  let content = "";
  let count = 1;

  const rows = users.map(
    ({ login, username, createdAt }) =>
      `<tr><th>${count++}</th><th>${login}</th><th>${username}</th><th>${createdAt}</th></tr>`
  );

  rows.forEach((row) => content += row + '\n');

  return getHTMLTemplate(content);
};

exports.generateFileName = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  return `users-${random(1000000, 5000000)}.html`;
};

exports.generateFilePath = (fileName) => join(`./storage/${fileName}`);

exports.saveFile = async (HTMLContent, filePath) => {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath, "utf-8");
    stream.write(HTMLContent, "utf-8");
    stream.on("finish", () =>
      stat(filePath, (err) => (err ? reject(err) : resolve()))
    );
    stream.on("error", () => unlink(filePath, () => reject(error)));
    stream.end();
  });
};

exports.sendFile = async (ctx, filename, filePath) => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, "utf-8");
    ctx.replyWithDocument({ source: stream, filename });
    stream.on("error", () => unlink(filePath, () => reject(error)));
    stream.on("close", () =>
      stat(filePath, (err) => (err ? reject(err) : resolve()))
    );
  });
};

exports.deleteFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    unlink(filePath, (err) => {
      if (err) return reject("err");
      resolve();
    });
  });
};
