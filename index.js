'use strict';

var cache = {};

/**
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String} Get the same string back with a snippet inserted
 */

function extract(str, opts) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string.');
  }

  opts = opts || {};
  var delims = opts.delimiters || ['<!--', '-->'];
  var name = opts.tag || 'snippet';
  var regex = opts.regex || toRegex(name, delims);

  // get any existing sections
  var sections = split(str, regex);
  var len = sections.length;

  if (len === 3) {
    return trim(sections[1]);
  }
  return null;
}

/**
 * Snippet utils
 */

function emit(str) {
  return str;
}

/**
 * String utils
 */

function toString(str) {
  return str == null ? '' : str;
}

function split(str, re) {
  return toString(str).split(re).map(trim);
}

function trim(str) {
  return emit(toString(str).trim());
}

/**
 * Delimiter-related utils
 */

function memoize(key, val) {
  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }
  return (cache[key] = val);
}

function toRegex(name, delims) {
  var key = name + delims.join('_');
  return memoize(key, new RegExp(toMarker(name, delims), 'g'));
}

function escape(str) {
  return str.replace(/(\W)/g, '\\$1');
}

function toMarker(name, delims) {
  return '(?:' + escape(delims[0]) + '\\s*(?:end)?' + name + '\\s*' + escape(delims[1]) + ')';
}

/**
 * Expose `extract`
 */

module.exports = extract;
