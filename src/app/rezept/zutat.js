"use strict";
var Zutat = (function () {
    function Zutat(menge, einheit, zutat) {
        if (menge === void 0) { menge = 0; }
        if (einheit === void 0) { einheit = ""; }
        if (zutat === void 0) { zutat = ""; }
        this.menge = menge;
        this.einheit = einheit;
        this.zutat = zutat;
    }
    return Zutat;
}());
exports.Zutat = Zutat;
