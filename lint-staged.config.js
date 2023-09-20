module.exports = {
  '*.{js,ts,json,md,html,yml}': [files => `npx nx format:write --files=${files.join(',')}`]
};
