import { test } from "node:test";
import assert from "node:assert";
const callTracker = new assert.CallTracker();
process.on("exit", () => callTracker.verify());

import { routes } from "../../src/routes/heroRoute.js";
import { DEFAULT_HEADER } from "../../src/util/util.js";

test("Hero routes - end points test suite", async (t) => {
  await t.test("it should call /heroes:get route", async (e) => {
    const databaseMock = [
      {
        id: "28208513-f304-4567-9ca3-6be926d5fd81",
        name: "Batman",
        age: 50,
        power: "rich",
      },
    ];

    const heroServiceStub = {
      find: async () => databaseMock,
    };
    const endpoints = routes({
      heroService: heroServiceStub,
    });
    const endpoint = "/heroes:get";
    const request = {};
    const response = {
      write: callTracker.calls((item) => {
        const expected = JSON.stringify({
          results: databaseMock,
        });
        assert.strictEqual(
          item,
          expected,
          "write should be called with the correct payload"
        );
      }),
      end: callTracker.calls((item) => {
        assert.strictEqual(
          item,
          undefined,
          "end should be called without params"
        );
      }),
    };
    const route = endpoints[endpoint];
    await route(request, response);
  });
  await t.todo("it should call /heroes:post route");
});
