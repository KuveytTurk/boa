import { DeviceSize } from '@kuveytturk/boa-base';

const deviceThresholds = {
  SMALL: 512,
  MEDIUM: 1024,
};

export default function detectSize() {
  let deviceSize;
  const width = window.innerWidth || document.body.clientWidth;
  if (deviceThresholds.SMALL && width <= deviceThresholds.SMALL) {
    deviceSize = DeviceSize.SMALL;
  } else if (deviceThresholds.MEDIUM && width <= deviceThresholds.MEDIUM) {
    deviceSize = DeviceSize.MEDIUM;
  } else {
    deviceSize = DeviceSize.LARGE;
  }
  return deviceSize;
}
