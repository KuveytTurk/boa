import ReactDOM from 'react-dom';
import { mount as enzymeMount } from 'enzyme';
import { CHANNEL } from '@material-ui/core/styles/themeListener';
import appContext from './context';

// Generate an enhanced mount function.
export default function createMount(options1 = {}) {
  const { mount = enzymeMount, includeBOAcontext = true, ...other1 } = options1;

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const mountWithContext = function mountWithContext(node, options2 = {}) {
    const options = {
      attachTo,
      ...other1,
      ...options2,
      context: {
        ...other1.context,
        ...options2.context,
      },
    };

    if (includeBOAcontext) {
      options.context[CHANNEL] = {
        getState: () => {
          return appContext.theme;
        },
        subscribe: () => {},
        unsubscribe: () => {},
      };
    }
    return mount(node, options);
  };

  mountWithContext.attachTo = attachTo;
  mountWithContext.cleanUp = () => {
    ReactDOM.unmountComponentAtNode(attachTo);
    if (attachTo.parentNode) {
      attachTo.parentNode.removeChild(attachTo);
    }
  };

  return mountWithContext;
}
