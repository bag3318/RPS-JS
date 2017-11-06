// this function will strip all indentation space on multiline strings
function trimIndentSpace(strings: any, ...values: Array<any>): string {

  // Interweave the strings with the substitution vars first.
  let output: string = '';
  for (let i: number = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  var splitRegEx: any = new RegExp(/(?:\r\n|\n|\r)/);
  let lines: string[] = output.split(splitRegEx);

  // Rip out the leading whitespace.
  var trimRegEx: any = new RegExp(/(?:^\s+|^\t+|^\r+|^\n+)/gm);
  return lines.map((line) => {
    return line.replace(trimRegEx, '');
  }).join('\n').trim();
}
