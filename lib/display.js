'use strict';
const barHorizontal = require('bar-horizontal')

module.exports = (data) => {
    if (Object.keys(data).length > 0){
        barHorizontal(data, {labels: true})
    }
}
