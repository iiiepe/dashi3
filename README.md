# Dashi3

Dashi3 is a dashboard application written in Node.js / Sails / MySQL / Angular.js to store data and present it as widgets in realtime.
It has a storage system so you can save any kind of data.

### Status
Currently under development, not production ready, use it at your own risk.

### Run
You can run the application using Docker:

		docker run -d --name dashi3 \
		-p 3000:3000 \
		-v /var/log/docker/dashi3:/var/log/supervisor \
		-e MYSQL_PORT_3306_TCP_ADDR=mysql.example.com \
		-e MYSQL_ENV_MYSQL_USER=dbuser \
		-e MYSQL_ENV_MYSQL_PASSWORD=secret \
		-e MYSQL_ENV_MYSQL_DATABASE=dashboard \
		-e MYSQL_PORT_3306_TCP_PORT=3306 \
		-e PORT=3000
		-e NODE_ENV=production
		iiieperobot/dashi3

### Development
To help with development please install Fig and then clone the project. Then run:

		make init
		make start

## Roadmap

- Authentication
- Public and private dashboards
- More widgets
-- Twitter feed, Facebook data, Google Analytics, etc...
- Marketplace