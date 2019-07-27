import Rpc from '@polkadot/rpc-core';
import WsProvider from '@polkadot/rpc-provider/ws';

const provider = new WsProvider('http://127.0.0.1:9944');
const rpc = new Rpc(provider);

rpc.chain
  .getHead()
  .pipe(
    switchMap((headerHash) => {
      return rpc.chain.getHeader(headerHash);
    })
  )
  .subscribe(
    (header) => {
      console.log(`best #${header.blockNumber.toString()}`);
      console.log(`parentHash: ${header.parentHash.toString()}`);
      console.log(`stateRoot: ${header.stateRoot.toString()}`);
      console.log(`extrinsicsRoot: ${header.extrinsicsRoot.toString()}`);
      console.log(`digest: ${header.digest.toString()}`);
    },
    (error) => {
      console.error('error:', error);
    }
  );