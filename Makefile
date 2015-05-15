install:
	@npm install

syntaxtest:
	@./node_modules/.bin/jshint .

test: syntaxtest
	@./node_modules/.bin/mocha ./test/test.js

.PHONY: install syntaxtest test
