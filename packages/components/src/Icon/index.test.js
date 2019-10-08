import { assert } from 'chai';
import MuiSvgIcon from '@material-ui/core/SvgIcon';
import MuiIcon from '@material-ui/core/Icon';
import * as SvgIcons from '@material-ui/icons';
import * as Icons from './icons';
import { Icon } from './index';
import { createMount } from '@kuveytturk/boa-test/utils';

describe('Icon', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should get dynamicIcon', () => {
    const Home = Icon.getIcon({ dynamicIcon: 'Home' });
    const wrapper = mount(Home);
    assert.strictEqual(wrapper.type(), SvgIcons.Home);
  });

  it('should get svgIcon', () => {
    const SvgIcon = Icon.getIcon({ svgIcon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' });
    const wrapper = mount(SvgIcon);
    assert.strictEqual(wrapper.type(), MuiSvgIcon);
  });

  it('should get fontIcon', () => {
    const FontIcon = Icon.getIcon({ fontIcon: 'home' });
    const wrapper = mount(FontIcon);
    assert.strictEqual(wrapper.type(), MuiIcon);
  });

  it('should get bIcon', () => {
    const SvgIcon = Icon.getIcon({ bIcon: 'BOALogo', iconProperties: { folder: 'Logos' } });
    const wrapper = mount(SvgIcon);
    assert.strictEqual(wrapper.type(), Icons.Logos.BOALogo);
  });

  it('should return null when icon not exists', () => {
    const SvgIcon = Icon.getIcon({ bIcon: 'aaaa', iconProperties: { folder: 'Logos' } });
    assert.strictEqual(SvgIcon.type, Icons.Actions.None);
  });

  it('should return null when folder not exists', () => {
    const SvgIcon = Icon.getIcon({ bIcon: 'aaaa', iconProperties: { folder: 'aaaa' } });
    assert.strictEqual(SvgIcon.type, Icons.Actions.None);
  });
});
