var express = require('express');

module.exports = function(app){
	var router = express.Router();
	router.use(express.static(process.cwd() + '/public'));
	<% if(this.spec && this.spec.applicationType === 'MS'){ %>
	app.use("/swagger/api", express.static("./public/swagger.yaml"));
	<% } %>
	app.use(router);
}
