install:
	@npm install
test:
	@./node_modules/.bin/jshint .
	@foreman run ./node_modules/.bin/mocha ./test/test.js

.PHONY: test
