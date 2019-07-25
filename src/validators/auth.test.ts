import request from "supertest";
import app from "../app";

import errorMessage from "../config/errors/messages.json";

describe("Validators", () => {
  jest.setTimeout(30000);
  describe("Auth", () => {

    describe("Login", () => {

      describe("Sending an invalid email format", () => {
        it("Should return a message invalidEmailFormat with status 500", () => {
          return request(app)
            .post("/auth/login")
            .send({ email: "toto", password: "Totoro13" })
            .expect("Content-Type", /json/)
            .expect(500)
            .expect((res) => {
              res.body.message = errorMessage.invalidEmailFormat;
            });
        });
      });

    });

    describe("Register", () => {

      describe("Sending an invalid email and a valid password", () => {
        it("Should return message invalidEmailFormat with status 500", () => {
          return request(app)
            .post("/auth/register")
            .send({ email: "test.mail.com", password: "Password0" })
            .expect("Content-Type", /json/)
            .expect(500)
            .expect((res) => {
              res.body.message = errorMessage.invalidEmailFormat;
            });
        });
      });

      describe("Sending a valid email and a password with less than 8 characters", () => {
        it("Should return message passwordTooShort with status 500", () => {
          return request(app)
            .post("/auth/register")
            .send({ email: "test@mail.com", password: "Pass0" })
            .expect("Content-Type", /json/)
            .expect(500)
            .expect((res) => {
              res.body.message = errorMessage.passwordTooShort;
            });
        });
      });

      describe("Sending a valid email and a password without digit", () => {
        it("Should return message passwordMissingDigit with status 500", () => {
          return request(app)
            .post("/auth/register")
            .send({ email: "test@mail.com", password: "Password" })
            .expect("Content-Type", /json/)
            .expect(500)
            .expect((res) => {
              res.body.message = errorMessage.passwordMissingDigit;
            });
        });
      });

      describe("Sending a valid email and a password without lowercase letter", () => {
        it("Should return message passwordMissingLowercaseLetter with status 500", () => {
          return request(app)
            .post("/auth/register")
            .send({ email: "test@mail.com", password: "PASSWORD0" })
            .expect("Content-Type", /json/)
            .expect(500)
            .expect((res) => {
              res.body.message = errorMessage.passwordMissingLowercaseLetter;
            });
        });
      });

      describe("Sending a valid email and a password with less than 8 characters", () => {
        it("Should return message passwordMissingUppercaseLetter with status 500", () => {
          return request(app)
            .post("/auth/register")
            .send({ email: "test@mail.com", password: "password0" })
            .expect("Content-Type", /json/)
            .expect(500)
            .expect((res) => {
              res.body.message = errorMessage.passwordMissingUppercaseLetter;
            });
        });
      });

    });

  });

});
