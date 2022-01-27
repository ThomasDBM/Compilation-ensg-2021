const TokenType = require('./TokenType')
const Token = require('./Token')

class Lexer {

	constructor() {
		this._src = ''
		this._cursor = 0
		this._currentWord = ''
		this._tokens = []
	}

	get current() {
		return this._src[this._cursor]
	}

	test(c) {
		if (this.current === c) {
			return true;
		} else {
			return false;
		}
	}

	consume() {
		this._currentWord += this.current
		this._cursor++;
	}

	produce(type) {
		this._tokens.push(new Token(this._currentWord, type))
		this.cleanCurrentWord()
	}

	cleanCurrentWord() {
		this._currentWord = ''
	}

	// digit = 0 | 1 | 2 | 3 ....
	testDigit() {
		if ("0123456789".includes(this.current)) return true;
		return false
	}

	// [0-9]+
	parseNumber() {
		if (!this.testDigit()) return false;
		do {
			this.consume()
		} while (this.testDigit())

		// production of number
		this.produce(TokenType.NUMBER)
		return true
	}

	// symbol = '+' | '-' | '*' | '/' | '%' | '(' | ')'
	testSymbol() {
		if ("/%".includes(this.current)) return true;
		return false
	}

	testPlus() {
		if ("+".includes(this.current)) return true;
		return false
	}

	testMoins() {
		if ("-".includes(this.current)) return true;
		return false
	}

	testFois() {
		if ("*".includes(this.current)) return true;
		return false
	}

	testOpenParenthese() {
		if ("(".includes(this.current)) return true;
		return false
	}

	testCloseParenthese() {
		if (")".includes(this.current)) return true;
		return false
	}

	parseSymbol() {
		if (this.testSymbol()) {this.consume(); this.produce(TokenType.SYMBOL)}
		else if (this.testPlus()){this.consume(); this.produce(TokenType.SYMBOL_PLUS)}
		else if (this.testMoins()){this.consume(); this.produce(TokenType.SYMBOL_MOINS)}
		else if (this.testFois()){this.consume(); this.produce(TokenType.SYMBOL_FOIS)}
		else if (this.testOpenParenthese()){this.consume(); this.produce(TokenType.SYMBOL_O_PAR)}
		else if (this.testCloseParenthese()){this.consume(); this.produce(TokenType.SYMBOL_F_PAR)}
		else return false

		return true
	}

	// space = ' ' | '\t' | '\n' | '\l' | '\r' | '\0'
	testSpace() {
		if (" \t\n\l\r\0".includes(this.current)) return true;
		return false
	}

	avoidSpace() {
		while (this.testSpace()) {
			this.consume()
			this.cleanCurrentWord()
		}

		return this.current != undefined
	}

	// parser = (number | symbol | space)*
	parse(src) {
		this._src = src

		while (this.parseNumber() || this.parseSymbol() || this.avoidSpace()) {
			// nothing to do, consume already done in functions
		}
		this._currentWord = 'eof'
		this.produce(TokenType.EOF)
		return this._tokens
	}

}

module.exports = Lexer