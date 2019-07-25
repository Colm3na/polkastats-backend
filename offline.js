// @ts-check
// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Connect to MySQL
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "stats",
  password: "stats",
  database: 'validators'
});

// Local Polkadot node
var wsProviderUrl = 'ws://127.0.0.1:9944';

async function main () {

  //
  // Initialise the provider to connect to the local polkadot node
  //
  const provider = new WsProvider(wsProviderUrl);

  //
  // Create the API and wait until ready
  //
  const api = await ApiPromise.create(provider);

  //
  // Get validator outages
  //
  const offlineEvents = await api.query.staking.recentlyOffline();

  if (offlineEvents && offlineEvents.length > 0) {

    //console.log(JSON.stringify(offlineEvents));
    
    offlineEvents.forEach((offlineEvent) => {

      // ["5GnNQbHMgBrENud2k3CkbGBB4Z5uNuR6Y1R2z7amXYv8yLMp",2347862,1]

      console.log(`accountId: ${offlineEvent[0]} blocknumber: ${offlineEvent[1]} times: ${offlineEvent[2]}`);

      var sql = 'SELECT id FROM offline WHERE accountId = \'' + offlineEvent[0] + '\' blocknumber = \'' + offlineEvent[1] + '\' AND times = \'' + offlineEvent[2] + '\';';

      console.log('sql select: ' + sql);

      var sqlInsert = 'INSERT INTO offline (accountId, blocknumber, times) (\'' + offlineEvent[0] + '\', \'' + offlineEvent[1] + '\', \'' + offlineEvent[2] + '\');';

      console.log('sql insert: ' + sqlInsert);

      // Search for offline event in db, insert it if not found
      con.query(sql, function(err, rows, fields) {
        if (err) throw err;
        
        console.log('rows: ' + rows);

      });



      //var sql = "INSERT INTO bonded (accountId, timestamp, amount) VALUES ('" + val.accountId + "', UNIX_TIMESTAMP(), '" + val.stakers.total + "');";
      //console.log(sql);
      
    });
  }
}

main().catch(console.error).finally(() => process.exit());