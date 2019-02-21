///////////////////////////////
// Polyfills
///////////////////////////////
if (!(String.prototype).startsWith) {
    String.prototype.startsWith = function (sz) {
        if (!sz) { return false; }
        if (sz.length < this.length) { return false; }
        return this.substring(0, sz.length) == sz;
    }
}

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (testFunc) {
        for (var i = 0; i < this.length; i++) {
            if (testFunc(this[i], i)) return i;
        }
        return -1;
    };
}

if (!Array.prototype.find) {
    Array.prototype.find = function (testFunc) {
        for (var i = 0; i < this.length; i++) {
            if (testFunc(this[i], i)) return this[i];
        }
        return null;
    };
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function (el) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == el) return true;
        }
        return false;
    };
}
