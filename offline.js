// @ts-check
// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

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

    console.log(JSON.stringify(offlineEvents));

    offlineEvents.forEach((val) => {
      
      //var sql = "INSERT INTO bonded (accountId, timestamp, amount) VALUES ('" + val.accountId + "', UNIX_TIMESTAMP(), '" + val.stakers.total + "');";
      //console.log(sql);
      
    });
  }
}

main().catch(console.error).finally(() => process.exit());