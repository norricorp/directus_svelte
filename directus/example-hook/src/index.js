import { createError } from '@directus/errors';


const InvalidPayloadException = createError('ELSEWHERE_SOURCE', 
											'This has come from elsewhere');

export default ({ filter, action }) => {

	filter('users.create', (input, { collection }, { database, schema, accountability }) => {
		console.log('filter input object for user create is ' + JSON.stringify(input));
//		console.log('collection object is ' + JSON.stringify(collection));
//		console.log('database object is ' + JSON.stringify(database));
//		console.log('schema object is ' + JSON.stringify(schema));
//		console.log('accountability object is ' + JSON.stringify(accountability));

		if (!accountability || (accountability.admin && accountability.app)) {
			console.log("This has come from directus app");
            return input;
		}

		if (input.fred) {
			console.log("This has come from SVELTE");
		}
		else {
			console.log("This has come from elsewhere");
			throw new InvalidPayloadException();
		}

		delete input.fred;
		return input;

	});

	filter('notifications.create', (input, { collection }, { database, schema, accountability }) => {
		console.log('filter input object for notification create is ' + JSON.stringify(input));
		
		if (!accountability || (accountability.admin && accountability.app)) {
			console.log("This has come from directus app");
			return input;
		}

		if (input.subject.includes(" requires approval of Registration")) {
			console.log("This has come from SVELTE");
		}
		else {
			console.log("This has come from elsewhere");
			throw new InvalidPayloadException();
		}

		return input;
	});

/* 	filter('articles.items.read', (input, { collection }, { database, schema, accountability }) => {
		console.log('filter input object for article read is ' + JSON.stringify(input));
		console.log('accountability object is ' + JSON.stringify(accountability));

		if (!accountability || (accountability.admin && accountability.app)) {
			console.log("This has come from directus app");
			return input;
		} */

/* 		if (input.subject.includes(" requires approval of Registration")) {
			console.log("This has come from SVELTE");
		}
		else {
			console.log("This has come from elsewhere");
			const arrByMem = input.filter(filterByMember);
			console.log('action input object for article read after filter is ' + JSON.stringify(arrByMem));
			return arrByMem;
		}
 */



//	});

	filter('articles.items.query', (input, { collection }, { database, schema, accountability }) => {
		console.log('filter input object for article query is ' + JSON.stringify(input));

		if (!accountability || (accountability.admin && accountability.app)) {
			console.log("This has come from directus app");
			return input;
		} 

 		if (input.fields.includes("fred")) {
			console.log("This has come from SVELTE " + JSON.stringify(input.fields));
//			console.log("And is it an array? " + Array.isArray(input.fields));
			input.fields.pop();
		}
		else {
			console.log("This has come from elsewhere");
			input.filter.membersOnly = false;
		}

		console.log('filter input object for article query after processing is ' + JSON.stringify(input));

	});






	
	action('users.create', ({ payload }, { schema, accountability }) => {
		console.log('action payload object for users create is ' + JSON.stringify(payload));
	//	console.log('schema object is ' + JSON.stringify(schema));
	//	console.log('accountability object is ' + JSON.stringify(accountability));		
	});
/* 
	action('articles.items.read', ({ payload }, { schema, accountability }) => {
		console.log('action payload object for article read is ' + JSON.stringify(payload));
	});
 */
	
	function filterByMember(item) {
		if (item.membersOnly) {
		  return false;
		}
		return true;
	  }




};

// This stops (from windows)
// curl -X POST -H "Content-Type: application/json" -d "{\"first_name\":\"Dave\",\"last_name\":\"Bloggs\",
// \"password\":\"12345678\",\"email\":\"daveb@email.com\"}" http://localhost:8055/users


