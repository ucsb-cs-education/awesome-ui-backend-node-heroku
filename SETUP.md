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

