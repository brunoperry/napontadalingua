import test from "node:test";
import assert from "node:assert";
import util from "util";

test("Hero integration test suite", async (t) => {
  const testPort = 9009;
  process.env.PORT = testPort;
  const { server } = await import("../../src/index.js");

  const testServerAdress = `http://localhost:${testPort}/heroes`;

  await t.test("it should create an hero", async (t) => {
    const data = {
      name: "Batman",
      age: 50,
      power: "rich",
    };

    const req = await fetch(testServerAdress, {
      method: "POST",
      body: JSON.stringify(data),
    });

    assert.deepStrictEqual(req.headers.get("content-type"), "application/json");
    assert.strictEqual(req.status, 201);
    const res = await req.json();
    assert.deepStrictEqual(
      res.success,
      "User created successfully!",
      "It should return a valid text message"
    );
    assert.ok(res.id.length > 30, "id should be a valid uuid");
  });

  await util.promisify(server.close.bind(server))();
});
