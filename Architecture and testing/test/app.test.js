const { chromium } = require("playwright-chromium");

const { expect, assert } = require("chai");
const { it, describe } = require("mocha");

let browser, page; // Declare reusable variables

function fakeResponse(data) {
  return {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

let data = {
  1: {
    author: "Pesho",
    content: "Qshala",
  },
};

let creatData = {
  author: "Ivan",
  content: "Shta otkradna",
};

describe("E2E tests", function () {
  before(async () => {
    browser = await chromium.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });
  describe("refresh button", () => {
    it("should return correct data", async () => {
      await page.route("**/jsonstore/messenger", (route) =>
        route.fulfill(fakeResponse(data))
      );

      await page.goto("http://127.0.0.1:5500/index.html");

      const [response] = await Promise.all([
        page.waitForResponse("**/jsonstore/messenger"),
        page.click("#refresh"),
      ]);

      let result = await response.json();
      console.log(22);
      expect(result).to.eql(data);
    });

    it("should return correct information about textArea", async () => {
      await page.route("**/jsonstore/messenger", (route) =>
        route.fulfill(fakeResponse(data))
      );

      await page.goto("http://127.0.0.1:5500/index.html");

      const [response] = await Promise.all([
        page.waitForResponse("**/jsonstore/messenger"),
        page.click("#refresh"),
      ]);
      let textArea = await page.$eval("#messages", (text) => text.value);

      let result = await response.json();
      let expectedResult = `Pesho: Qshala`;
      console.log(22);
      expect(expectedResult).to.eql(textArea);
    });

    describe("test create button if it sends correct data", () => {
      it("Create button should return correct data ", async () => {
        let requestData = undefined;
        let expected = {
          author: "Ivan",
          content: "Shta otkradna",
        };
        await page.route("**/jsonstore/messenger", (route, request) => {
          if (request.method().toLowerCase() === "post") {
            requestData = request.postData();
            route.fulfill(fakeResponse(creatData));
          }
        });

        await page.goto("http://127.0.0.1:5500/index.html");
        await page.fill("#author", expected.author);
        await page.fill("#content", expected.content);

        const [response] = await Promise.all([
          page.waitForResponse("**/jsonstore/messenger"),
          page.click("#submit"),
        ]);

        let result = await response.json();

        let dataResult = JSON.parse(requestData);
        expect(expected).to.eql(dataResult);
      });

      it("After create buton is clicked, the forms must clear them selfes", async () => {
        let requestData = undefined;
        let expected = {
          author: "Ivan",
          content: "Shta otkradna",
        };
        await page.route("**/jsonstore/messenger", (route, request) => {
          if (request.method().toLowerCase() === "post") {
            requestData = request.postData();
            route.fulfill(fakeResponse(creatData));
          }
        });

        await page.goto("http://127.0.0.1:5500/index.html");
        await page.fill("#author", expected.author);
        await page.fill("#content", expected.content);

        const [response] = await Promise.all([
          page.waitForResponse("**/jsonstore/messenger"),
          page.click("#submit"),
        ]);

        let afterSubmitAuthor = await page.$eval(
          "#author",
          (element) => element.textContent
        );
        let afterSumbitContent = await page.$eval(
          "#submit",
          (element) => element.textContent
        );

        let result = await response.json();

        let dataResult = JSON.parse(requestData);
        assert.equal("", afterSubmitAuthor);
        assert.equal("", afterSumbitContent);
      });
    });
  });
});
