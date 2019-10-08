import React from 'react';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ReactJson from 'react-json-view';
import { Divider } from '@kuveytturk/boa-components';
import { Input } from '@kuveytturk/boa-components/Input';
import { InputNumeric } from '@kuveytturk/boa-components/InputNumeric';
import { Label } from '@kuveytturk/boa-components/Label';
import { Toggle } from '@kuveytturk/boa-components/Toggle';
import { Scroll } from '@kuveytturk/boa-components/Scroll';
import { ComponentBase } from '@kuveytturk/boa-base';
import { generateDefaultValue } from './utils';


const themeItems = [
  { title: 'Kuveyt Turk', value: 'kuveytturk' },
  { title: 'Violet', value: 'violet' },
  { title: 'Winter', value: 'winter' },
  { title: 'Spring', value: 'spring' },
  { title: 'Summer', value: 'summer', color: '#D11919' },
  { title: 'Fall', value: 'fall' },
  { title: 'Night', value: 'night' },
  { title: 'Sea', value: 'sea' },
  { title: 'Rose', value: 'rose' },
  { title: 'Ash', value: 'ash' },
  { title: 'Dark', value: 'dark' },
  { title: 'Orange', value: 'orange' },
  { title: 'Magenta', value: 'magenta' },
];

const languageItems = [
  { title: 'Türkçe', value: 1 },
  { title: 'English', value: 2 },
  { title: 'Deutsch', value: 3 },
  { title: 'русский', value: 4 },
  { title: 'العربية', value: 5 },
];

export default class PropsPanel extends ComponentBase {
  constructor(props, context) {
    super(props, context);
    this.onPropertyChanged = this.onPropertyChanged.bind(this);
  }

  state = {
    selectedTheme: this.props.context.theme.themeName,
    selectedLanguage: this.props.context.language,
  };

  onPropertyChanged(property, value) {
    this.props.onPropertyChanged(property, value);
  }

  getBInput(property, value) {
    return (
      <Input
        context={this.props.context}
        type="text"
        value={value === null ? undefined : value}
        floatingLabelText={property.name}
        hintText={property.name}
        multiLine
        rows={1}
        rowsMax={4}
        onChange={(e, v) => this.onPropertyChanged(property.name, v)}
      />
    );
  }

  getBInputNumeric(property, value) {
    return (
      <InputNumeric
        context={this.props.context}
        value={value}
        floatingLabelText={property.name}
        hintText={property.name}
        onChange={(e, v) => this.onPropertyChanged(property.name, Number(v))}
      />
    );
  }

  getBToggle(property, value) {
    return (
      <Toggle
        context={this.props.context}
        label={property.label ? property.label : property.name}
        labelPosition="left"
        toggled={value}
        onToggle={(event, isInputChecked) => this.onPropertyChanged(property.name, isInputChecked)}
      />
    );
  }

  getJsonViewer(property, value) {
    const self = this;
    let cmpValue = value;
    if (cmpValue === undefined || cmpValue === null) {
      const defaultValue = generateDefaultValue(property.type);
      if (defaultValue !== undefined) {
        cmpValue = defaultValue;
      }
    }

    if (cmpValue === undefined || cmpValue === null) {
      return null;
    }

    return (
      <div style={{ marginTop: 15 }}>
        <InputLabel htmlFor={property.name}>{property.name}</InputLabel>
        <ReactJson
          src={cmpValue}
          style={{ paddingTop: 10, paddingLeft: 10 }}
          defaultValue={value === 'array' ? 'array' : null}
          enableClipboard={false}
          onAdd={() => { }}
          onEdit={src => {
            self.onPropertyChanged(property.name, src.updated_src);
          }}
          onDelete={src => {
            self.onPropertyChanged(property.name, src.updated_src);
          }}
        />
      </div>
    );
  }

