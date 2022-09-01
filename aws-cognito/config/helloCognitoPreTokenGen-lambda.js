/*
	Include scopes in the token generated. Each scope is compose by the group name and the application client id.
*/
exports.handler = async (event, context) => {
    
	let newScopes = event.request.groupConfiguration.groupsToOverride.map(item => `${item}-${event.callerContext.clientId}`)
	
	event.response = {
		"claimsOverrideDetails": {
			"claimsToAddOrOverride": {
				"scope": newScopes.join(" "),
			}
		}
  	};
  	
  	return event
}