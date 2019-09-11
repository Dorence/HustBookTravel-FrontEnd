(function() {
    "use strict";
    const config = require('../config')
    const sourceMapEnabled = process.env.NODE_ENV === 'production' ?
        config.build.productionSourceMap : config.dev.cssSourceMap;
    module.exports = {
        cssSourceMap: sourceMapEnabled,
        cacheBusting: config.dev.cacheBusting,
        transformToRequire: { video: ['src', 'poster'], source: 'src', img: 'src', image: 'xlink:href' }
    }
})();