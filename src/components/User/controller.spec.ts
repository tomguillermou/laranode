import request from "supertest";
import assert from "assert";

import app from "../../app";
import errorMessage from "../../config/errors/messages.json";

let token: string = "null";

describe("User controller", () => {

  before(function (done) {
    this.enableTimeouts(false);
    request(app)
      .post("/auth/login")
      .send({ email: "tester@jest.com", password: "Passw0rd" })
      .expect(200)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("GET /users", () => {

    it("fails if missing authorization header", (done) => {
      request(app)
        .get("/users")
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.missingAuthorizationHeader);
          done();
        });
    });
  });

  describe("GET /users/:username", () => {

    it("fails if missing authorization header", (done) => {
      request(app)
        .get("/users/tester")
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.missingAuthorizationHeader);
          done();
        });
    });

    it("fails if username does not belong to a user", (done) => {
      request(app)
        .get("/users/random-user-that-does-not-exist")
        .set("authorization", "Bearer " + token)
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.userDoesNotExist);
          done();
        });
    });
  });

  describe("PATCH /users/:username", () => {

    it("fails if missing authorization header", (done) => {
      request(app)
        .patch("/users/tester")
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.missingAuthorizationHeader);
          done();
        });
    });

    it("fails if username does not belong to a user", (done) => {
      request(app)
        .patch("/users/random-user-that-does-not-exist")
        .set("authorization", "Bearer " + token)
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.userDoesNotExist);
          done();
        });
    });
  });

  describe("DELETE /users/:username", () => {

    it("fails if missing authorization header", (done) => {
      request(app)
        .delete("/users/tester")
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.missingAuthorizationHeader);
          done();
        });
    });

    it("fails if username does not belong to a user", (done) => {
      request(app)
        .delete("/users/random-user-that-does-not-exist")
        .set("authorization", "Bearer " + token)
        .expect(500)
        .end((err, res) => {
          assert.strictEqual(res.body.message, errorMessage.userDoesNotExist);
          done();
        });
    });
  });

});
