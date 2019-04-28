process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

let urlDB
if (process.env.NODE_ENV === 'local'){
	urlDB = 'mongodb://localhost:27017/universidad';
}
else {
	urlDB = 'mongodb+srv://admin:root@nodejsuniver-p1aqc.mongodb.net/universidad?retryWrites=true'
}

process.env.URLDB = urlDB