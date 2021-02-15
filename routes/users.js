const express = require("express");
const router = express.Router();

const crud = require("../crud");

router.get('/', function(req, res, next) {
  res.render('users', { title: 'Demo For Cameron | Pura', pageName: 'Users' });
});

router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Demo For Cameron | Pura', pageName: 'User' });
});

router.get('/create-user', function(req, res, next) {
  res.render('create-user', { title: 'Demo For Cameron | Pura', pageName: 'Create User' });
});

router.get('/update-user', function(req, res, next) {
  res.render('update-user', { title: 'Demo For Cameron | Pura', pageName: 'Update User' });
});

router.get("/list-users", async function (req, res, next) {
  const users = await crud.listUsers();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users, null, 3));
});

router.post("/get-user", async function (req, res, next) {
  console.log(req.body);
  const user = await crud.getUser(req.body.id);
  res.end(JSON.stringify(user, null, 3));
});

router.post("/create-user", async function (req, res, next) {
  console.log(req.body);
  await crud.createUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  res.redirect('/users');
});

router.post("/update-user", async function (req, res, next) {
  console.log(req.body);
  await crud.updateUser({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  res.redirect('/users');
});

router.post("/delete-user", async function (req, res, next) {
  console.log(req.body);
  const user = await crud.deleteUser(req.body.id);
  res.end(JSON.stringify(user, null, 3));
});

module.exports = router;
