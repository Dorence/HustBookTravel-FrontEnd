let config = {
    remoteAddr: "http://www.husteic.cn:3000/",
    bookReturnLocations: ["东九", "东十二", "西十二", "西五"],
    themeColor: ["#d87c7c", "#919e8b", "#d7ab82", "#6e7074", "#61a0a8", "#efa18d", "#787464", "#cc7e63", "#724e58", "#4b565b"],
    randColor() { return config.themeColor[Math.floor(Math.random() * config.themeColor.length)]; }
}

module.exports = config;