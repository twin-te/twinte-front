const fs = require("fs");

// gitignore にもこのファイル名を追加
const tsconfigFilename = "tsconfig.staged.json";

const typecheckOnlyStaged = (stagedFilenames) => {
  const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json"));
  tsconfig.include = stagedFilenames;
  fs.writeFileSync(tsconfigFilename, JSON.stringify(tsconfig));
  return `yarn typecheck --project ${tsconfigFilename}`;
};

module.exports = {
  "*.{ts,tsx,vue}": [typecheckOnlyStaged, "yarn lint:fix"],
  "*.{md,json}": ["yarn prettier --write"],
  "*.{scss}": [],
};
