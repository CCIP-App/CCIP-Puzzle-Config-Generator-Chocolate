const { extractSheets } = require('spreadsheet-to-json');
const config = require('./config');

extractSheets({
  spreadsheetKey: config.spreadsheetKey,
}, (err, data) => {
  if (err) console.log(err);
  else {
    try {
      const boothI18nColumns = ['displayText', 'description'];
      const { Booth: boothList, Config } = data;
      const booths = boothList.map(({
        slug, significant, image_url: imageUrl, point, isBonus, ...others
      }) => (
        {
          slug,
          significant,
          imageUrl,
          point,
          isBonus,
          ...boothI18nColumns.reduce((dict, key) => Object.assign(dict, {
            [key]: Object.keys(others)
              .filter((k) => (new RegExp(key).test(k)))
              .reduce((i18nDict, keyLang) => {
                const newKey = keyLang.match(new RegExp(`${key}_([a-zA-Z-]+)`));
                return Object.assign(i18nDict, { [newKey[1]]: others[keyLang] });
              }, {}),
          }), {}),
        }
      ));

      const configI18nColumns = ['title'];
      const { conf_name: confName, bingo_pattern: bingoPattern, ...others } = Config.reduce(
        (dict, item) => Object.assign(dict, { [item.ColumnName]: item.Value }), {},
      );
      const profile = {
        confName,
        bingoPattern,
        ...configI18nColumns.reduce((dict, key) => Object.assign(dict, {
          [key]: Object.keys(others)
            .filter((k) => (new RegExp(key).test(k)))
            .reduce((i18nDict, keyLang) => {
              const newKey = keyLang.match(new RegExp(`${key}_([a-zA-Z-]+)`));
              return Object.assign(i18nDict, { [newKey[1]]: others[keyLang] });
            }, {}),
        }), {}),
      };
      const output = JSON.stringify({
        booths,
        ...profile,
      });
      console.log(output);
    } catch (e) {
      console.log(e);
    }
  }
});
