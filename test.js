/*!
 * extract-snippet <https://github.com/jonschlinkert/extract-snippet>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var extract = require('./');

describe('extract snippet', function () {
  describe('errors', function () {
    it('should throw an error when invalid arguments are passed:', function () {
      (function () {
        extract();
      }).should.throw('expected a string.');
    });
  });

  it('should extract a delimited snippet:', function () {
    var a = 'a <!-- snippet -->\nfoo\n<!-- endsnippet --> b';
    extract(a).should.equal('foo');
    var b = 'a <!-- snippet -->a b c<!-- endsnippet --> b';
    extract(b).should.equal('a b c');
  });

  it('should extract a snippet with custom delimiters:', function () {
    var str = 'a {{snippet}}\nfoo\n{{endsnippet}} b';
    var actual = extract(str, {delimiters: ['{{', '}}']});
    actual.should.equal('foo');
  });

  it('should extract a snippet with custom tag:', function () {
    var a = 'a <!-- foo -->\nfoo\n<!-- endfoo --> b';
    extract(a, {tag: 'foo'}).should.equal('foo');
    var b = 'a <!-- bar -->a b c<!-- endbar --> b';
    extract(b, {tag: 'bar'}).should.equal('a b c');
  });
});
