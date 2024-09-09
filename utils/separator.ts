function separateValues(texto: string): [string, string] {
  const separator = ";";
  const index = texto.indexOf(separator) + separator.length;
  const value1 = texto.slice(0, index).replace("Equity:", "").trim().split("-")[1];
  const value2 = texto.slice(index).replace("Option:", "").trim();
  return [value1, value2];
}

export default separateValues;
