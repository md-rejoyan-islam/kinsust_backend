const colors = require("colors");

const devConsole = (message) => {
  if (process.env.NODE_ENV === "development") {
    console.log(" ");
    console.log(message.bgYellow.bold);
    console.log(" ");
  }
};

module.exports = devConsole;
