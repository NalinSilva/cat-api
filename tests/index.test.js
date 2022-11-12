const index = require("../index.js");
// const jest = require("jest");
describe("Index", () => {
  //   it("should retutn status code 200", () => {
  //     const result = index.make_request("You");
  //     expect(result.statusCode).toBe(200);
  //   });
  jest.setTimeout(120000);

  test("should retutn true", async () => {
    await expect(index.use_cat_service("Hello", "You")).resolves.toBe(true);

    // const result = await index.use_cat_service("Hello", "You");
    // expect(result).toBe(true);
  });
});
