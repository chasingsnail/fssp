cordova.define("cordova-plugin-location.GaoDeLocation",
    function(require, exports, module) {
        var exec = require("cordova/exec");

function GaoDeLocation() {

};

GaoDeLocation.prototype.getCurrentPosition = function (successCallback, errorCallback) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }

    if (typeof errorCallback != "function") {
        return;
    }

    if (typeof successCallback != "function") {
        return;
    }

    exec(successCallback, errorCallback, 'GaoDeLocation', 'getCurrentPosition',[]);
};

var location = new GaoDeLocation();
module.exports = location;
});