const db = require("../../connections/db.connection");
const UserModel = require("../../models/user.model");

exports.saveUser = async (login, username) => {
  await db.sync();

  const textAfterSaving = `User ${login}-${username} is saved!`;
  const textAfterUpdate = `User ${login}-${username} has been updated!`;

  const foundUser = await UserModel.findOne({ where: { login } });

  if (!foundUser) {
    await UserModel.create({ login, username });
    return textAfterSaving;
  }

  if (foundUser.username !== username) {
    await UserModel.update({ username }, { where: { login } });
  }

  return textAfterUpdate;
};

exports.getUsers = async () => UserModel.findAll({ raw: true });

exports.getUsersByDelivered = async (value = false) =>
  UserModel.findAll({
    raw: true,
    attributes: {
      exclude: [
        "id",
        "username",
        "privileged",
        "delivered",
        "dead",
        "createdAt",
      ],
    },
    where: {
      delivered: value,
    },
  });

exports.updateUserByDelivered = async (login) =>
  UserModel.update({ delivered: true }, { where: { login} });

exports.updateUserByDead = async (login) =>
  UserModel.update({ dead: true }, { where: { login } });
