install:
	@npm install

test:
	@./node_modules/.bin/jshint .
	@./node_modules/.bin/mocha ./test/test.js

.PHONY: install test
