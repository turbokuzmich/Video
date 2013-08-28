var connect = require('connect')
,	app = connect();

app.use(connect.static('player'));
app.listen(3000);