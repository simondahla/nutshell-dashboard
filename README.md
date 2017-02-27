#A simple Nutshell dashboard

## Live preview

[Available here](https://nutshell-dashboard.simondah.la/)

##Task

Nutshell [https://www.nutshell.com/](https://www.nutshell.com/) is the CRM system that we currently use. We'd like you to show how well you deal with technical integrations and APIs so we would like to see you use Nutshell's API.

The Nutshell API is documented here:

[https://www.nutshell.com/api/](https://www.nutshell.com/api/)
Use these authentication parameters to connect to Nutshell's demo API.

Username: `jim@demo.nutshell.com`

Key: `43c789d483fd76547b1f157e3cf5e580b95b9d8c`

**Develop an integration that does the following:** 

- [x] [Get the most recent lead](https://github.com/simondahla/nutshell-dashboard/blob/master/app/data.php#L54).
- [x] [Get most recent email on that specific lead](https://github.com/simondahla/nutshell-dashboard/blob/master/app/data.php#L54)
- [x] [List all accounts with at least one lead, list when it has has been last contacted](https://github.com/simondahla/nutshell-dashboard/blob/master/app/data.php#L69)

**Finally, one of the following:**

- [x] A simple dashboard to display the results

- [ ] Store the results in a database

##Installation

###Prerequisites
- [Composer](https://getcomposer.org/)
- [Gulp](http://gulpjs.com/)
- [NPM](https://www.npmjs.com/)
- [Bower](https://bower.io/)
- PHP

###Install dev locally
1. Clone the repo

2. Create a `.env` file in the root directory of the project. Set the two following variables to match your credentials.

   ```
   USERNAME="jim@demo.nutshell.com"
   KEY="43c789d483fd76547b1f157e3cf5e580b95b9d8c"
   ```

3. Run `composer install` to get PHP dependencies

4. Run `npm install && bower install` to install front-end dependencies


### Running locally

1. In the project directory run `cd app && php -S localhost:8080` to start back-end part
2. In the root of the project directory run `gulp serve` to run front-end

##Notes
- Back-end part is serving all data on purpose so it can be used in other projects or in other purposes as well
- Asumes that you cast the URL to a chromecast
- Only quering the first 100 accounts, default value can be changed [here](https://github.com/simondahla/nutshell-dashboard/blob/master/app/data.php#L14) or by passing a query parameter with the request `?limit=500`
- The data is cached in _localstorage_ & auto updates every 5 minutes

##2do
- [ ] Add back-end error handling
- [ ] Add JS error handling
- [ ] Add notifications so the user gets notified when the dashboard is auto-updated and when there is new data
- [ ] Add Security layer so the dashboard is not available with out a secret/key
- [ ] Clean up the data that is served (from back-end) and stored in front-end
