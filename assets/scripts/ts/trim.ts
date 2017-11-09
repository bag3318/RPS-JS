// this function will strip all indentation space on multiline strings
function trimIndentSpaces(stringMsg: string): string {

  // create regex constants (vars)
  const $NEWLINES: RegExp = /(?:\n\r|\n|\r)/;
  const $WHITESPACE: RegExp = /(?:^\s+)/g;

  // Split on newlines.
  var splitRegEx: RegExp = RegExp($NEWLINES);
  let lines: string[] = stringMsg.split(splitRegEx);

  // Rip out the leading whitespace.
  var trimRegEx: RegExp = RegExp($WHITESPACE);
  return lines.map((line) => {
    return line.replace(trimRegEx, '');
  }).join('\n').trim();
}
