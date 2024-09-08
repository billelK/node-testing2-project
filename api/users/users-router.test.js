const db = require("../../data/db-config")
const request = require("supertest")
const server = require("../server")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=> {
    await db.seed.run()
})

describe("Sanity check", () => {
    test("environment is testing", () => {
        expect(process.env.NODE_ENV).toBe("testing")
    })
})

describe("GET",() => {
    test("[GET] /api/users responds with a 200 OK status code", async() => {
        const result = await request(server).get("/api/users")
        expect(result.status).toBe(200)
    })
    test("[GET] /api/users gets all the users in the DB", async() => {
        const result = await request(server).get("/api/users")
        expect(result.body).toHaveLength(3)
        expect(result.body[0]).toMatchObject({name: "billel"})
        expect(result.body[1]).toMatchObject({name: "khaled"})
        expect(result.body[2]).toMatchObject({name: "ikram"})
    })
})

describe("POST", () => {
    test("[POST] /api/users responds with a 201 OK status code", async () => {
        const lell = {name: "lell"}
        const result = await request(server).post("/api/users").send(lell)
        expect(result.status).toBe(201)
    })
    test("[POST] /api/users responds with the newly created user", async () => {
        const lell = {name: "lell"}
        const result = await request(server).post("/api/users").send(lell)
        expect(result.body).toMatchObject(lell)
    })
})

describe("DELETE", () => {
    test("[DELETE] /api/users responds with a 201 OK status code", async () => {
        const result = await request(server).delete("/api/users/1")
        expect(result.status).toBe(200)
    })
    test("[DELETE] /api/users responds with the deleted user", async () => {
        let result = await request(server).delete("/api/users/1")
        expect(result.body).toMatchObject({name: "billel"})

        let users = await request(server).get("/api/users")
        expect(users.body).toHaveLength(2)

        result = await request(server).delete("/api/users/2")
        expect(result.body).toMatchObject({name: "khaled"})

        users = await request(server).get("/api/users")
        expect(users.body).toHaveLength(1)

        result = await request(server).delete("/api/users/3")
        expect(result.body).toMatchObject({name: "ikram"})

        users = await request(server).get("/api/users")
        expect(users.body).toHaveLength(0)
    })
})