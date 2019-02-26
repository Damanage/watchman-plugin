"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Convert arr: {metrics: {name:string, value:number} }
function MetricsToObj(arr) {
    let o = {};
    if (!arr)
        return;
    for (var it of (arr.metrics || [])) {
        o[it.name] = Number(it.value);
    }
    return o;
}
exports.default = MetricsToObj;
//# sourceMappingURL=MetricsConverter.js.map