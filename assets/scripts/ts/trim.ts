/**
 * To Do List:
 * Convert function into generic function
 * Add more comments
 */

// this function will strip all indentation space on multiline strings
function trimIndentSpaces(strings: TemplateStringsArray, ...values: Array<number|string>): string { // feel free to change the values array data type(s)

  // create regex constants (vars)
  const $NEWLINES: RegExp = /(?:\n\r|\n|\r)/gm;
  const $WHITESPACE: RegExp = /(?:^\s+)/gm;

  // Interweave the strings with the substitution vars first.
  let output: string = '';
  for (let i: number = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  var splitRegEx: RegExp = RegExp($NEWLINES);
  let lines: string[] = output.split(splitRegEx);

  // Rip out the leading whitespace.
  var trimRegEx: RegExp = RegExp($WHITESPACE);
  return lines.map((line) => {
    return line.replace(trimRegEx, '');
  }).join('\n').trim();

}

/**
 * How to use:
 * ===============
 * before a the ` in the multiline string,
 * put this: (trimIndentSpaces)
 * Ex:
 * var str: string = (trimIndentSpaces)`
 *    hello world
 * `;
 */
