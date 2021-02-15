const sql = require("./sequelize");

const buildAndAddUser = async function () {
  const user = sql.User.build({
    firstName: "Caine",
    lastName: "Nielsen",
    email: "caine.nielsen@caineandrebekah.com",
  }).catch((err) => {
    return `Error creating user account`, err;
  });
  console.log(user.toJSON());

  console.log(user.firstName);

  user.firstName = "Caine";

  console.log(user.firstName);

  await user.save();

  return `User account ${user.email} has been created!`;
};

const createUser = async function (userData) {
  console.log(userData);
  const user = await sql.User.create(
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    },
    { fields: ["firstName", "lastName", "email", "uid", "status"] }
  )
    .then((user) => {
      console.log(user.toJSON());

      return `User account ${user.email} | ${user.id} has been created!`;
    })
    .catch((err) => {
      return `Error creating user account`, err;
    });
    return {status: 'success', message: 'User Created Successfully', user};
};

const updateUser = async function (userData) {
  console.log(userData);
  const user = await sql.User.findAll({
    where: {
      id: userData.id,
    },
  });
  user[0].firstName = userData.firstName;
  user[0].lastName = userData.lastName;
  user[0].email = userData.email;
  await user[0].save();
  return {status: 'success', message: 'User Updated Successfully', user};
};

const listUsers = async function () {
  const users = await sql.User.findAll();
  //   console.log(users.every((user) => user instanceof sql.User));
  console.log("All users:", JSON.stringify(users, null, 3));
  return users;
};

const getUser = async function (id) {
  const user = await sql.User.findAll({
    where: {
      id: id,
    },
  });
  console.log("Selected User:", JSON.stringify(user, null, 3));
  return user[0];
};

const deleteUser = async function (id) {
  const user = await sql.User.findAll({
    where: {
      id: id,
    },
  });
  await user[0].destroy();
  console.log("Deleted User:", JSON.stringify(user, null, 3));
  return {status: 'success', message: 'User Deleted Successfully', user};
};

module.exports = {
  buildAndAddUser,
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
