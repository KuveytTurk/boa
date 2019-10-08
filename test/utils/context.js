import { getTheme, DeviceSize } from '@kuveytturk/boa-base';

const context = {};
context.theme = getTheme({ themeName: 'kuveytturk' });
context.localization = [];
context.localization.isRightToLeft = false;
context.language = 1;
context.platform = '';
context.deviceSize = DeviceSize.MEDIUM;

export default context;
