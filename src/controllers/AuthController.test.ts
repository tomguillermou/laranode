import { interfaceDeclaration } from "@babel/types";
const bcrypt = require("bcrypt");

import { Request, Response, request } from "express";

import * as AuthController from "./AuthController";
import User from "../models/User";

const mockRequest = (_body: object = {}): Request => {
  const req: any = {
    body: _body
  };
  return req;
};

const mockResponse = (): Response => {
  const res: any = {
    status: jest.fn().mockReturnValue({}),
    json: jest.fn().mockReturnValue({})
  };
  return res;
};

describe("[AuthController]", () => {
  beforeEach(async () => {
    try {
      const user = new User({
        email: "aze@aze.fr",
        password: "pass"
      });

      await user.save();
    } catch (error) {
      console.log("error register seed: ", error);
    }
  });

  // afterEach(async () => {
  // try {
  //   await User.deleteOne({ email: "aze@aze.fr" });
  // } catch (error) {
  //   console.log("error del seed: ", error);
  // }
  // });

  describe("login", () => {
    it("Unknowed user, should throw 500", async () => {
      // Arrange
      const account = {
        email: "aze@aze.com",
        password: "guill"
      };

      // Act
      const req = mockRequest(account);
      const res = mockResponse();
      await AuthController.login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("login", () => {
    it("knowed user, should throw 200", async () => {
      // Arrange
      const account = {
        email: "aze@aze.fr",
        password: "pass"
      };

      // Act
      const req = mockRequest(account);
      const res = mockResponse();
      await AuthController.login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
