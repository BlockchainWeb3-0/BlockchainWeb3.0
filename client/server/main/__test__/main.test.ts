import { app } from "../main";
import request from "supertest";

describe("Test the httpServer", () => {
    test("[GET] / should response welcome!", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});

afterAll(() => {
    setTimeout(() => {
        process.exit();
    }, 1000);
});
