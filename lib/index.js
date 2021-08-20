const formatter = require('./formatter')
const display = require('./display')

const sorted = data => Object.keys(data)
  .sort((a, b) => data[b] - data[a])
  .reduce((acc, key) => {
    acc[key] = data[key]
    return acc
  }, {})

module.exports = (results) => {
  const { files, errors, warnings } = formatter(results)

  console.log('==== Files ====')
  display(sorted(files))

  console.log('\n\n==== Errors ====')
  display(sorted(errors))

  console.log('\n\n==== Warnings ====')
  display(sorted(warnings))
}
