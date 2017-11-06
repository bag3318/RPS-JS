export function trimIndentSpace(strings: any, ...values: Array<any>): string {
  // Interweave the strings with the
  // substitution vars first.
  let output: string = '';
  for (let i: number = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  let lines: string[] = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines.map((line) => {
    return line.replace(/^\s+/gm, '\n');
  }).join(' ').trim();
}
