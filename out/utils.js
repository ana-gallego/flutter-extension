"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    camelCase(input) {
        return input.replace(/-([a-z])/ig, function (all, letter) {
            return letter.toUpperCase();
        });
    }
    /**
     *
     * @param fileName nombre del archivo
     * este metodo retorna un nombre en camelCase a partir del nombre del file que se creará
     */
    nameByFileName(fileName) {
        var name;
        name = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        name = this.camelCase(name).replace("-", "").replace("_", "");
        return name;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map