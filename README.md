[![Build Status](https://secure.travis-ci.org/clintcparker/NodeWorld.png?branch=master)](http://travis-ci.org/clintcparker/NodeWorld)



NodeWorld
=========


Usage
-----

#### Install Node.js 

By following the instructions here http://howtonode.org/how-to-install-nodejs

#### Clone the "NodeWorld" repository

    $ git clone git@github.com:bnowel/NodeWorld.git

#### Configure node.js

    $ cd NodeWorld
    $ npm install

#### Run main.js

    $ node main.js

visit http://0.0.0.0:3000 in your browser


Contributing
============
Please update these intructions if you find an error

Setting up a local enviroment
-----------------------------
#### Fork bnowel's "NodeWorld" repository through github

#### Clone your fork

    $ git clone git@github.com:<your github username>/NodeWorld.git

#### Configure remotes 

    $ cd NodeWorld
    $ git remote add upstream git@github.com:bnowel/NodeWorld.git
    $ git fetch upstream

#### Install Node.js

 Follow the instructions here http://howtonode.org/how-to-install-nodejs

 If you have OSX with home brew installed you can install node with the following command:

    $ brew install node

#### Configure Node.js

    $ npm install

Setting up Testing (Mocha) on your local
------------------------------
mocha - simple, flexible, fun javascript test framework for node.js & the browser. (BDD, TDD, QUnit styles via interfaces) — Read more at http://visionmedia.github.com/mocha

Install mocha for this project only:
    
    $ npm install --dev

Install mocha globally with npm:

    $ npm install -g mocha

To start using mocha

    $ mocha -w

Running tests:

    $ npm test

Developing a new feature
------------------------
#### Choose your Feature to create
Pick a feature from the issues page https://github.com/bnowel/NodeWorld/issues or come up with your own new feature.

#### Get the latest from upstream before starting your feature

    $ git branch master
    $ git fetch upstream
    $ git merge upstream/master

#### Create a new branch to develop your feature on

    $ git checkout -b fooBarFeature

#### Write unit tests for your new feature

Create the auto running test for cloud9

    $ vim static/js/fooBar/fooBar_test.js
    
This file should only contain two lines
    
    require('../../../test/c9test');
    require('../../../test/test.fooBar');
    
Create the actual test file
    
    $ vim static/js/fooBar_test.js
    
An example of of a test suite
    
    var assert = require('assert'),
    fooBar = require('./../static/js/fooBar/fooBar');
  
    suite('fooBar', function() {
        test('fooBar Instantiation', function() {
            var fooBar = fooBar();
            assert.ok(fooBar instanceof fooBar, "Make new object even if not called with new.");
            
            var fooBar2 = new fooBar();
            assert.ok(fooBar2 instanceof fooBar, "Make new object like we're supposed to.");
        });
    });

#### Commit your changes to your branch regularly

    $ git commit -am "wrote unit tests for fooBar feature"

#### Develop your feature and get your tests passing

    $ vim static/js/fooBar/fooBar.js

#### Remember to commit your changes to your branch regularly

    $ git commit -am "started fooBar feature"

#### Merge in upstream
Once your feature is tested and working merge any new upstream changes in and resolve any conflicts

    $ git fetch upstream
    $ git merge upstream/master

#### If you have any merge confilcts address them

    $ git diff

#### push your branch to your github repository

    $ git push origin fooBarFeature

#### Perform a pull request

visit github, navigate to your fooBarFeature branch and click on "Pull Request"

Bug Tracker
-----------

Have a bug? Please create an issue here on GitHub!

https://github.com/bnowel/NodeWorld/issues


Mailing List
------------

Have a question? Ask on our mailing list!

slohacktime@googlegroups.com

http://groups.google.com/group/slohacktime


Authors
-------

**Bernie Nowel**

+ http://github.com/bnowel

**Blake Davis**

+ http://github.com/hexate

**Clint Parker**

+ http://github.com/clintcparker

**Christopher Smeder**

+ http://github.com/csmeder

**Pallavi Pershey**

+ http://github.com/ppershey

**Roberto Iraheta**

+ http://github.com/riraheta

Copyright and License
---------------------

Copyright (c) 2012 Bernie Nowel. NodeWorld is Licensed and distributed under the terms of the MIT License. See LICENSE.txt for further details. 

