// this function will strip all indentation space on multiline strings
function trimIndentSpaces(strings: TemplateStringsArray, ...values: Array<number|string>): string {

  // Interweave the strings with the substitution vars first.
  let output: string = '';
  for (let i: number = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  var splitRegEx: RegExp = RegExp(/(?:\n\r|\n|\r)/gm);
  let lines: string[] = output.split(splitRegEx);
  // Rip out the leading whitespace.
  var trimRegEx: RegExp = RegExp(/(?:^\s+)/gm);
  return lines.map((line) => {
    return line.replace(trimRegEx, '');
  }).join('\n').trim();

}
