// this function will strip all indentation space on multiline strings
function trimIndentSpaces(stringMsg: string): string {

  // create regex constants (vars)
  // this regex identifies the following line breaks: CRLF (Windows/DOS), LR (Linux/Unix), CR (Mac/Unix)
  const $NEWLINES: RegExp = /(?:\n\r|\n|\r)/;
  // this regex identifes whitespace from the beginning of the line and matches 1 or more of the preceding whitepsace token
  const $WHITESPACE: RegExp = /(?:^\s+)/g; // uses the global flag

  var splitRegEx: RegExp = RegExp($NEWLINES);
  // Split on newlines.
  let lines: string[] = stringMsg.split(splitRegEx);

  // Rip out the leading whitespace.
  var trimRegEx: RegExp = RegExp($WHITESPACE);
  return lines.map((line) => {
    return line.replace(trimRegEx, '');
  }).join('\n').trim(); // Join back together with new line.
}

/**
 * How to use:
 * ==============
 * // step 1: create multiline string
 * var str: string = `
 * Hello
 * World!
 * `;
 * // step 2: call the trimIndentSpaces function and pass in your multiline string variable
 * var strTrimmed: string = trimIndentSpaces(str);
 * // step 3: use the trimmed string to your needs
 * alert(strTrimmed);
 * // the following also works:
 * alert(trimIndentSpaces(str));
 */
