import 'module-alias/register';
import { config as configEnv } from 'dotenv-flow';

configEnv({ silent: true });

// eslint-disable-next-line import/first
import { startService } from 'src/service';

startService(process.env);
