"use strict";
function trimIndentSpace(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var output = '';
    for (var i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];
    var lines = output.split(/(?:\r\n|\n|\r)/);
    return lines.map(function (line) {
        return line.replace(/^\s+/gm, '\n');
    }).join(' ').trim();
}
