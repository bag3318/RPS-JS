// this arrow function, trimIndentSpaces, will strip all indentation space on multiline strings
function trimIndentSpaces(multiLineStr: string): string {

  // create regex constants (vars)
  
  // this regex identifies the following line breaks: CRLF (Windows/DOS), LF (Linux/Unix), CR (Mac/Unix), LFCR (other systems)
  const NEWLINES: RegExp = /(?:(?:\r\n)|(?:\n\r)|\r|\n)/g; // g (global flag) retains index of last match
  
  // this regex identifes whitespace from the beginning of the line and matches 1 or more of the preceding whitepsace token
  const WHITESPACE: RegExp = /(?:^\s+)/; 

  // create regex var statements
  var newLines: RegExp = new RegExp(NEWLINES);
  var whiteSpace: RegExp = new RegExp(WHITESPACE);

  // Split on all types newlines.
  let lines: string[] = multiLineStr.split(newLines);

  // Rip out the leading whitespace.
  // go through each item in the `lines` array and replace each item's leading whitespace with blank (effectivly deleting the preceding whitespace)
  return lines.map((line) => {
    return line.replace(whiteSpace, '');
  }).join('\n'); // Join back together with new line.

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
