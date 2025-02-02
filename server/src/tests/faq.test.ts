import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../app";
import { translateText } from "../utils/translate";

// Mock database, Redis, and translation utility
vi.mock("../config/db.config");
vi.mock("../config/redis.config");
vi.mock("../utils/translate", () => ({
  translateText: vi.fn().mockResolvedValue("Mocked translation"),
}));

describe("FAQ Module - API Tests", () => {
  
  describe("GET /faq", () => {
    
    it("Should return 400 for an invalid language parameter", async () => {
      const res = await request(app).get("/api/v1/faq?lang=invalidLang");
      expect(res.statusCode).toBe(400);
    });

    it("Should return 200 when no language parameter is provided", async () => {
      const res = await request(app).get("/api/v1/faq");
      expect(res.statusCode).toBe(200);
    });

    it("Should return 200 for a valid language parameter (e.g., 'hi')", async () => {
      const res = await request(app).get("/api/v1/faq?lang=hi");
      expect(res.statusCode).toBe(200);
    });

  });

  describe("GET /faq/:id", () => {

    it("Should return 200 when fetching a specific FAQ by ID", async () => {
      const res = await request(app).get("/api/v1/faq/asdad2323");
      expect(res.statusCode).toBe(200);
    });

  });

  describe("POST /api/v1/faq", () => {
    
    it("Should return 400 when request body is empty", async () => {
      const res = await request(app).post("/api/v1/faq").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("Should return 400 if the 'answer' field is missing", async () => {
      const res = await request(app).post("/api/v1/faq").send({
        question: "Who are you?",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Answer is required");
    });

    it("Should return 400 if the 'question' field is missing", async () => {
      const res = await request(app).post("/api/v1/faq").send({
        answer: "I am a developer",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Question is Required");
    });

    it("Should return 400 if the question exceeds the maximum length", async () => {
      const longQuestion = "A".repeat(501); // Exceeding 500 characters
      const res = await request(app).post("/api/v1/faq").send({
        question: longQuestion,
        answer: "Valid answer",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Question is too long");
    });

    it("Should return 400 if the answer exceeds the maximum length", async () => {
      const longAnswer = "A".repeat(5001); // Exceeding 5000 characters
      const res = await request(app).post("/api/v1/faq").send({
        question: "Valid question",
        answer: longAnswer,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Answer is too long");
    });

    it("Should return 200 when a valid FAQ is submitted", async () => {
      const res = await request(app).post("/api/v1/faq").send({
        question: "What is the capital of India?",
        answer: "New Delhi",
      });

      expect(translateText).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
    });

  });

  describe("DELETE /faq/:id", () => {

    it("Should return 200 when deleting an FAQ by ID", async () => {
      const res = await request(app).delete("/api/v1/faq/asdad2323");
      expect(res.statusCode).toBe(200);
    });

  });

});
