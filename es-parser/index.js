const Lexer = require('./Lexer')
const Parser = require('./Parser')

const src = '2 + ( 7 - 2 ) + 4 * 5 '
//const src = '1234'

const tokens = new Lexer().parse(src);
const result = new Parser().parser(tokens);

console.log(src);
console.log(tokens);
console.log(result)