# Polkastats backend

> Polkadot network statistics backend

## Build backend (as root)

``` bash
# Change dir
$ cd /usr/local

# Clone this repo
$ git clone https://github.com/Colm3na/polkastats-backend.git

# Change dir
$ cd polkastats-backend

# Install dependencies
$ npm run install

# Serve with nodejs
$ node index.js
```

## Build graph backend (as root)

### Create MySQL database

$ mysql -u root -p'your_mysql_root_password'
> create database validators;
> use validators;
> CREATE TABLE bonded(  
   id INT NOT NULL AUTO_INCREMENT,
   accountId VARCHAR(50) NOT NULL,
   timestamp INT(8) NOT NULL,  
   amount VARCHAR(50) NOT NULL,
   PRIMARY KEY ( id )  
);
> GRANT ALL PRIVILEGES ON validators.* to stats@localhost identified by 'stats';

### Execute in cron every 5 mins

Add this to your /etc/crontab:

``` bash
*/5 *  * * *   root     node /usr/local/polkastats-backend/stake.js | mysql -u stats -p'stats' -Dvalidators
```


