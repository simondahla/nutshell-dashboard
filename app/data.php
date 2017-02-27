<?php
header('Access-Control-Allow-Origin: http://localhost:9000');

require_once('../vendor/autoload.php');
require_once('../vendor/nutshell-api-php/NutshellApi.php');

$dotenv = new Dotenv\Dotenv(__DIR__ . '/..');
$dotenv->load();

$username = getenv('USERNAME');
$key = getenv('KEY');
$api = new NutshellApi($username, $key);

$limit = 50;

/* Check if responses limit is set or use default. */
if(isset($_GET['limit'])) {
	$limit = $_GET['limit'];
}

/* Get the most recent leads, sorted by when they are created in DESC order */
function getRecentLeads($limit) {
	
	global $api;

	$params = array(
			'query' => array(),
			'orderBy' => 'createdTime',
			'orderDirection' => 'DESC',
			'limit' => $limit,
			'stubResponses' => false
	);
	$result = $api->findLeads($params);
	return $result;
}

/* Get a specific lead */
function getSpecificLead($leadId) {
	global $api;

	$params = array(
		'query' => array(
			"leadId" => $leadId
		),
		'stubResponses' => false
	);
	$result = $api->findContacts($params);

	return $result;

}

/* Get the latest lead */
function getLatestLead() {
	global $api;

	$l = getRecentLeads(1);
	$l = json_decode(json_encode($l), true);
	$latestLeadId = $l[0]['id'];
	/*	$latestLeadId = 1128;*/
	
	$s = getSpecificLead($latestLeadId);
	$a = json_decode(json_encode($s), true);

	return $a;
}

/* Get all accounts with leads */
function getAccountsWithLeads($limit) {
	global $api;

	$params = array(
			'query' => array(),
			'orderBy' => 'name',
			'stubResponses' => false,
			'limit' => $limit
	);

	$results = $api->findAccounts($params);
	$finalArray = array();

	/* Loop through every account */
	foreach ($results as $result) {
		$array = json_decode(json_encode($result), true);
		$noOfLeads = count($array['leads']);

		/* Check if the account has any leads */
		if ($noOfLeads > 0 ) {
			array_push($finalArray, $array);
		}
	}

	return $finalArray;
}




/* Build a master array */
function getAllTheData() {
	global $limit;

	$a = array(
		//'recentLeads' => getRecentLeads(1),
		'latestLead' => getLatestLead(),
		'accountsWithLeads' => getAccountsWithLeads($limit)

	);
	return $a;
}

/* Return requested data as json. */
header('Content-Type: application/json');
echo json_encode(getAllTheData());