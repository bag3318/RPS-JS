// this functiontrimIndentSpaces will strip all indentation space on multiline strings
function (multiLineStr: string): string {

  // create regex constants (vars)
  
  // this regex identifies the following line breaks: CRLF (Windows/DOS), LF (Linux/Unix), CR (Mac/Unix), LFCR (other systems)
  const NEWLINES: RegExp = /(?:\r\n|\n\r|\n|\r)/g; // g (global flag) retains index of last match
  
  // this regex identifes whitespace from the beginning of the line and matches 1 or more of the preceding whitepsace token
  const WHITESPACE: RegExp = /(?:^\s+)/; 

  var newLinesRegEx: RegExp = new RegExp(NEWLINES);
  var whiteSpaceRegEx: RegExp = new RegExp(WHITESPACE);

  // Split on newlines.
  let lines: string[] = multiLineStr.split(newLinesRegEx);

  // Rip out the leading whitespace.
  // go through each item in the `lines` array and replace each item's leading whitespace with blank (effectivly deleting the preceding whitespace)
  return lines.map((line) => {
    return line.replace(whiteSpaceRegEx, '');
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
