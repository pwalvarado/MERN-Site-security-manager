const test = require("tape");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");

test("GET /", function(assert) {
  request(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .end(function(err, res) {
      const expectedThings = {};
      const actualThings = res.body;
      console.log("actualThings     ", actualThings);

      assert.error(err, "No error");
      assert.same(actualThings, expectedThings, "Retrieve list of things");
      assert.end();
    });
});

test("POST /api/auth, authentication fails without params credentials", function(assert) {
  request(app)
    .post("/api/auth")
    .expect(400)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.end();
    });
});

test("POST /api/users, register user fails without credentials", function(assert) {
  request(app)
    .post("/api/auth")
    .expect(400)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.end();
    });
});

test("POST /api/users, register same user twice fails", function(assert) {
  const newUser = {
    name: "Jhon Doe",
    email: "test@exampl.com",
    password: "123456"
  };
  const userExists = {
    errors: [{ msg: "User already exists" }]
  };
  request(app)
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /json/)
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.same(res.body, userExists, "Create a new user");
      assert.end();
    });
});

test("POST /api/users, register new user, fails with short password", function(assert) {
  const newUser = {
    name: "Jhon Doe",
    email: "test@exampl.com",
    password: "12345"
  };
  const expect = {
    errors: [
      {
        value: "12345",
        msg: "Please enter a password with 6 or more characters",
        param: "password",
        location: "body"
      }
    ]
  };
  request(app)
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /json/)
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.same(res.body, expect, "Create a new user");
      assert.end();
    });
});

test("POST /api/users, register new user, fails without email", function(assert) {
  const newUser = {
    name: "Jhon Doe",
    password: "123456"
  };
  const expect = {
    errors: [
      {
        msg: "Please include a valid email",
        param: "email",
        location: "body"
      }
    ]
  };
  request(app)
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /json/)
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.same(res.body, expect, "Create a new user");
      assert.end();
    });
});

test("POST /api/users, register new user, fails without name", function(assert) {
  const newUser = {
    name: "",
    email: "test@exampl.com",
    password: "123456"
  };
  const expect = {
    errors: [
      { value: "", msg: "Name is required", param: "name", location: "body" }
    ]
  };
  request(app)
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /json/)
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.same(res.body, expect, "Create a new user");
      assert.end();
    });
});

test("POST /api/users, register new user, happy path", function(assert) {
  const uniqueName = (Math.random() * 1e18).toString(36);
  const newUser = {
    name: uniqueName,
    email: `${uniqueName}@exampl.com`,
    password: "123456"
  };
  request(app)
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /json/)
    .end(function(err, res) {
      assert.error(err, "No error");
      assert.end();
    });
});

test("Finish, close DB", function(t) {
  mongoose.disconnect();
  t.pass("closing db connection");
  t.end();
});
