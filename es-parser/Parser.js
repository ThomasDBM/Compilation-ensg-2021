const Lexer = require('./Lexer')
const TokenType = require('./TokenType')
const Token = require('./Token')


class Parser {

	constructor() {
		this._tokens = []
		this._ast = null
		this._cursor = 0
		this._pile = []
		
	}


	/** Getters */

	getTokenType(){
		return this._tokens[this._cursor].type;
	}

	getElement(){
		return this._tokens[this._cursor].name;
	}

	/** Producers */

	produceNumber(){
		this._pile.push(parseInt(this.getElement()))
	}

	produceSomme(left, right){
		this._pile.push(left+right);
	}

	produceSoustraction(left, right){
		this._pile.push(left-right)
	}

	produceMultiplication(left, right){
		this._pile.push(left*right)

	}

	consome(){
		this._cursor++;
		console.log(" Le curseur vaux :"+this._cursor)
		console.log("Les elements dans la pile sont :"+this._pile)
	}

	/** Parsers */

	//Gère l'addition et la soustraction
	parseA(){
		if (this._cursor == TokenType.EOF) return true

		if ( this.getTokenType() == TokenType.NUMBER || this.getTokenType() == TokenType.SYMBOL_O_PAR ){
			this.parseM()
		}
		if ( this.getTokenType() == TokenType.SYMBOL_PLUS ){

			this.consome()
			this.parseA()

			let right = this._pile.pop()
			let left = this._pile.pop()
			this.produceSomme(left, right)
		}
		if ( this.getTokenType() == TokenType.SYMBOL_MOINS){

			this.consome()
			this.parseA()

			let right = this._pile.pop()
			let left = this._pile.pop()
			this.produceSoustraction(left, right)
		}
		return true
	}

	//Gère la multiplication
	parseM(){
		if (this._cursor == TokenType.EOF) return true

		if ( this.getTokenType() == TokenType.NUMBER || this.getTokenType() == TokenType.SYMBOL_O_PAR ){
			this.parseE()
		}
		if ( this.getTokenType() == TokenType.SYMBOL_FOIS ){
			
			this.consome()
			this.parseM()

			let right = this._pile.pop()
			let left = this._pile.pop()
			this.produceMultiplication(left, right);
		}
		return true
	}

	//Gère les elements et les parenthèses
	parseE(){
		if (this._cursor == TokenType.EOF) return true

		if ( this.getTokenType() == TokenType.NUMBER ){
			this.produceNumber();
			this.consome();
		}
		else if (this.getTokenType() == TokenType.SYMBOL_O_PAR) {
			this.consome();
			this.parseA();
			this.consome();
		}
		return true;
	}

	parser(tokens) {
		this._tokens = tokens
		this.parseA();

		return this._pile.pop()
	}
}

module.exports = Parser