/*

filter input object is 
{
	"first_name": "aaaaa",
	"last_name": "bbbbb",
	"password": "12345678",
	"email": "ab2@email.com",
	"status": "Invited"
}

collection object is "directus_users"

database object is undefined

schema object is 
{
	"collections": {
		"directus_migrations": {
			"collection": "directus_migrations",
			"primary": "version",
			"singleton": false,
			"note": "$t:directus_collection.directus_migrations",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"version": {
					"field": "version",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"timestamp": {
					"field": "timestamp",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_folders": {
			"collection": "directus_folders",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_folders",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"parent": {
					"field": "parent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_relations": {
			"collection": "directus_relations",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_relations",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"many_collection": {
					"field": "many_collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"many_field": {
					"field": "many_field",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_collection": {
					"field": "one_collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_field": {
					"field": "one_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_collection_field": {
					"field": "one_collection_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_allowed_collections": {
					"field": "one_allowed_collections",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"junction_field": {
					"field": "junction_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort_field": {
					"field": "sort_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_deselect_action": {
					"field": "one_deselect_action",
					"defaultValue": "nullify",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_revisions": {
			"collection": "directus_revisions",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_revisions",
			"sortField": null,
			"accountability": null,
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"activity": {
					"field": "activity",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"data": {
					"field": "data",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"delta": {
					"field": "delta",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"parent": {
					"field": "parent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_dashboards": {
			"collection": "directus_dashboards",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_dashboards",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": "dashboard",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"panels": {
					"field": "panels",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"directus_files": {
			"collection": "directus_files",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_files",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage": {
					"field": "storage",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filename_disk": {
					"field": "filename_disk",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filename_download": {
					"field": "filename_download",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"title": {
					"field": "title",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"type": {
					"field": "type",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"folder": {
					"field": "folder",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"uploaded_by": {
					"field": "uploaded_by",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"uploaded_on": {
					"field": "uploaded_on",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": false,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"modified_by": {
					"field": "modified_by",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-updated"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"modified_on": {
					"field": "modified_on",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": false,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-updated"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"charset": {
					"field": "charset",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filesize": {
					"field": "filesize",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "bigInteger",
					"dbType": "bigint",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"width": {
					"field": "width",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"height": {
					"field": "height",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"duration": {
					"field": "duration",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"embed": {
					"field": "embed",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"location": {
					"field": "location",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"tags": {
					"field": "tags",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"metadata": {
					"field": "metadata",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_permissions": {
			"collection": "directus_permissions",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_permissions",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"action": {
					"field": "action",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"permissions": {
					"field": "permissions",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"validation": {
					"field": "validation",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"presets": {
					"field": "presets",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"fields": {
					"field": "fields",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_webhooks": {
			"collection": "directus_webhooks",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_webhooks",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"method": {
					"field": "method",
					"defaultValue": "POST",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"url": {
					"field": "url",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "active",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"data": {
					"field": "data",
					"defaultValue": true,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"actions": {
					"field": "actions",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "csv",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collections": {
					"field": "collections",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "csv",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"headers": {
					"field": "headers",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_collections": {
			"collection": "directus_collections",
			"primary": "collection",
			"singleton": false,
			"note": "$t:directus_collection.directus_collections",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"display_template": {
					"field": "display_template",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"hidden": {
					"field": "hidden",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"singleton": {
					"field": "singleton",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"translations": {
					"field": "translations",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"archive_field": {
					"field": "archive_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"archive_app_filter": {
					"field": "archive_app_filter",
					"defaultValue": true,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"archive_value": {
					"field": "archive_value",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"unarchive_value": {
					"field": "unarchive_value",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort_field": {
					"field": "sort_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"accountability": {
					"field": "accountability",
					"defaultValue": "all",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item_duplication_fields": {
					"field": "item_duplication_fields",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort": {
					"field": "sort",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"group": {
					"field": "group",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collapse": {
					"field": "collapse",
					"defaultValue": "open",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_fields": {
			"collection": "directus_fields",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_fields",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"field": {
					"field": "field",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"special": {
					"field": "special",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"interface": {
					"field": "interface",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"display": {
					"field": "display",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"display_options": {
					"field": "display_options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"readonly": {
					"field": "readonly",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"hidden": {
					"field": "hidden",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort": {
					"field": "sort",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"width": {
					"field": "width",
					"defaultValue": "full",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"translations": {
					"field": "translations",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"conditions": {
					"field": "conditions",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"required": {
					"field": "required",
					"defaultValue": false,
					"nullable": true,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"group": {
					"field": "group",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"validation": {
					"field": "validation",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"validation_message": {
					"field": "validation_message",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_presets": {
			"collection": "directus_presets",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_presets",
			"sortField": null,
			"accountability": null,
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"bookmark": {
					"field": "bookmark",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user": {
					"field": "user",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"search": {
					"field": "search",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"layout": {
					"field": "layout",
					"defaultValue": "tabular",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"layout_query": {
					"field": "layout_query",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"layout_options": {
					"field": "layout_options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"refresh_interval": {
					"field": "refresh_interval",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filter": {
					"field": "filter",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": "bookmark_outline",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_roles": {
			"collection": "directus_roles",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_roles",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": "supervised_user_circle",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"ip_access": {
					"field": "ip_access",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"enforce_tfa": {
					"field": "enforce_tfa",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"admin_access": {
					"field": "admin_access",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"app_access": {
					"field": "app_access",
					"defaultValue": true,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"users": {
					"field": "users",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"directus_shares": {
			"collection": "directus_shares",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_shares",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"password": {
					"field": "password",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "hash",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"hash",
						"conceal"
					],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_start": {
					"field": "date_start",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				},
				"date_end": {
					"field": "date_end",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				},
				"times_used": {
					"field": "times_used",
					"defaultValue": 0,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"max_uses": {
					"field": "max_uses",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_sessions": {
			"collection": "directus_sessions",
			"primary": "token",
			"singleton": false,
			"note": "$t:directus_collection.directus_sessions",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"token": {
					"field": "token",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user": {
					"field": "user",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"expires": {
					"field": "expires",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"ip": {
					"field": "ip",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_agent": {
					"field": "user_agent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"share": {
					"field": "share",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_settings": {
			"collection": "directus_settings",
			"primary": "id",
			"singleton": true,
			"note": "$t:directus_collection.directus_settings",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_name": {
					"field": "project_name",
					"defaultValue": "Directus",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_url": {
					"field": "project_url",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_color": {
					"field": "project_color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:field_options.directus_settings.project_color_note",
					"alias": false,
					"validation": null
				},
				"project_logo": {
					"field": "project_logo",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:field_options.directus_settings.project_logo_note",
					"alias": false,
					"validation": null
				},
				"public_foreground": {
					"field": "public_foreground",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"public_background": {
					"field": "public_background",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"public_note": {
					"field": "public_note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"auth_login_attempts": {
					"field": "auth_login_attempts",
					"defaultValue": 25,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"auth_password_policy": {
					"field": "auth_password_policy",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage_asset_transform": {
					"field": "storage_asset_transform",
					"defaultValue": "all",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage_asset_presets": {
					"field": "storage_asset_presets",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"custom_css": {
					"field": "custom_css",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage_default_folder": {
					"field": "storage_default_folder",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:interfaces.system-folder.field_hint",
					"alias": false,
					"validation": null
				},
				"basemaps": {
					"field": "basemaps",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"mapbox_key": {
					"field": "mapbox_key",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"module_bar": {
					"field": "module_bar",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_descriptor": {
					"field": "project_descriptor",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"translation_strings": {
					"field": "translation_strings",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"default_language": {
					"field": "default_language",
					"defaultValue": "en-US",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"custom_aspect_ratios": {
					"field": "custom_aspect_ratios",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_users": {
			"collection": "directus_users",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_users",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"first_name": {
					"field": "first_name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"last_name": {
					"field": "last_name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"email": {
					"field": "email",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"password": {
					"field": "password",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "hash",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"hash",
						"conceal"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"location": {
					"field": "location",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"title": {
					"field": "title",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"tags": {
					"field": "tags",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"avatar": {
					"field": "avatar",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"language": {
					"field": "language",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"theme": {
					"field": "theme",
					"defaultValue": "auto",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"tfa_secret": {
					"field": "tfa_secret",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"conceal"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "active",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"token": {
					"field": "token",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"conceal"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"last_access": {
					"field": "last_access",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"last_page": {
					"field": "last_page",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"provider": {
					"field": "provider",
					"defaultValue": "default",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"external_identifier": {
					"field": "external_identifier",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"auth_data": {
					"field": "auth_data",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"email_notifications": {
					"field": "email_notifications",
					"defaultValue": true,
					"nullable": true,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_panels": {
			"collection": "directus_panels",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_panels",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"dashboard": {
					"field": "dashboard",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"show_header": {
					"field": "show_header",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"type": {
					"field": "type",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_x": {
					"field": "position_x",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_y": {
					"field": "position_y",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"width": {
					"field": "width",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"height": {
					"field": "height",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_flows": {
			"collection": "directus_flows",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_flows",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "active",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"trigger": {
					"field": "trigger",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"accountability": {
					"field": "accountability",
					"defaultValue": "all",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"operation": {
					"field": "operation",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"operations": {
					"field": "operations",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"directus_operations": {
			"collection": "directus_operations",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_operations",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"key": {
					"field": "key",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"type": {
					"field": "type",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_x": {
					"field": "position_x",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_y": {
					"field": "position_y",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"resolve": {
					"field": "resolve",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"reject": {
					"field": "reject",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"flow": {
					"field": "flow",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_activity": {
			"collection": "directus_activity",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_activity",
			"sortField": null,
			"accountability": null,
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"action": {
					"field": "action",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user": {
					"field": "user",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"timestamp": {
					"field": "timestamp",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": false,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"ip": {
					"field": "ip",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_agent": {
					"field": "user_agent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"comment": {
					"field": "comment",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"revisions": {
					"field": "revisions",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"articles": {
			"collection": "articles",
			"primary": "id",
			"singleton": false,
			"note": null,
			"sortField": "sort",
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "draft",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort": {
					"field": "sort",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_updated": {
					"field": "date_updated",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-updated"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"title": {
					"field": "title",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"cover_image": {
					"field": "cover_image",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"file"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"author": {
					"field": "author",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"excerpt": {
					"field": "excerpt",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"body": {
					"field": "body",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"publish_date": {
					"field": "publish_date",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"membersOnly": {
					"field": "membersOnly",
					"defaultValue": false,
					"nullable": true,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_notifications": {
			"collection": "directus_notifications",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_notifications",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"timestamp": {
					"field": "timestamp",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "inbox",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"recipient": {
					"field": "recipient",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sender": {
					"field": "sender",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"subject": {
					"field": "subject",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"message": {
					"field": "message",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		}
	},
	"relations": [
		{
			"collection": "directus_folders",
			"field": "parent",
			"related_collection": "directus_folders",
			"schema": {
				"table": "directus_folders",
				"column": "parent",
				"foreign_key_table": "directus_folders",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_folders",
				"many_field": "parent",
				"one_collection": "directus_folders",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_revisions",
			"field": "activity",
			"related_collection": "directus_activity",
			"schema": {
				"table": "directus_revisions",
				"column": "activity",
				"foreign_key_table": "directus_activity",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_revisions",
				"many_field": "activity",
				"one_collection": "directus_activity",
				"one_field": "revisions",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_revisions",
			"field": "parent",
			"related_collection": "directus_revisions",
			"schema": {
				"table": "directus_revisions",
				"column": "parent",
				"foreign_key_table": "directus_revisions",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_revisions",
				"many_field": "parent",
				"one_collection": "directus_revisions",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_dashboards",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_dashboards",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_dashboards",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_files",
			"field": "folder",
			"related_collection": "directus_folders",
			"schema": {
				"table": "directus_files",
				"column": "folder",
				"foreign_key_table": "directus_folders",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_files",
				"many_field": "folder",
				"one_collection": "directus_folders",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_files",
			"field": "modified_by",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_files",
				"column": "modified_by",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_files",
				"many_field": "modified_by",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_files",
			"field": "uploaded_by",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_files",
				"column": "uploaded_by",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_files",
				"many_field": "uploaded_by",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_permissions",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_permissions",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_permissions",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_collections",
			"field": "group",
			"related_collection": "directus_collections",
			"schema": {
				"table": "directus_collections",
				"column": "group",
				"foreign_key_table": "directus_collections",
				"foreign_key_column": "collection",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_collections",
				"many_field": "group",
				"one_collection": "directus_collections",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_presets",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_presets",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_presets",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_presets",
			"field": "user",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_presets",
				"column": "user",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_presets",
				"many_field": "user",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_shares",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_shares",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_shares",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_shares",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_shares",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_shares",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_shares",
			"field": "collection",
			"related_collection": "directus_collections",
			"schema": {
				"table": "directus_shares",
				"column": "collection",
				"foreign_key_table": "directus_collections",
				"foreign_key_column": "collection",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_shares",
				"many_field": "collection",
				"one_collection": "directus_collections",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_sessions",
			"field": "share",
			"related_collection": "directus_shares",
			"schema": {
				"table": "directus_sessions",
				"column": "share",
				"foreign_key_table": "directus_shares",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_sessions",
				"many_field": "share",
				"one_collection": "directus_shares",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_sessions",
			"field": "user",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_sessions",
				"column": "user",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_sessions",
				"many_field": "user",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "storage_default_folder",
			"related_collection": "directus_folders",
			"schema": {
				"table": "directus_settings",
				"column": "storage_default_folder",
				"foreign_key_table": "directus_folders",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "storage_default_folder",
				"one_collection": "directus_folders",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "public_background",
			"related_collection": "directus_files",
			"schema": {
				"table": "directus_settings",
				"column": "public_background",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "public_background",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "public_foreground",
			"related_collection": "directus_files",
			"schema": {
				"table": "directus_settings",
				"column": "public_foreground",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "public_foreground",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "project_logo",
			"related_collection": "directus_files",
			"schema": {
				"table": "directus_settings",
				"column": "project_logo",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "project_logo",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_users",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_users",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_users",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": "users",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_panels",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_panels",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_panels",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_panels",
			"field": "dashboard",
			"related_collection": "directus_dashboards",
			"schema": {
				"table": "directus_panels",
				"column": "dashboard",
				"foreign_key_table": "directus_dashboards",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_panels",
				"many_field": "dashboard",
				"one_collection": "directus_dashboards",
				"one_field": "panels",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_flows",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_flows",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_flows",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_operations",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "flow",
			"related_collection": "directus_flows",
			"schema": {
				"table": "directus_operations",
				"column": "flow",
				"foreign_key_table": "directus_flows",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "flow",
				"one_collection": "directus_flows",
				"one_field": "operations",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "delete",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "reject",
			"related_collection": "directus_operations",
			"schema": {
				"table": "directus_operations",
				"column": "reject",
				"foreign_key_table": "directus_operations",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "reject",
				"one_collection": "directus_operations",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "resolve",
			"related_collection": "directus_operations",
			"schema": {
				"table": "directus_operations",
				"column": "resolve",
				"foreign_key_table": "directus_operations",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "resolve",
				"one_collection": "directus_operations",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "articles",
			"field": "author",
			"related_collection": "directus_users",
			"schema": {
				"table": "articles",
				"column": "author",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"id": 2,
				"many_collection": "articles",
				"many_field": "author",
				"one_collection": "directus_users",
				"one_field": null,
				"one_collection_field": null,
				"one_allowed_collections": null,
				"junction_field": null,
				"sort_field": null,
				"one_deselect_action": "nullify"
			}
		},
		{
			"collection": "articles",
			"field": "cover_image",
			"related_collection": "directus_files",
			"schema": {
				"table": "articles",
				"column": "cover_image",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"id": 1,
				"many_collection": "articles",
				"many_field": "cover_image",
				"one_collection": "directus_files",
				"one_field": null,
				"one_collection_field": null,
				"one_allowed_collections": null,
				"junction_field": null,
				"sort_field": null,
				"one_deselect_action": "nullify"
			}
		},
		{
			"collection": "directus_notifications",
			"field": "sender",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_notifications",
				"column": "sender",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_notifications",
				"many_field": "sender",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_notifications",
			"field": "recipient",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_notifications",
				"column": "recipient",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_notifications",
				"many_field": "recipient",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_users",
			"field": "avatar",
			"related_collection": "directus_files",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_users",
				"many_field": "avatar",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_fields",
			"field": "collection",
			"related_collection": "directus_collections",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_fields",
				"many_field": "collection",
				"one_collection": "directus_collections",
				"one_field": "fields",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_activity",
			"field": "user",
			"related_collection": "directus_users",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_activity",
				"many_field": "user",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_flows",
			"field": "operation",
			"related_collection": "directus_operations",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_flows",
				"many_field": "operation",
				"one_collection": "directus_operations",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_fields",
			"field": "group",
			"related_collection": "directus_fields",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_fields",
				"many_field": "group",
				"one_collection": "directus_fields",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		}
	]
}

accountability object is 
{
	"user": null,
	"role": null,
	"admin": false,
	"app": false,
	"ip": "127.0.0.1",
	"userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
	"permissions": [
		{
			"id": 1,
			"role": null,
			"collection": "directus_files",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 2,
			"role": null,
			"collection": "directus_users",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 3,
			"role": null,
			"collection": "articles",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 30,
			"role": null,
			"collection": "directus_users",
			"action": "create",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 31,
			"role": null,
			"collection": "directus_notifications",
			"action": "create",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 32,
			"role": null,
			"collection": "directus_notifications",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		}
	]
}


action payload object is 
{
	"first_name": "aaaaa",
	"last_name": "bbbbb",
	"password": "12345678",
	"email": "ab2@email.com",
	"status": "Invited"
}
schema object is 
{
	"collections": {
		"directus_migrations": {
			"collection": "directus_migrations",
			"primary": "version",
			"singleton": false,
			"note": "$t:directus_collection.directus_migrations",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"version": {
					"field": "version",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"timestamp": {
					"field": "timestamp",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_folders": {
			"collection": "directus_folders",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_folders",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"parent": {
					"field": "parent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_relations": {
			"collection": "directus_relations",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_relations",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"many_collection": {
					"field": "many_collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"many_field": {
					"field": "many_field",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_collection": {
					"field": "one_collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_field": {
					"field": "one_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_collection_field": {
					"field": "one_collection_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_allowed_collections": {
					"field": "one_allowed_collections",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"junction_field": {
					"field": "junction_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort_field": {
					"field": "sort_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"one_deselect_action": {
					"field": "one_deselect_action",
					"defaultValue": "nullify",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_revisions": {
			"collection": "directus_revisions",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_revisions",
			"sortField": null,
			"accountability": null,
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"activity": {
					"field": "activity",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"data": {
					"field": "data",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"delta": {
					"field": "delta",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"parent": {
					"field": "parent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_dashboards": {
			"collection": "directus_dashboards",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_dashboards",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": "dashboard",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"panels": {
					"field": "panels",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"directus_files": {
			"collection": "directus_files",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_files",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage": {
					"field": "storage",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filename_disk": {
					"field": "filename_disk",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filename_download": {
					"field": "filename_download",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"title": {
					"field": "title",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"type": {
					"field": "type",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"folder": {
					"field": "folder",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"uploaded_by": {
					"field": "uploaded_by",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"uploaded_on": {
					"field": "uploaded_on",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": false,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"modified_by": {
					"field": "modified_by",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-updated"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"modified_on": {
					"field": "modified_on",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": false,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-updated"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"charset": {
					"field": "charset",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filesize": {
					"field": "filesize",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "bigInteger",
					"dbType": "bigint",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"width": {
					"field": "width",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"height": {
					"field": "height",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"duration": {
					"field": "duration",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"embed": {
					"field": "embed",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"location": {
					"field": "location",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"tags": {
					"field": "tags",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"metadata": {
					"field": "metadata",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_permissions": {
			"collection": "directus_permissions",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_permissions",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"action": {
					"field": "action",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"permissions": {
					"field": "permissions",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"validation": {
					"field": "validation",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"presets": {
					"field": "presets",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"fields": {
					"field": "fields",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_webhooks": {
			"collection": "directus_webhooks",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_webhooks",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"method": {
					"field": "method",
					"defaultValue": "POST",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"url": {
					"field": "url",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "active",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"data": {
					"field": "data",
					"defaultValue": true,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"actions": {
					"field": "actions",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "csv",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collections": {
					"field": "collections",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "csv",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"headers": {
					"field": "headers",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_collections": {
			"collection": "directus_collections",
			"primary": "collection",
			"singleton": false,
			"note": "$t:directus_collection.directus_collections",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"display_template": {
					"field": "display_template",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"hidden": {
					"field": "hidden",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"singleton": {
					"field": "singleton",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"translations": {
					"field": "translations",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"archive_field": {
					"field": "archive_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"archive_app_filter": {
					"field": "archive_app_filter",
					"defaultValue": true,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"archive_value": {
					"field": "archive_value",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"unarchive_value": {
					"field": "unarchive_value",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort_field": {
					"field": "sort_field",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"accountability": {
					"field": "accountability",
					"defaultValue": "all",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item_duplication_fields": {
					"field": "item_duplication_fields",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort": {
					"field": "sort",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"group": {
					"field": "group",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collapse": {
					"field": "collapse",
					"defaultValue": "open",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_fields": {
			"collection": "directus_fields",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_fields",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"field": {
					"field": "field",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"special": {
					"field": "special",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"interface": {
					"field": "interface",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"display": {
					"field": "display",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"display_options": {
					"field": "display_options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"readonly": {
					"field": "readonly",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"hidden": {
					"field": "hidden",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort": {
					"field": "sort",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"width": {
					"field": "width",
					"defaultValue": "full",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"translations": {
					"field": "translations",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"conditions": {
					"field": "conditions",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"required": {
					"field": "required",
					"defaultValue": false,
					"nullable": true,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"group": {
					"field": "group",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"validation": {
					"field": "validation",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"validation_message": {
					"field": "validation_message",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_presets": {
			"collection": "directus_presets",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_presets",
			"sortField": null,
			"accountability": null,
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"bookmark": {
					"field": "bookmark",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user": {
					"field": "user",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"search": {
					"field": "search",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"layout": {
					"field": "layout",
					"defaultValue": "tabular",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"layout_query": {
					"field": "layout_query",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"layout_options": {
					"field": "layout_options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"refresh_interval": {
					"field": "refresh_interval",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"filter": {
					"field": "filter",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": "bookmark_outline",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_roles": {
			"collection": "directus_roles",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_roles",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": "supervised_user_circle",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"ip_access": {
					"field": "ip_access",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "csv",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [
						"cast-csv"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"enforce_tfa": {
					"field": "enforce_tfa",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"admin_access": {
					"field": "admin_access",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"app_access": {
					"field": "app_access",
					"defaultValue": true,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"users": {
					"field": "users",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"directus_shares": {
			"collection": "directus_shares",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_shares",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"password": {
					"field": "password",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "hash",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"hash",
						"conceal"
					],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_start": {
					"field": "date_start",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				},
				"date_end": {
					"field": "date_end",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				},
				"times_used": {
					"field": "times_used",
					"defaultValue": 0,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"max_uses": {
					"field": "max_uses",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:shared_leave_blank_for_unlimited",
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_sessions": {
			"collection": "directus_sessions",
			"primary": "token",
			"singleton": false,
			"note": "$t:directus_collection.directus_sessions",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"token": {
					"field": "token",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user": {
					"field": "user",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"expires": {
					"field": "expires",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"ip": {
					"field": "ip",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_agent": {
					"field": "user_agent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"share": {
					"field": "share",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_settings": {
			"collection": "directus_settings",
			"primary": "id",
			"singleton": true,
			"note": "$t:directus_collection.directus_settings",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_name": {
					"field": "project_name",
					"defaultValue": "Directus",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_url": {
					"field": "project_url",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_color": {
					"field": "project_color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:field_options.directus_settings.project_color_note",
					"alias": false,
					"validation": null
				},
				"project_logo": {
					"field": "project_logo",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:field_options.directus_settings.project_logo_note",
					"alias": false,
					"validation": null
				},
				"public_foreground": {
					"field": "public_foreground",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"public_background": {
					"field": "public_background",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"public_note": {
					"field": "public_note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"auth_login_attempts": {
					"field": "auth_login_attempts",
					"defaultValue": 25,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"auth_password_policy": {
					"field": "auth_password_policy",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage_asset_transform": {
					"field": "storage_asset_transform",
					"defaultValue": "all",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage_asset_presets": {
					"field": "storage_asset_presets",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"custom_css": {
					"field": "custom_css",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"storage_default_folder": {
					"field": "storage_default_folder",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": "$t:interfaces.system-folder.field_hint",
					"alias": false,
					"validation": null
				},
				"basemaps": {
					"field": "basemaps",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"mapbox_key": {
					"field": "mapbox_key",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"module_bar": {
					"field": "module_bar",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"project_descriptor": {
					"field": "project_descriptor",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"translation_strings": {
					"field": "translation_strings",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"default_language": {
					"field": "default_language",
					"defaultValue": "en-US",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"custom_aspect_ratios": {
					"field": "custom_aspect_ratios",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_users": {
			"collection": "directus_users",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_users",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"first_name": {
					"field": "first_name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"last_name": {
					"field": "last_name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"email": {
					"field": "email",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"password": {
					"field": "password",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "hash",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"hash",
						"conceal"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"location": {
					"field": "location",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"title": {
					"field": "title",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"tags": {
					"field": "tags",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"avatar": {
					"field": "avatar",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"language": {
					"field": "language",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"theme": {
					"field": "theme",
					"defaultValue": "auto",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"tfa_secret": {
					"field": "tfa_secret",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"conceal"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "active",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"role": {
					"field": "role",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"token": {
					"field": "token",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [
						"conceal"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"last_access": {
					"field": "last_access",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"last_page": {
					"field": "last_page",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"provider": {
					"field": "provider",
					"defaultValue": "default",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"external_identifier": {
					"field": "external_identifier",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"auth_data": {
					"field": "auth_data",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"email_notifications": {
					"field": "email_notifications",
					"defaultValue": true,
					"nullable": true,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_panels": {
			"collection": "directus_panels",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_panels",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"dashboard": {
					"field": "dashboard",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"show_header": {
					"field": "show_header",
					"defaultValue": false,
					"nullable": false,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"note": {
					"field": "note",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"type": {
					"field": "type",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_x": {
					"field": "position_x",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_y": {
					"field": "position_y",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"width": {
					"field": "width",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"height": {
					"field": "height",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_flows": {
			"collection": "directus_flows",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_flows",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"icon": {
					"field": "icon",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"color": {
					"field": "color",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"description": {
					"field": "description",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "active",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"trigger": {
					"field": "trigger",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"accountability": {
					"field": "accountability",
					"defaultValue": "all",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"operation": {
					"field": "operation",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"operations": {
					"field": "operations",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"directus_operations": {
			"collection": "directus_operations",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_operations",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"uuid"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"name": {
					"field": "name",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"key": {
					"field": "key",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"type": {
					"field": "type",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_x": {
					"field": "position_x",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"position_y": {
					"field": "position_y",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"options": {
					"field": "options",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "json",
					"dbType": "json",
					"precision": null,
					"scale": null,
					"special": [
						"cast-json"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"resolve": {
					"field": "resolve",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"reject": {
					"field": "reject",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"flow": {
					"field": "flow",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_created": {
					"field": "user_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"user-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_activity": {
			"collection": "directus_activity",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_activity",
			"sortField": null,
			"accountability": null,
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"action": {
					"field": "action",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user": {
					"field": "user",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"timestamp": {
					"field": "timestamp",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": false,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"ip": {
					"field": "ip",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"user_agent": {
					"field": "user_agent",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"comment": {
					"field": "comment",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"revisions": {
					"field": "revisions",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "alias",
					"dbType": null,
					"precision": null,
					"scale": null,
					"special": [
						"o2m"
					],
					"note": null,
					"alias": true,
					"validation": null
				}
			}
		},
		"articles": {
			"collection": "articles",
			"primary": "id",
			"singleton": false,
			"note": null,
			"sortField": "sort",
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "draft",
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sort": {
					"field": "sort",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_created": {
					"field": "date_created",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"date_updated": {
					"field": "date_updated",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-updated"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"title": {
					"field": "title",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"cover_image": {
					"field": "cover_image",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "uuid",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"file"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"author": {
					"field": "author",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [
						"m2o"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"excerpt": {
					"field": "excerpt",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"body": {
					"field": "body",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"publish_date": {
					"field": "publish_date",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "dateTime",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"membersOnly": {
					"field": "membersOnly",
					"defaultValue": false,
					"nullable": true,
					"generated": false,
					"type": "boolean",
					"dbType": "boolean",
					"precision": null,
					"scale": null,
					"special": [
						"cast-boolean"
					],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		},
		"directus_notifications": {
			"collection": "directus_notifications",
			"primary": "id",
			"singleton": false,
			"note": "$t:directus_collection.directus_notifications",
			"sortField": null,
			"accountability": "all",
			"fields": {
				"id": {
					"field": "id",
					"defaultValue": "AUTO_INCREMENT",
					"nullable": false,
					"generated": false,
					"type": "integer",
					"dbType": "integer",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"timestamp": {
					"field": "timestamp",
					"defaultValue": "CURRENT_TIMESTAMP",
					"nullable": true,
					"generated": false,
					"type": "timestamp",
					"dbType": "datetime",
					"precision": null,
					"scale": null,
					"special": [
						"date-created",
						"cast-timestamp"
					],
					"note": null,
					"alias": false,
					"validation": null
				},
				"status": {
					"field": "status",
					"defaultValue": "inbox",
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"recipient": {
					"field": "recipient",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"sender": {
					"field": "sender",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "char",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"subject": {
					"field": "subject",
					"defaultValue": null,
					"nullable": false,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"message": {
					"field": "message",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "text",
					"dbType": "text",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"collection": {
					"field": "collection",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				},
				"item": {
					"field": "item",
					"defaultValue": null,
					"nullable": true,
					"generated": false,
					"type": "string",
					"dbType": "varchar",
					"precision": null,
					"scale": null,
					"special": [],
					"note": null,
					"alias": false,
					"validation": null
				}
			}
		}
	},
	"relations": [
		{
			"collection": "directus_folders",
			"field": "parent",
			"related_collection": "directus_folders",
			"schema": {
				"table": "directus_folders",
				"column": "parent",
				"foreign_key_table": "directus_folders",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_folders",
				"many_field": "parent",
				"one_collection": "directus_folders",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_revisions",
			"field": "activity",
			"related_collection": "directus_activity",
			"schema": {
				"table": "directus_revisions",
				"column": "activity",
				"foreign_key_table": "directus_activity",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_revisions",
				"many_field": "activity",
				"one_collection": "directus_activity",
				"one_field": "revisions",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_revisions",
			"field": "parent",
			"related_collection": "directus_revisions",
			"schema": {
				"table": "directus_revisions",
				"column": "parent",
				"foreign_key_table": "directus_revisions",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_revisions",
				"many_field": "parent",
				"one_collection": "directus_revisions",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_dashboards",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_dashboards",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_dashboards",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_files",
			"field": "folder",
			"related_collection": "directus_folders",
			"schema": {
				"table": "directus_files",
				"column": "folder",
				"foreign_key_table": "directus_folders",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_files",
				"many_field": "folder",
				"one_collection": "directus_folders",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_files",
			"field": "modified_by",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_files",
				"column": "modified_by",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_files",
				"many_field": "modified_by",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_files",
			"field": "uploaded_by",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_files",
				"column": "uploaded_by",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_files",
				"many_field": "uploaded_by",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_permissions",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_permissions",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_permissions",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_collections",
			"field": "group",
			"related_collection": "directus_collections",
			"schema": {
				"table": "directus_collections",
				"column": "group",
				"foreign_key_table": "directus_collections",
				"foreign_key_column": "collection",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_collections",
				"many_field": "group",
				"one_collection": "directus_collections",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_presets",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_presets",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_presets",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_presets",
			"field": "user",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_presets",
				"column": "user",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_presets",
				"many_field": "user",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_shares",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_shares",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_shares",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_shares",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_shares",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_shares",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_shares",
			"field": "collection",
			"related_collection": "directus_collections",
			"schema": {
				"table": "directus_shares",
				"column": "collection",
				"foreign_key_table": "directus_collections",
				"foreign_key_column": "collection",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_shares",
				"many_field": "collection",
				"one_collection": "directus_collections",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_sessions",
			"field": "share",
			"related_collection": "directus_shares",
			"schema": {
				"table": "directus_sessions",
				"column": "share",
				"foreign_key_table": "directus_shares",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_sessions",
				"many_field": "share",
				"one_collection": "directus_shares",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_sessions",
			"field": "user",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_sessions",
				"column": "user",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_sessions",
				"many_field": "user",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "storage_default_folder",
			"related_collection": "directus_folders",
			"schema": {
				"table": "directus_settings",
				"column": "storage_default_folder",
				"foreign_key_table": "directus_folders",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "storage_default_folder",
				"one_collection": "directus_folders",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "public_background",
			"related_collection": "directus_files",
			"schema": {
				"table": "directus_settings",
				"column": "public_background",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "public_background",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "public_foreground",
			"related_collection": "directus_files",
			"schema": {
				"table": "directus_settings",
				"column": "public_foreground",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "public_foreground",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_settings",
			"field": "project_logo",
			"related_collection": "directus_files",
			"schema": {
				"table": "directus_settings",
				"column": "project_logo",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_settings",
				"many_field": "project_logo",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_users",
			"field": "role",
			"related_collection": "directus_roles",
			"schema": {
				"table": "directus_users",
				"column": "role",
				"foreign_key_table": "directus_roles",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_users",
				"many_field": "role",
				"one_collection": "directus_roles",
				"one_field": "users",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_panels",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_panels",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_panels",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_panels",
			"field": "dashboard",
			"related_collection": "directus_dashboards",
			"schema": {
				"table": "directus_panels",
				"column": "dashboard",
				"foreign_key_table": "directus_dashboards",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_panels",
				"many_field": "dashboard",
				"one_collection": "directus_dashboards",
				"one_field": "panels",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_flows",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_flows",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_flows",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "user_created",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_operations",
				"column": "user_created",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "user_created",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "flow",
			"related_collection": "directus_flows",
			"schema": {
				"table": "directus_operations",
				"column": "flow",
				"foreign_key_table": "directus_flows",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "flow",
				"one_collection": "directus_flows",
				"one_field": "operations",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "delete",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "reject",
			"related_collection": "directus_operations",
			"schema": {
				"table": "directus_operations",
				"column": "reject",
				"foreign_key_table": "directus_operations",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "reject",
				"one_collection": "directus_operations",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_operations",
			"field": "resolve",
			"related_collection": "directus_operations",
			"schema": {
				"table": "directus_operations",
				"column": "resolve",
				"foreign_key_table": "directus_operations",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_operations",
				"many_field": "resolve",
				"one_collection": "directus_operations",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "articles",
			"field": "author",
			"related_collection": "directus_users",
			"schema": {
				"table": "articles",
				"column": "author",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"id": 2,
				"many_collection": "articles",
				"many_field": "author",
				"one_collection": "directus_users",
				"one_field": null,
				"one_collection_field": null,
				"one_allowed_collections": null,
				"junction_field": null,
				"sort_field": null,
				"one_deselect_action": "nullify"
			}
		},
		{
			"collection": "articles",
			"field": "cover_image",
			"related_collection": "directus_files",
			"schema": {
				"table": "articles",
				"column": "cover_image",
				"foreign_key_table": "directus_files",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "SET NULL",
				"constraint_name": null
			},
			"meta": {
				"id": 1,
				"many_collection": "articles",
				"many_field": "cover_image",
				"one_collection": "directus_files",
				"one_field": null,
				"one_collection_field": null,
				"one_allowed_collections": null,
				"junction_field": null,
				"sort_field": null,
				"one_deselect_action": "nullify"
			}
		},
		{
			"collection": "directus_notifications",
			"field": "sender",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_notifications",
				"column": "sender",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "NO ACTION",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_notifications",
				"many_field": "sender",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_notifications",
			"field": "recipient",
			"related_collection": "directus_users",
			"schema": {
				"table": "directus_notifications",
				"column": "recipient",
				"foreign_key_table": "directus_users",
				"foreign_key_column": "id",
				"on_update": "NO ACTION",
				"on_delete": "CASCADE",
				"constraint_name": null
			},
			"meta": {
				"system": true,
				"many_collection": "directus_notifications",
				"many_field": "recipient",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_users",
			"field": "avatar",
			"related_collection": "directus_files",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_users",
				"many_field": "avatar",
				"one_collection": "directus_files",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_fields",
			"field": "collection",
			"related_collection": "directus_collections",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_fields",
				"many_field": "collection",
				"one_collection": "directus_collections",
				"one_field": "fields",
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_activity",
			"field": "user",
			"related_collection": "directus_users",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_activity",
				"many_field": "user",
				"one_collection": "directus_users",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_flows",
			"field": "operation",
			"related_collection": "directus_operations",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_flows",
				"many_field": "operation",
				"one_collection": "directus_operations",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		},
		{
			"collection": "directus_fields",
			"field": "group",
			"related_collection": "directus_fields",
			"schema": null,
			"meta": {
				"system": true,
				"many_collection": "directus_fields",
				"many_field": "group",
				"one_collection": "directus_fields",
				"one_field": null,
				"one_allowed_collections": null,
				"one_collection_field": null,
				"one_deselect_action": "nullify",
				"junction_field": null,
				"sort_field": null
			}
		}
	]
}

accountability object is 
{
	"user": null,
	"role": null,
	"admin": false,
	"app": false,
	"ip": "127.0.0.1",
	"userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
	"permissions": [
		{
			"id": 1,
			"role": null,
			"collection": "directus_files",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 2,
			"role": null,
			"collection": "directus_users",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 3,
			"role": null,
			"collection": "articles",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 30,
			"role": null,
			"collection": "directus_users",
			"action": "create",
			"permissions": {},
			"validation": {
				"_and": [
					{
						"status": {
							"_nnull": true
						}
					},
					{
						"provider": {
							"_nnull": true
						}
					}
				]
			},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 31,
			"role": null,
			"collection": "directus_notifications",
			"action": "create",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		},
		{
			"id": 32,
			"role": null,
			"collection": "directus_notifications",
			"action": "read",
			"permissions": {},
			"validation": {},
			"presets": {},
			"fields": [
				"*"
			]
		}
	]
}




*/