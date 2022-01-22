# @lukeshay packages

This repo contains various NPM packages that I use. I started building this because I noticed a lot of things that I would repeat in all of my projects. I am not really building this for other people to use but feel free to use them and submit pull requests!

If anybody finds any bugs, please create an issue and submit a PR if you would like.

## Commands

| Command (`npm run <CMD>`) | Description                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| prettier                  | Runs `prettier` on all files in the repo that are not in the .gitignore                      |
| prettier:check            | Runs `prettier --check` on all files in the repo that are not in the .gitignore              |
| prettier:write            | Runs `prettier --write` on all files in the repo that are not in the .gitignore              |
| lint                      | Runs `eslint` on JavaScript, TypeScript, and JSON files that are not in the .gitignore       |
| lint:fix                  | Runs `eslint --fix` on JavaScript, TypeScript, and JSON files that are not in the .gitignore |
| build                     | Runs `tsdx build` on all packages                                                            |
| test                      | Runs `tsdx test` on all packages                                                             |
| clean                     | Runs `rimraf` on dist/ and .jest-\*                                                          |
| size                      | Verifies the packages sizes meet requirements                                                |
| analyze                   | Analyzes the size of the packages                                                            |
| release                   | Bumps versions of packages                                                                   |
| npm                       | Publishes packages                                                                           |
| bootstrap                 | Setups repo for the first time using lerna                                                   |
