/* eslint-disable no-extend-native, no-restricted-globals */
String.prototype.splice = (idx, rem, str) => {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

export function parseComponent(component) {
  const paths = component.split('/');
  if (paths.length < 3) return 'ComponentBase';
  return paths[paths.length - 1];
}

export function getPropName(prop, key) {
  return prop.required ? `${key}*` : key;
}

export function getPropType(prop) {
  let propType = '';
  if (prop && prop.type) {
    propType = prop.type.name;

    if (prop.type.raw) propType = prop.type.raw;

    if (prop.type.name === 'shape') {
      propType = prop.type.name;
    } else if (prop.type.name === 'enum') {
      propType = '';
      prop.type.value.forEach(item => {
        propType += ` \`${item.value}\`, <br />`;
      });
    } else if (prop.type.name === 'union') {
      propType = `${prop.type.name} &#124;`;
      prop.type.value.forEach(item => {
        propType += ` \`${item.name}${item.value || ''}\`, `;
      });
    } else if (typeof prop.type.value === 'object') {
      propType = `${prop.type.name}(${prop.type.value.name})`;
    }
  }

  return propType.replace('|', '&#124; ');
}

export function getDefaultValueForMarkdown(prop) {
  return prop.defaultValue && prop.defaultValue.value && prop.defaultValue.value.split
    ? prop.defaultValue.value.split('\n').join('<br>')
    : '';
}

export function getPropDescription(prop) {
  return prop.description ? prop.description.split('\n').join('<br>') : '';
}

export function generateDefaultValue(type) {
  switch (type) {
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'string':
      return '';
    case 'object':
      return {};
    case 'array': {
      return [];
    }
    default:
      return undefined;
  }
}

export function getPropValue(prop) {
  if (prop && prop.type && prop.type.value) {
    return prop.type.value;
  }
  return null;
}

export function getAvailableValues(prop) {
  if (prop && prop.type) {
    if (prop.type.value) {
      if (Array.isArray(prop.type.value)) {
        if (prop.type.value[0].value !== undefined && prop.type.value[0].value !== null) {
          // oneOf
          return prop.type.value.map(item => {
            return item.value;
          });
        }
      }
    }
  }
  return null;
}

export function getDefaultValue(prop) {
  if (prop.defaultValue && prop.defaultValue.value) {
    if (typeof prop.defaultValue.value === 'string' && prop.defaultValue.value.includes('{')) {
      return null;
    }
    if (prop.defaultValue.computed && !prop.description.includes('@ignore')) {
      // eslint-disable-next-line no-eval
      return eval(prop.defaultValue.value);
    }
    return prop.defaultValue.value;
  }
  return null;
}
