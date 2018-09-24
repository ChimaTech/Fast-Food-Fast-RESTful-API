// Define a function that will encode a string into tokens and IDs
function encodeStr(string) {
  let encoded;
  let i;

  let result = '';

  for (i = 0; i < string.length; i += 1) {
    encoded = string.charCodeAt(i).toString(36);

    result += encoded;
  }

  return result;
}

export default encodeStr;
