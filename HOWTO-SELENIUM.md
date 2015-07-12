# Setting up Selenium

[Selenium](http://www.seleniumhq.org) is a portable software testing framework for web applications. We will be using the Selenium WebDriver and Selenium Server to run automated tests. [Protractor](https://github.com/angular/protractor).

### Setting up locally

To set up a local standalone Selenium Server, you will need to have the [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed. Check this by running `java -version` from the command line.

Install Protractor globally with:
```
npm install -g protractor
```
Or if you get an 'EACCES' error try:
```
sudo npm install -g protractor
```
Run:
```
webdriver-manager update
```
Now start up a server with:
```
webdriver-manager start
```
Again, try using `sudo` if you get a permission error.

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at `http://localhost:4444/wd/hub` .

More details can be found [here](http://angular.github.io/protractor/#/tutorial).

### Creating a Sauce Labs account

To run automated tests that use a Selenium Server on Travis CI or Heroku you need use Sauce Labs' Selenium Server.

Start by [creating an Open Sauce account](https://saucelabs.com/signup). Make sure to select the Open Sauce plan, and to provide the name of your repository that you will be working on.

Then get your access key from your [account page](https://saucelabs.com/account).

Travis CI needs to know your Sauce Labs username and access key. On [the Travis CI website](https://travis-ci.org) you should set the following environment variables:
* SAUCE_USERNAME
* SAUCE_ACCESS_KEY

More details on how to set Travis CI environment variables [here](/HOWTO-TRAVIS-CI.md).

















