# flowfact - a node.js interface to the Flowfact API

[![NPM](https://nodei.co/npm/flowfact.png?downloads=true&stars=true)](https://nodei.co/npm/flowfact/)  


[![Circle CI](https://circleci.com/gh/ctaepper/flowfact/tree/master.svg?style=svg)](https://circleci.com/gh/ctaepper/flowfact/tree/master) [![Dependency Status](https://david-dm.org/ctaepper/flowfact.svg)](https://david-dm.org/ctaepper/flowfact)

## About 

```bash
$ npm install flowfact
```

## Usage

### Installation

```bash
$ npm install flowfact
```

In order to authenticate, set the following environment variable

```
FLOWFACT_URL=flowfact://username:password@contractId
```

### Example

```js
var flowfact = require('flowfact')();

flowfact.getUsers().then(function (userlist) {
	...
)}
```



## License

The MIT License (MIT)

Copyright (c) 2015 Christian Taepper

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
