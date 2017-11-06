"use strict";
exports.__esModule = true;
function trimIndentSpace(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    // Interweave the strings with the
    // substitution vars first.
    var output = '';
    for (var i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];
    // Split on newlines.
    var lines = output.split(/(?:\r\n|\n|\r)/);
    // Rip out the leading whitespace.
    return lines.map(function (line) {
        return line.replace(/^\s+/gm, '\n');
    }).join(' ').trim();
}
exports.trimIndentSpace = trimIndentSpace;
