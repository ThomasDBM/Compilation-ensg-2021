const Lexer = require('./Lexer')
const TokenType = require('./TokenType')
const Token = require('./Token')


class Parser {

	constructor() {
		this._tokens = null
		this._ast = null
		this._result = 0
		this._cursor = null
	}

	parseS(){
		if (this.tokens[this._cursor].type == TokenType.NUMBER ){
			
		}
	}


	parser(tokens) {

		this._tokens = tokens
		return this._result
	}
}

module.exports = Parser