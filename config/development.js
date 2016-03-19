/**
 * Created by prashant on 18/9/14.
 */
var port = process.env.PORT || 3000;

module.exports = {
	conf: {
		host: '127.0.0.1',
		port: port,
		maxHttpConnections: 1000,
		maxFSDescriptor: 1000
	},
	mongo: {
		hosts: [ '127.0.0.1' ],
		dbname: 'mydatabase',
		auth: {
			enabled: false,		// Note: username pwd will ONLY be used if enabled === true
			username: '',
			password: ''
		},
		poolSize: 20
	},
	mysql: {
        cluster: [
			{	host: '127.0.0.1',
				user: 'root',
                port: 3306,
				password: '',
				database: '',
				connectionLimit: 10,
				queueLimit: 30
			}
		]
	},
	gearman: {
		jobServer: '127.0.0.1',
		port: 4730
	},
    redis: {
        host: 'localhost',
        port: 6379,
        database: 2
    }
};
