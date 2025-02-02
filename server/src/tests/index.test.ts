import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("Express App - Health Check Endpoint", () => {
  
  it("Should return 200 for the health check route", async () => {
    const res = await request(app).get("/healthcheck");
    expect(res.statusCode).toBe(200);
  });

});
