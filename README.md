# cz-conventional-changelog-lerna
Add a line "affects" to commit.

Forked from cz-conventional-changelog. No dependence added. Just a little change. Tested with `lerna@5`.

Lerna monorepo root package.json example:
```json
{
  "name": "root",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "commitizen": "^4.1.2",
    "cz-conventional-changelog-lerna": "^0.1.0",
    "lerna": "^5.0.0"
  },
  "scripts": {
    "commit": "cz",
    "commit-all": "git add . && cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-lerna",
    }
  }
}
```

lerna.json
```json
{
  "packages": [
    "packages/*"
  ],
  "command": {
    "version": {
      "conventionalCommits": true
    }
  },
  "version": "independent"
}
```
When execute `lerna version` or `lerna publish`, the changelog will be generated.


**Follow is orginal documentation of cz-conventional-changelog.**
# cz-conventional-changelog

[![Greenkeeper badge](https://badges.greenkeeper.io/commitizen/cz-conventional-changelog.svg)](https://greenkeeper.io/)

Status:
[![npm version](https://img.shields.io/npm/v/cz-conventional-changelog.svg?style=flat-square)](https://www.npmjs.org/package/cz-conventional-changelog)
[![npm downloads](https://img.shields.io/npm/dm/cz-conventional-changelog.svg?style=flat-square)](http://npm-stat.com/charts.html?package=cz-conventional-changelog&from=2015-08-01)
[![Build Status](https://img.shields.io/travis/commitizen/cz-conventional-changelog.svg?style=flat-square)](https://travis-ci.org/commitizen/cz-conventional-changelog)

Part of the [commitizen](https://github.com/commitizen/cz-cli) family. Prompts for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) standard.

## Configuration

### package.json

Like commitizen, you specify the configuration of cz-conventional-changelog through the package.json's `config.commitizen` key.

```json5
{
// ...  default values
    "config": {
        "commitizen": {
            "path": "./node_modules/cz-conventional-changelog",
            "disableScopeLowerCase": false,
            "disableSubjectLowerCase": false,
            "maxHeaderWidth": 100,
            "maxLineWidth": 100,
            "defaultType": "",
            "defaultScope": "",
            "defaultSubject": "",
            "defaultBody": "",
            "defaultIssues": "",
            "types": {
              ...
              "feat": {
                "description": "A new feature",
                "title": "Features"
              },
              ...
            }
        }
    }
// ...
}
```

### Environment variables

The following environment variables can be used to override any default configuration or package.json based configuration.

* CZ_TYPE = defaultType
* CZ_SCOPE = defaultScope
* CZ_SUBJECT = defaultSubject
* CZ_BODY = defaultBody
* CZ_MAX_HEADER_WIDTH = maxHeaderWidth
* CZ_MAX_LINE_WIDTH = maxLineWidth

### Commitlint

If using the [commitlint](https://github.com/conventional-changelog/commitlint) js library, the "maxHeaderWidth" configuration property will default to the configuration of the "header-max-length" rule instead of the hard coded value of 100.  This can be ovewritten by setting the 'maxHeaderWidth' configuration in package.json or the CZ_MAX_HEADER_WIDTH environment variable.
