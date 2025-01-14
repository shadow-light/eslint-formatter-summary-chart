'use strict';

module.exports = (data) => {
  const table = {
    files: {},
    errors: {},
    warnings: {}
  };
  data.forEach((result) => {
    table.files[result.filePath] = result.messages.length;
    result.messages.forEach((message) => {
      const ruleId = message.ruleId || 'unknown';
      const type = message.severity === 2 ? 'errors' : 'warnings'
      if (table[type][ruleId] == null) {
        table[type][ruleId] = 1;
      } else {
        ++table[type][ruleId];
      }
    });
  });

  const filterFilePath = calcIntersectionText(Object.keys(table.files));

  return {
    errors: table.errors,
    warnings: table.warnings,
    files: Object.keys(table.files).reduce((acc, filePath) => {
      return Object.assign(acc, {[filePath.replace(filterFilePath, '')]: table.files[filePath]})
    }, {})
  };
}

// TODO: Optimization
const calcIntersectionText = (filePaths) => {
  const minLength = Math.min(...filePaths.map((filePath) => filePath.length));
  const testFilePath = filePaths[0];
  let result = '';

  for (let i = 0; i < minLength; ++i) {
    if (filePaths.slice(1).every((filePath) => testFilePath.indexOf(filePath.substring(0, i)) === 0)) {
      result = testFilePath.substring(0, i);
    } else {
      break;
    }
  }

  return result;
}
