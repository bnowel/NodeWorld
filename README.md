NodeWorld
=========

Usage
-----
* Install Node.js by following the instructions here http://howtonode.org/how-to-install-nodejs
* Clone the "NodeWorld" repository
$ git clone git@github.com:bnowel/NodeWorld.git
* Configure node.js
    $ cd NodeWorld
    $ npm install
* Run main.js
    $ node main.js
visit http://0.0.0.0:3000 in your browser


Contributing
============

Please update these intructions if you find an error

Setting up a local enviroment
-----------------------------
* Fork bnowel's "NodeWorld" repository through github

* Clone your fork

    $ git clone git@github.com:<your github username>/NodeWorld.git

* Configure remotes 

    $ cd NodeWorld
    $ git remote add upstream git@github.com:bnowel/NodeWorld.git
    $ git fetch upstream

* Install Node.js
 Follow the instructions here http://howtonode.org/how-to-install-nodejs
 If you have OSX with home brew installed you can install node with the following command:

    $ brew install node

* Configure Node.js

    $ npm install

Setting up Testing (Mocha) on your local
------------------------------
mocha - simple, flexible, fun javascript test framework for node.js & the browser. (BDD, TDD, QUnit styles via interfaces) — Read more at http://visionmedia.github.com/mocha

Install with npm:

    $ npm install -g mocha

To start using mocha

    $ mocha -w

Developing a new feature
------------------------
* Pick a feature from the issues page https://github.com/bnowel/NodeWorld/issues or come up with your own new feature.
* Get the latest from upstream before starting your feature

    $ git branch master
    $ git fetch upstream
    $ git merge upstream/master

* Create a new branch to do develop your feature in

    $ git checkout -b fooBarFeature

* Write unit tests for your new feature

    $ vim static/js/fooBar_test.js

* Commit your changes to your branch regularly

    $ git commit -am "wrote unit tests for fooBar feature"

* Develop your feature and get your tests passing

    $ vim static/js/fooBar.js

* Remember to commit your changes to your branch regularly

    $ git commit -am "started fooBar feature"

* Once your feature is tested and working merge any new upstream changes in and resolve any conflicts

    $ git fetch upstream
    $ git merge upstream/master

* If you have any merge confilcts address them

    $ git diff

* push your branch to your github repository

    $ git push origin fooBarFeature

* Perform a pull request
visit github, navigate to your fooBarFeature branch and click on Pull

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

+ http://twitter.com/bnowel
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

Copyright 2012 Bernie Nowel 

Licensed under ... 

  ... 

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

