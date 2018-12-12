# Contributing
Here at Cryptanon, we don't have the time to take care of everything ourselves. That's why we're asking the developer community to contribute to our project and help solve our issues. This guide will explain the process that contributers will need to follow in order to submit a successful pull request.

## Setting up your local dev environment

Make sure your brew is up to date on your computer:

Use the terminal for the following:

    $ brew update
    $ brew doctor

Install PostgreSQL globally on your machine

    $ brew install postgresql

## Get the directory

Begin by forking this repo using the `Fork` button in the top-right corner of this screen. You should then be able to use `git clone` to copy your fork onto your local machine.

    $ git clone https://github.com/YOUR_GITHUB_USERNAME_HERE/cryptanon-server

Jump into your new local copy of the Cryptanon Server:

    $ cd cryptanon-server

And then add a new branch

    $ git checkout -b YOUR-BRANCH-NAME

### Get it running locally

Use the terminal for the following:

    $ npm install

Create new database in postgreSQL named 'cryptanon' on local machine

In the terminal enter each of the following commands:

    $ psql

You should be in the psql command line now

    $ CREATE DATABASE cryptanon;

    $ knex migrate:latest

    $ knex seed:run

    $ npm start

### Testing

Create new database in postgreSQL named 'cryptanon-test' on local machine

In the terminal enter each of the following commands:

    $ psql

You should be in the psql command line now

    $ CREATE DATABASE cryptanon;

    $ knex migrate:latest --env test

## Making a change

Make your changes to the codebase. We recommend using TDD. Add a test, make changes and get the test suite back to green.

Once the tests are passing you can commit your changes.

    $ git add .
    $ git commit -m "Add a concise commit message describing your change here"

Push your changes to a branch on your fork:

    $ git push origin YOUR-BRANCH-NAME

## Submitting a Pull Request

Use the GitHub UI to submit a new pull request against upstream/master.

A pull request should include the following:
  * What is this change?
  * What does it fix?
  * Is this a bug fix or a feature? Does it break any existing     functionality or force me to update to a new version?
  * How has it been tested?



TL;DR:
* Write tests
* Make sure the whole test suite is passing
* Keep your PR small, with a single focus
* Maintain a clean commit history
* Use a style consistent with the rest of the codebase


