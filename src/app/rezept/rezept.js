"use strict";
var Rezept = (function () {
    function Rezept(id, beschreibung, titel, zutaten, kalorien, schwierigkeitsgrad, zeit, zubereitung, art, bildsrc) {
        this.beschreibung = "";
        this.titel = "";
        this.schwierigkeitsgrad = "";
        this.zubereitung = "";
        this.art = "";
        this.bildsrc = "";
        this.selected = false;
        this.id = id;
        this.beschreibung = beschreibung;
        this.titel = titel;
        this.zutaten = zutaten;
        this.kalorien = kalorien;
        this.schwierigkeitsgrad = schwierigkeitsgrad;
        this.zeit = zeit;
        this.zubereitung = zubereitung;
        this.art = art;
        this.bildsrc = bildsrc;
    }
    Rezept.prototype.addZutat = function (zutat) {
        this.zutaten.push(zutat);
    };
    Rezept.prototype.removeZutat = function (arrayIndex) {
        this.zutaten.splice(arrayIndex, 1);
    };
    return Rezept;
}());
exports.Rezept = Rezept;
