// this function will strip all indentation space on multiline strings
function trimIndentSpaces(multiLineStr: string): string {

  // create regex constants (vars)
  // this regex identifies the following line breaks: CRLF (Windows/DOS), LF (Linux/Unix), CR (Mac/Unix), LFCR (other systems)
  const NEWLINES: RegExp = /(?:\n\r|\r\n|\n|\r)/;
  // this regex identifes whitespace from the beginning of the line and matches 1 or more of the preceding whitepsace token
  const WHITESPACE: RegExp = /(?:^\s+)/gm; // uses the global flag (which retains the index of the last match) and multiline flag (matches on multiple lines)

  var splitRegEx: RegExp = new RegExp(NEWLINES);
  // Split on newlines.
  let lines: string[] = multiLineStr.split(splitRegEx);

  // Rip out the leading whitespace.
  var trimRegEx: RegExp = new RegExp(WHITESPACE);
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
