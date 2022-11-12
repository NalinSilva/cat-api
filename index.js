const { writeFile } = require("fs");
const { join } = require("path");
const request = require("request");
const blend = require("@mapbox/blend");
const argv = require("minimist")(process.argv.slice(2));

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

const baseUrl = "https://cataas.com/cat/says/";

const make_request = (type) => {
  let statusCode = 200;
  url = {
    url: `${
      baseUrl + type
    }?width=${width}&height=${height}&color${color}&s=${size}`,
    encoding: "binary",
  };
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        console.log(err);
        statusCode = 404;
        reject({ statusCode, err });
      }
      resolve({ statusCode, body });
    });
  });
};
const blend_and_save = (body1, body2) => {
  blend(
    [
      { buffer: new Buffer(body1, "binary"), x: 0, y: 0 },
      { buffer: new Buffer(body2, "binary"), x: width, y: 0 },
    ],
    { width: width * 2, height: height, format: "jpeg" },
    (err, data) => {
      const fileOut = join(process.cwd(), `/cat-card.jpg`);

      writeFile(fileOut, data, "binary", (err) => {
        if (err) {
          console.log(err);
          return false;
        }

        console.log("The file was saved!");
        return true;
      });
    }
  );
};

const use_cat_service = (type1, type2) => {
  return new Promise(async (resolve, reject) => {
    const firstRes = await make_request(type1);
    const secondRes = await make_request(type2);

    console.log(
      `Received response with status for first and second request respectivly ${firstRes.statusCode} , ${secondRes.statusCode}`
    );

    blendReult =
      firstRes.statusCode === 200 && secondRes.statusCode === 200
        ? blend_and_save(firstRes.body, secondRes.body)
        : false;

    resolve(blendReult);
  });
};

use_cat_service(greeting, who);

module.exports = {
  make_request: make_request,
  use_cat_service: use_cat_service,
};