  getComponent(property, value) {
    const self = this;

    if (this.props.ignoreProps && this.props.ignoreProps.includes(property.name)) {
      return null;
    }

    if (property.values && property.values.length > 0) {
      return (
        <div>
          <FormControl style={{ maxWidth: 300, width: '100%', marginBottom: 15 }}>
            <InputLabel htmlFor={property.name}>{property.name}</InputLabel>
            <Select
              value={value || property.values[0]}
              onChange={event => {
                self.onPropertyChanged(property.name, event.target.value);
              }}
            >
              {property.values.map((item, index) => {
                return (
                  <MenuItem
                    key={`property${index}`} // eslint-disable-line
                    value={item}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      );
    }

    if (property.type.toLowerCase().includes('date')) {
      return this.getBInput(property, value);
    }

    if (property.type.toLowerCase().includes('string')) {
      return this.getBInput(property, value);
    }

    if (property.type.toLowerCase().includes('number')) {
      return this.getBInputNumeric(property, value);
    }

    if (property.type.toLowerCase().includes('bool')) {
      return this.getBToggle(property, value);
    }

    if (property.type.toLowerCase().includes('object')) {
      return this.getJsonViewer(property, value);
    }

    if (property.type.toLowerCase().includes('array')) {
      return this.getJsonViewer(property, value);
    }

    return null;
  }

  render() {
    const self = this;
    const { context, currentProperties } = this.props;
    const availableProperties = this.props.availableProperties || [];
    const availableComposedProperties = this.props.availableComposedProperties || [];
    const hasComposedProps = availableComposedProperties.length > 0;

    if (availableProperties.length === 0 && availableComposedProperties.length === 0) {
      return null;
    }

    return (
      <div style={{ maxWidth: 300, position: 'relative' }}>
        <Paper>
          <Scroll
            style={{ maxHeight: 300, padding: 24, wordWrap: 'break-word' }}
            divStyle={{ width: 300, height: 300, position: 'relative' }}
            context={context}
            option={{ suppressScrollX: true }}
          >
            <div>
              <FormControl style={{ maxWidth: 300, width: '100%' }}>
                <InputLabel htmlFor="theme">Theme</InputLabel>
                <Select
                  value={this.state.selectedTheme}
                  onChange={event => {
                    self.setState({
                      selectedTheme: event.target.value,
                    });
                    if (self.props.onThemeChange) {
                      self.props.onThemeChange(event.target.value);
                    }
                  }}
                >
                  {themeItems.map((item, index) => {
                    return (
                      <MenuItem
                        key={`themeItems${index}`} // eslint-disable-line
                        value={item.value}
                      >
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                style={{
                  maxWidth: 300,
                  width: '100%',
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                <InputLabel htmlFor="lang">Language</InputLabel>
                <Select
                  value={this.state.selectedLanguage}
                  onChange={event => {
                    self.setState({
                      selectedLanguage: event.target.value,
                    });
                    if (self.props.onThemeChange) {
                      self.props.onLanguageChange(event.target.value);
                    }
                  }}
                >
                  {languageItems.map((item, index) => {
                    return (
                      <MenuItem
                        key={`languageItems${index}`} // eslint-disable-line
                        value={item.value}
                      >
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {availableProperties.map((property, i) => {
                /* eslint-disable react/no-array-index-key */
                if (!property.hidden && property.type !== 'func') {
                  const divStyle = {};
                  const defaultValue = currentProperties[property.name] || property.default;
                  if (i === availableProperties.length - 1) {
                    divStyle.marginBottom = 12;
                  }
                  return (
                    <div key={i} style={divStyle}>
                      {this.getComponent(property, defaultValue)}
                    </div>
                  );
                }
                return undefined;
              })}
              {hasComposedProps && (
                <Divider context={context} style={{ width: 'inherit', margin: '12px -24px' }} />
              )}
              {hasComposedProps && (
                <Label
                  context={context}
                  text="Inherited Props"
                  style={{
                    color: context.theme.palette.primary.main,
                    fontSize: 14,
                    paddingBottom: 12,
                  }}
                />
              )}
              {availableComposedProperties.map((property, i) => {
                /* eslint-disable react/no-array-index-key */
                if (!property.hidden && property.type !== 'func') {
                  const divStyle = {};
                  const defaultValue = currentProperties[property.name] || property.default;
                  if (i === availableProperties.length - 1) {
                    divStyle.marginBottom = 12;
                  }
                  return (
                    <div key={i} style={divStyle}>
                      {this.getComponent(property, defaultValue)}
                    </div>
                  );
                }
                return undefined;
              })}
            </div>
          </Scroll>
        </Paper>
      </div>
    );
  }
}
