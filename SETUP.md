SETUP.md

# Before you start

Things you need before you can start:

* Install node.js (including npm) https://nodejs.org/
* Install Postgres  http://www.postgresql.org/

# Fork the repo

Look over the documentation on [github workflow](/DOCS/GithubWorkflow.md) and then create a fork of the main repo, [ucsb-cs-education/awesome-ui-backend-node-heroku](https://github.com/ucsb-cs-education/awesome-ui-backend-node-heroku).

# Update the node.js modules and selenium driver

Use `cd` to put yourself in the main directory of the repo. You now need to install the necesssary node.js modules on which project awesome depends.  These are cached in a directory called node_modules that is NOT checked into the github repository.   You install these with the command:

```
npm update
```

After doing this, you also need to update the Selenium jar separately, with this command:

```
./node_modules/protractor/bin/webdriver-manager update 
```

# Create a setupPrivateEnv.sh file

The file `setupPrivateEnv.sh` is listed in the `.gitignore` file.    This file is NOT checked into the github repo, because it will contain private information---the keys needed to interact with Facebook and Google authentication, as well as Sauce Labs and Travis CI.

The contents of this file are a series of environment variables, as shown below.  Get the correct values from someone involved in the project (these are not stored in the public repo).  (TODO: write some documentation on how someone not directly connected with the project could set up their own implementation by interacting with Facebook, Google, and Sauce in the way that our project team did to obtain these values.)

```
export DATABASE_URL="postgres://$USER@localhost/postgres"
export SESSION_SECRET="xxxxxxx"
export FACEBOOK_APP_ID="xxxxxxx"
export FACEBOOK_APP_SECRET="xxxxxxxx"
export FACEBOOK_CALLBACK_URL="http://localhost:5000/auth/facebook/callback"
export FACEBOOK_TEST_EMAIL="someone@example.org"
export FACEBOOK_TEST_PASSWORD="xxxxxxxx"
export GOOGLE_APP_ID="xxxxxxxx.apps.googleusercontent.com"
export GOOGLE_APP_SECRET="xxxxxxxx"
export GOOGLE_CALLBACK_URL="http://localhost:5000/auth/google/callback"
export GOOGLE_TEST_EMAIL="someone@example.org"
export GOOGLE_TEST_PASSWORD="xxxxxxxx"
```

Put this file in the top level of your github repo so that the .gitignore will properly ignore it.  Then, anytime you want to run project awesome code locally, first add these environment variables to your shell by typing:

```
. ./setupPrivateEnv.sh
```

# Did it work?

Try typing:

```
npm test
```

You should see test cases passing.  If you don't, something is wrong.


