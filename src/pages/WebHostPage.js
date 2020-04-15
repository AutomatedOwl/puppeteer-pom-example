export class WebHostPage {
  constructor(page) {
    this.page = page;
    this.TEXT_BOX = "//*[@class = 'form-control'][1]";
  }

  open() {
    return this.page.goto("https://testjs2.000webhostapp.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  getTitle() {
    return this.page.title();
  }

  async typeToBox(inputText) {
    await this.page.waitForXPath(this.TEXT_BOX);
    let textBoxElement = await this.page.$x(this.TEXT_BOX);
    await textBoxElement[0].type(inputText, { delay: 100 });
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
}
