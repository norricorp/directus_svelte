"use strict";module.exports=({filter:e,action:o},{exceptions:i})=>{const{InvalidPayloadException:s}=i;e("users.create",((e,{collection:o},{database:i,schema:r,accountability:t})=>{if(console.log("filter input object for user create is "+JSON.stringify(e)),!t||t.admin&&t.app)return console.log("This has come from directus app"),e;if(!e.fred)throw console.log("This has come from elsewhere"),new s;return console.log("This has come from SVELTE"),delete e.fred,e})),e("notifications.create",((e,{collection:o},{database:i,schema:r,accountability:t})=>{if(console.log("filter input object for notification create is "+JSON.stringify(e)),!t||t.admin&&t.app)return console.log("This has come from directus app"),e;if(!e.subject.includes(" requires approval of Registration"))throw console.log("This has come from elsewhere"),new s;return console.log("This has come from SVELTE"),e})),e("articles.items.query",((e,{collection:o},{database:i,schema:s,accountability:r})=>{if(console.log("filter input object for article query is "+JSON.stringify(e)),!r||r.admin&&r.app)return console.log("This has come from directus app"),e;e.fields.includes("fred")?(console.log("This has come from SVELTE "+JSON.stringify(e.fields)),console.log("And is it an array? "+Array.isArray(e.fields)),e.fields.pop()):(console.log("This has come from elsewhere"),e.filter.membersOnly=!1),console.log("filter input object for article query after processing is "+JSON.stringify(e))})),o("users.create",(({payload:e},{schema:o,accountability:i})=>{console.log("action payload object for users create is "+JSON.stringify(e))}))};