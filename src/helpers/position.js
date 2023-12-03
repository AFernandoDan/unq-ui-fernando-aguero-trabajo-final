const toChar = i => String.fromCharCode(65 + i)

export const parsePos = (i, j) => ({x: toChar(j), y: i+1})