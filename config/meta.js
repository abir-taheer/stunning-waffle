const db = require("./database");
const tools = require("./tools");

const meta = {
  getTitle: (url) => {
    return new Promise((resolve) => {
      let items = tools.splitURL(url);
      switch(items[0]) {

        case undefined:
          resolve("stunning-waffle | Home");
          break;

        case "elections":
          resolve("stunning-waffle | Elections");
          break;

        case "candidates":
          resolve("stunning-waffle | Candidates");
          break;

        default:
          resolve("stunning-waffle | Error 404");
      }

    });
  },
  getType: (url) => {
    return new Promise((resolve) => {
      let items = tools.splitURL(url);
      switch(items[0]) {

        case "elections":

        case "candidates":

        default:
          resolve("website");
      }

    });
  },
  getImage: (url) => {
    return new Promise((resolve) => {
      let items = tools.splitURL(url);
      switch(items[0]) {

        case undefined:

        case "elections":

        case "candidates":

        default:
          resolve("/logo192.png");
      }

    });
  },
  getDescription: (url) => {
    return new Promise((resolve, reject) => {
      let items = tools.splitURL(url);
      switch(items[0]) {

        case undefined:
          resolve("Vote for Student Union elections and view past elections.");
          break;
        case "elections":

        case "candidates":

        default:
          resolve("That page does not exist");
      }
    });
  },
  fillIndex: async (data, url) => {
    let fields = {
      __OG_TITLE__: await meta.getTitle(url),
      __OG_TYPE__: await meta.getType(url),
      __OG_IMAGE__: await meta.getImage(url),
      __OG_DESCRIPTION__: await meta.getDescription(url)
    };

    Object.keys(fields).forEach((key) => {
      data = data.replace(key, fields[key]);
    });

    return data;
  }
};

module.exports = meta;