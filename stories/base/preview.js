import React from 'react';
import { action } from '@storybook/addon-actions';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { ComponentBase } from '@kuveytturk/boa-base';
import { DocViewer } from '@kuveytturk/boa-components/DocViewer';
import { DocCode } from '@kuveytturk/boa-components/DocCode';
import PropsPanel from './props-panel';
import * as Utils from './utils';
// import BaseProps from './doc.json';

export default class Preview extends ComponentBase {
  constructor(props, context) {
    super(props, context);
    this.componentDefaultProps = {};
    this.onPropertyChanged = this.onPropertyChanged.bind(this);
    this.componentRef = React.createRef();
  }

  state = {
    availableProperties: [],
    currentProperties: {},
    selectedTheme: 'violet',
    selectedLanguage: this.props.context.language,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultProps !== this.props.defaultProps) {
      this.setState(
        prevState => {
          const props = Object.assign(prevState.currentProperties, nextProps.defaultProps);
          return { currentProperties: props };
        },
        () => {
          const code = this.getComponentString();
          this.setState({ code });
        },
      );
    }
  }

  componentWillMount() {
    this.prepareData();
  }

  prepareData() {
    const self = this;
    const propMetaData = self.props.doc.props;
    const composeMetaData = self.props.doc.composeProps;

    const availableProperties = [];
    const availableComposedProperties = [];
    const currentProperties = {};

    const createPropMeta = (metaData, available, current) => {
      Object.keys(metaData)
        .sort()
        .forEach(key => {
          const prop = metaData[key];
          if (prop.description && prop.description.includes('@ignore')) return;

          const property = {
            name: key,
            type: Utils.getPropType(prop),
            value: Utils.getPropValue(prop),
            values: Utils.getAvailableValues(prop),
            default: Utils.getDefaultValue(prop),
          };

          available.push(property);
          const defaultValue = Utils.getDefaultValue(prop);
          if (defaultValue) {
            current[key] = defaultValue;
            self.componentDefaultProps[key] = defaultValue;
          }
        });

      if (available && available.length > 0) {
        available.sort((a, b) => {
          if (a.type < b.type) return -1;
          if (a.type > b.type) return 1;
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      }
    };

    if (composeMetaData) {
      Object.keys(composeMetaData).forEach(composeName => {
        createPropMeta(
          composeMetaData[composeName],
          availableComposedProperties,
          currentProperties,
        );
      });
    }

    createPropMeta(propMetaData, availableProperties, currentProperties);
    Object.assign(currentProperties, this.props.defaultProps);
    this.setState({ availableProperties, availableComposedProperties, currentProperties }, () => {
      const code = self.getComponentString();
      this.setState({ code });
    });
  }

  getName() {
    return this.props.doc.displayName;
  }

  propertyChanged(property, val) {
    let value = val;
    /*
     * If component propType is oneOf([..]) and values are not string
     * The NativeSelect component (on the props-panel.js) returns selected value as string,
     * So we are find the correct value from doc.json
     */
    if (typeof value === 'string') {
      const values = Utils.getAvailableValues(this.props.doc.props[property]);
      if (values && values.length > 0) {
        value = values.find(x => x.toString() === val);
      }
    }

    this.setState(
      prevState => {
        const newCurrentProperties = Object.assign({}, prevState.currentProperties);
        newCurrentProperties[property] = value;
        return { currentProperties: newCurrentProperties };
      },
      () => {
        const code = this.getComponentString();
        this.setState({ code });
      },
    );
  }

  onPropertyChanged(property, value) {
    delete this.componentDefaultProps[property];
    this.propertyChanged(property, value);
  }

  render() {
    const self = this;
    const RenderedComponent = this.props.component;
    const { availableProperties, availableComposedProperties, currentProperties } = this.state;
    const changedProps = {};

    if (currentProperties) {
      const keys = Object.keys(currentProperties);
      if (keys.length > 0) {
        keys.forEach((key) => {
          if (!self.componentDefaultProps[key]) {
            changedProps[key] = currentProperties[key];
          }
        });
      }
    }

    if (!availableProperties || availableProperties.length === 0) {
      return null;
    }
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '100%' }}>
            <DocViewer content={'## Props'} editorType="github" />
            <PropsPanel
              availableProperties={availableProperties}
              availableComposedProperties={availableComposedProperties}
              currentProperties={currentProperties}
              onPropertyChanged={this.onPropertyChanged}
              {...this.props}
            />
          </div>
          <div style={{ marginLeft: 100, width: '100%' }}>
            <DocViewer content="## Preview" editorType="github" />
            {this.props.sample}
            {!this.props.sample && (
              <RenderedComponent
                {...currentProperties}
                {...changedProps}
                ref={this.componentRef}
                onChange={action(`${self.getName()}-onChange`)}
                onClick={action(`${self.getName()}-onClick`)}
                context={this.props.context}
              />
            )}
          </div>
        </div>
        {this.state.code && (
          <DocCode content={this.state.code} highlight lang={'js'} editorType="github" />
        )}
      </div>
    );
  }

  getComponentString() {
    const RenderedComponent = this.props.component;
    const RenderedComponentString = reactElementToJSXString(
      <RenderedComponent {...this.state.currentProperties} />,
      {
        displayName: this.getName.bind(this),
        filterProps: ['context', 'doc', 'componentSize', 'newLine', ...[this.props.ignoreProps]],
      },
    );

    const strings = RenderedComponentString.split('\n');
    strings.splice(1, 0, '  context={context}');
    return `import ${this.getName()} from '@kuveytturk/boa-components/${this.getName()}';

${strings.join('\n')}`;
  }
}
