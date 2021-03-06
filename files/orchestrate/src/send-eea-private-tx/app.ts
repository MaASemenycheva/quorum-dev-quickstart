import { ProtocolType, OrchestrateClient } from 'pegasys-orchestrate'
import * as uuid from 'uuid'

export const start = async () => {
  const txClient = new OrchestrateClient(process.env.API_HOST!);
  const idempotencyKey = uuid.v4();

  // Deploy contract in private network between two private participants
  const txResponse = await txClient.deployContract(
    {
      chain: process.env.CHAIN!,
      params: {
        contractName: 'Counter',
        from: process.env.FROM_ACCOUNT!,
        protocol: ProtocolType.Orion,
        privateFrom: process.env.ORION1_NODE_KEY,  // Orion node 1 public key (the registered chain)
        privateFor: [process.env.ORION2_NODE_KEY!] // Orion node 2 public key
      }
    },
    idempotencyKey,
    process.env.AUTH_TOKEN
  );

  console.log('Transaction request sent successfully', txResponse);
};
