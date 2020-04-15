module.exports = {
  isHeadless: () => {
    return process.env.HEADLESS === "true";
  },

  getChromiumArgs: () => {
    return process.env.CHROMIUM_ARGS.split(" ");
  },
};
