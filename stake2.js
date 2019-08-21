// @ts-check
// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Promise MySQL lib
const mysql = require('mysql2/promise');

// Local Polkadot node
var wsProviderUrl = 'ws://127.0.0.1:9944';

async function main () {
  
  //
  // Initialise the provider to connect to the local polkadot node
  //
  const provider = new WsProvider(wsProviderUrl);

  // Create the API and wait until ready
  const api = await ApiPromise.create(provider);
  
  // Fetch active validators
  const validators = await api.query.session.validators()

  if (validators && validators.length > 0) {

    // Map staking stats to validators
    const validatorStaking = await Promise.all(
      validators.map(authorityId => api.derive.staking.info(authorityId))
    );

    for (var i = 0; i < validatorStaking.length; i++) {

      //console.log(validatorStaking[i]);
      var sql = "INSERT INTO bonded (accountId, timestamp, amount) VALUES ('" + validatorStaking[i].accountId + "', UNIX_TIMESTAMP(), '" + validatorStaking[i].stakers.total + "');";
      console.log(sql);
  
    }
  }
}

main().catch(console.error).finally(() => process.exit());