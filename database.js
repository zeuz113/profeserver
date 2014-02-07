var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : '66.132.131.159',
  user     : 'websites',
  password : 'Websites2008',
  database : 'aguila-penaltis'
});
module.exports = {
     test: function(){
        connection.connect();
	    connection.query(
		'SELECT * FROM polla_user WHERE name_user LIKE "Jav%"',
        function(err, rows, fields) {
            if (err) {
                console.log("Error: " + err.message);
                throw err;
            }
            console.log("Number of rows: "+rows.length);
            console.log(rows);
            connection.end();
        });
    }
}