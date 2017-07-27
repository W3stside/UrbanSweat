//Helper functions

var utils = {
    makeId () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 30; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    rdmNum(min = 300, max = 1200) {
    	min = Math.ceil(min);
    	max = Math.floor(max);
    	return Math.floor( Math.random() * (max - min + 1) + min )
    }
}

module.exports = utils;
