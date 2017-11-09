// this function will strip all indentation space on multiline strings
function trimIndentSpaces<T>(stringMsg: T): string {

  // create regex constants (vars)
  const $NEWLINES: RegExp = /(?:\n\r|\n|\r)/gm;
  const $WHITESPACE: RegExp = /(?:^\s+)/gm;

  // Split on newlines.
  var splitRegEx: RegExp = RegExp($NEWLINES);
  let lines: string[] = stringMsg.split(splitRegEx);

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
 * put this: trimIndentSpaces
 * Ex:
 * var str: string = trimIndentSpaces`
 *    hello world
 * `;
 */
