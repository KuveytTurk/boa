import './utils/performance';
import './utils/init';

import { setTestRunner } from './utils/testRunner';
// const integrationContext = require.context('./integration', true, /\.test\.js$/);
// integrationContext.keys().forEach(integrationContext);
setTestRunner('karma');
const unitContext = require.context('../packages/', true, /\.test\.js$/);
unitContext.keys().forEach(unitContext);
