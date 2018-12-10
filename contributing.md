# Contributing
Here at Cryptanon, we don't have the time to take care of everything ourselves. That's why we're asking the developer community to contribut to our project and help solve our issues. This guide will explain the process that contributers will need to follow in order to submit a successful pull request.

## Setting up your local dev environment


### Get it

Begin by forking this repo using the `Fork` button in the top-right corner of this screen. You should then be able to use `git clone` to copy your fork onto your local machine.

    git clone https://github.com/YOUR_GITHUB_USERNAME_HERE/cryptanon-server

Jump into your new local copy of the Open Food Network:

    cd openfoodnetwork

And then add an `upstream` remote that points to the main repo:

    git remote add upstream https://github.com/aweissman11/cryptanon-server

Fetch the latest version of `master` from `upstream` (ie. the main repo):

    git fetch upstream master


This guide assumes that the git remote name of the main repo is `upstream` and that your fork is named `origin`.

Create a new branch on your local machine to make your changes against (based on `upstream/master`):

    git checkout -b branch-name-here --no-track upstream/master

### Get it running locally

Use the terminal for the following:

1. Install PostgreSQL globally on your machine if it is not already installed
2. NPM install
3. Create new database named 'cryptanon' on local machine
4. knex migrate:latest
5. knex seed:run
6. npm start

### Testing

1. Create new database named 'cryptanon_test' on local machine
2. knex migrate:latest --env test

## Making a change

Make your changes to the codebase. We recommend using TDD. Add a test, make changes and get the test suite back to green.

Once the tests are passing you can commit your changes.

    git add .
    git commit -m "Add a concise commit message describing your change here"

Push your changes to a branch on your fork:

    git push origin branch-name-here

## Submitting a Pull Request

Use the GitHub UI to submit a new pull request against upstream/master. 

TL;DR:
* Write tests
* Make sure the whole test suite is passing
* Keep your PR small, with a single focus
* Maintain a clean commit history
* Use a style consistent with the rest of the codebase


