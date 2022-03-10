const { chromium } = require("playwright-chromium");

const { expect, assert } = require("chai");
const { it, describe } = require("mocha");

let browser, page;

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
let fakebooks = {
  1: {
    title: "Harry Potter",
    author: "JK Rowling",
  },
  2: {
    title: "C# fundametals",
    author: "Svetlin Nakov",
  },
};

let emptyBook = {
  title: "",
  author: "",
};

describe("Book library", () => {
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

  describe("load books functionality", () => {
    // it("Should show all movies correctly", async () => {
    //   await page.route("**/jsonstore/collections/books", (route) =>
    //     route.fulfill(fakeResponse(fakebooks))
    //   );

    //   await page.goto("http://127.0.0.1:5501/index.html");

    //   const [response] = await Promise.all([
    //     page.waitForResponse("**/jsonstore/collections/books"),
    //     page.click("#loadBooks"),
    //   ]);

    //   let result = await response.json();

    //   expect(result).to.eql(fakebooks);
    // });

    it("Should trow an error if empty book is sent", async () => {
      await page.route("**/jsonstore/collections/books", (route, request) => {
        if (request.method().toLowerCase() === "post") {
          route.fulfill(fakeResponse(emptyBook));
        }
      });

      await page.goto("http://127.0.0.1:5501/index.html");

      let formData = await page.$eval(
        "#createForm",
        (Element) => new FormData(Element)
      );
      let message = undefined;
      let expectedMesage = "All fields are required!";
      page.once("dialog", (dialog) => {
        message = `${dialog.message()}`;
        dialog.dismiss().catch(() => {});
      });
      await page.locator("text=Submit").click();

      expect(message).to.eql(expectedMesage);
    });

    it("Should create and return correct data", async () => {
      await page.route("**/jsonstore/collections/books", (route, request) => {
        if (request.method().toLowerCase() === "post") {
          route.fulfill(fakeResponse(fakebooks[1]));
        }
      });

      await page.goto("http://127.0.0.1:5501/index.html");

      await page
        .locator(
          'text=FORM TITLE AUTHOR Submit >> [placeholder="Title\\.\\.\\."]'
        )
        .fill("Harry Potter");
      await page
        .locator(
          'text=FORM TITLE AUTHOR Submit >> [placeholder="Author\\.\\.\\."]'
        )
        .fill("JK Rowling");

      const [response] = await Promise.all([
        page.waitForResponse("**/jsonstore/collections/books"),
        page.locator("text=Submit").click(),
      ]);

      let result = await response.json();

      expect(result).to.eql(fakebooks[1]);
    });
  });
});
