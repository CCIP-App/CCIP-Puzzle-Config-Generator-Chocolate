# CCIP-Puzzle-Config-Generator-Chocolate
Generate configuration for ccip-puzzle-chocolate from google sheets

## Usage

### 1. Install dependency

```shell
npm install
```

### 2. Create spreadsheet and config.js

spreadsheet template https://docs.google.com/spreadsheets/d/18bQ9TtS-I7yrRMY42cJlZmhqmYCxxR3A3OQJPGcm8DA/edit?usp=sharing

```js
module.exports = {
  spreadsheetKey: '<your sheet key in here>',
};
```

Make sure that your spreadsheet can be access by who know link, and has been published

### 3.Run command

```shell
node index.js
```

The result will be write to stdout
