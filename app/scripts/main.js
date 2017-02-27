/* global Handlebars, md5, moment */
var isLocalhost = Boolean(
		window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(
		/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
	)
);

//Helper function to render HTML blocks
function render(sourceId, context, target) {
	'use static';
	
	var source = $(sourceId).html(),
		template = Handlebars.compile(source),
		HTML = template(context);

	$(target).html(HTML);

}
//fetching data from API wrapper
function fetch() {
	'use static';
	
	$('#loading').show();

	var requestURL = 'data.php';

	if (isLocalhost) {
		requestURL = '//localhost:8080/data.php';
	}

	var jqxhr = $.ajax(requestURL);
	//console.log('Fetching data...');

	jqxhr.done(function(data) {
		var ll = data.latestLead[0],
			al = data.accountsWithLeads;

		//Save objects to localstorage
		save('latestLead', ll);
		save('accountsWithLeads', al);
		save('lastUpdated', new Date());
		
		//console.info('Data fetched and saved to localstorage.');
		
		finish();
	});

}

//Helper function: Saving object as a JSON in localstorage
function save(name, obj) {
	'use static';
	
	// Put the object into storage
	localStorage.setItem(name, JSON.stringify(obj));

}

//Helper function: loding JSON from localstorage and converting it to an object
function load(name) {
	'use static';
	
	// Retrieve the object from storage
	var retrievedObject = localStorage.getItem(name);
	retrievedObject = JSON.parse(retrievedObject);

	return retrievedObject;
}

function finish() {
	'use static';
	//render HTML blocks
	render('#lead-template', load('latestLead'), '#lead-target');
	render('#account-template', load('accountsWithLeads'), '#account-target');

	//Get image of the latest lead from gravatar
	$('img[data-email]').each(function(index, el) {
		var email = $(el).attr('data-email');
		$(el).attr('src', 'https://www.gravatar.com/avatar/' + md5(email) + '?d=mm');
	});

	//Show "XX days ago" instead of timestamps
	$('time').each(function(index, el) {
		var timestamp = $(el).attr('datetime');
		timestamp = moment(timestamp).fromNow();
		
		$(el).text(timestamp);
	});
	
	$('#loading').hide();
	$('#main').show();

	//console.info('Finished rendering.');
}

function init() {
	'use static';

	//See if elements contains HTML
	var at = $('#account-target').html().trim().length,
		lt = $('#lead-target').html().trim().length;

	//Load data from localstorage
	var latestLead = load('latestLead'),
		accountsWithLeads = load('accountsWithLeads'),
		lastUpdated = load('lastUpdated'),
		now = moment();

	if(latestLead === null || accountsWithLeads === null|| lastUpdated === null) {
		//If there is no local chache
		//console.info('No localstorage data found');
		fetch();
	} else if (now.diff(moment(load('lastUpdated')), 'minutes') >= 5) {
		//If the data is more than 5 minutes old
		//console.info('Localstorage data is not up to date.');
		fetch();
	} else if (at === 0 || lt === 0) {
		//If data is up to date but not has been rendered
		//console.info('Localstorage data up to date.');
		finish();
	} else {
		//console.info('No action needed.');
	}

}

//Auto update dashboard every 5 minutes
setInterval(function(){ 
	init();
}, 50000);

//Initalize dashboard
init();