# qingcloud-cli


[![Build Status](https://api.travis-ci.org/tj/commander.js.svg?branch=master)](http://travis-ci.org/tj/commander.js)
[![NPM Version](http://img.shields.io/npm/v/commander.svg?style=flat)](https://www.npmjs.org/package/commander)
[![NPM Downloads](https://img.shields.io/npm/dm/commander.svg?style=flat)](https://www.npmjs.org/package/commander)
[![Join the chat at https://gitter.im/tj/commander.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/tj/commander.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

  The complete solution for [node.js](http://nodejs.org) command-line interfaces, inspired by Ruby's [commander](https://github.com/tj/commander).  
  [API documentation](http://tj.github.com/commander.js/)


## Installation

    $ npm install commander

## Option parsing

 Options with commander are defined with the `.option()` method, also serving as documentation for the options. The example below parses args and options from `process.argv`, leaving remaining args as the `program.args` array which were not consumed by options.
