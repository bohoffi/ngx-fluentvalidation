module.exports = {
  '*.{js,ts,json,md,html,yml}': [(files) => `nx format:write --files=${files.join(',')}`]
};
