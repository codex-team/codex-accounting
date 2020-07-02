import AccountantServer from './server';
import HawkCatcher from '@hawk.so/nodejs';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Enable HawkCatcher
 */
if (process.env.HAWK_CATCHER_TOKEN) {
  HawkCatcher.init(process.env.HAWK_CATCHER_TOKEN);
}

if (!process.env.PORT) {
  console.error('Please, specify server port via .env PORT option');
  process.exit(1);
}

const server = new AccountantServer(+process.env.PORT, process.env.PLAYGROUND_ENABLE === 'true');

server.start().catch(err => {
  HawkCatcher.send(err);
  console.log('Server runtime error' + err);
});
