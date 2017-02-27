#A simple Nutshell dashboard

##Task
Nutshell [https://www.nutshell.com/](https://www.nutshell.com/) is the CRM system that we currently use. We'd like you to show how well you deal with technical integrations and APIs so we would like to see you use Nutshell's API.

The Nutshell API is documented here:

[https://www.nutshell.com/api/](https://www.nutshell.com/api/)
Use these authentication parameters to connect to Nutshell's demo API.

Username: `jim@demo.nutshell.com`

Key: `43c789d483fd76547b1f157e3cf5e580b95b9d8c`

**Develop an integration that does the following:** 

[X] Get the most recent lead.
[X] Get most recent email on that specific lead
[X] List all accounts with at least one lead, list when it has has been last contacted

**Finally, one of the following:**

[ ] A simple dashboard to display the results
[ ] Store the results in a database

##Installation
1. Clone the repo
2. Create a `.env` file in the root directory of the project. Set the two following variables to match your credentials.

   ```
   USERNAME="jim@demo.nutshell.com"
   KEY="43c789d483fd76547b1f157e3cf5e580b95b9d8c"
   ```

3. Run composer install to get PHP dependencies.
4. Clone the _Nutshell API PHP repo_ to the inc folder with `giclone https://github.com/nutshellcrm/nutshell-api-php inc`

###Prerequisites
- [Composer](https://getcomposer.org/)


##Notes
- Missing error handling
- Security
	- Data publiclly availbe
- Running a dashboard with a chromecast
- would clean up data for production
- 