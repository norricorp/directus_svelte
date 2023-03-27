export default ({ filter, action }) => {
	console.log("into hook");
	filter('items.query', (input, { collection }, { database, schema, accountability }) => {
		console.log('filter input object for article query is ' + JSON.stringify(input));
	});
};
