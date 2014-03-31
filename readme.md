# Fungi Falls
A mobile friendly browser game demo

Play the game at [labs.autumnrain.co.uk/fungifalls](http://labs.autumnrain.co.uk/fungifalls)

All frontend stuff (CSS, JS etc.) is managed using Bower for package management and Grunt for building/compiling - LIKE A BOSS.

## Initial Setup

### 1) Install Node.js, Bower & Grunt-CLI to your machine

Skip to step 2 if these are already installed on your system and you just need to get frontend dev setup.

#### Install Node.js

Go to [http://nodejs.org](http://nodejs.org) and follow the instructions.

#### Install Bower

Bower depends on Node and npm. Install it globally using npm:

    npm install -g bower

Note: Make sure to run as sudo if using *nix.
Also make sure that git is installed as some bower packages require it to be fetched and installed.

#### Install Grunt CLI

In order to get started, you'll want to install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

    npm install -g grunt-cli

### 2) Setup the local project

To get everything working, we'll need to setup Grunt and get the latest packages.

First, cd to root directory

    cd {project_folder}

To Install Grunt:

    npm install

Update 3rd party vendor frameworks using Bower.

    bower update

This will pull down the latest files of a particular version of Bootstrap etc. e.g it will get 2.0.4, Not 3.2.4.

### 3) PROFIT

## Usage

### COMPILE ALL THE THINGS!

Compile all frontend assets, ready for production use. Run this every-time before pushing to production server.

    grunt

This will

* Compile & minify JS
* Cache bust links to static assets
* Move all the above & any stand-alone scripts to /public_html/build