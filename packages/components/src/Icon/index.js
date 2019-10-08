import React from 'react';
import MuiIcon from '@material-ui/core/Icon';
import MuiSvgIcon from '@material-ui/core/SvgIcon';
import * as SvgIcons from '@material-ui/icons';
import * as BIcons from './icons';

export class Icon {
  static getIcon(cmpProps) {
    if (!cmpProps) {
      return null;
    }
    if (cmpProps.svgIcon) {
      const result = (
        <MuiSvgIcon {...cmpProps.iconProperties}>
          <path d={cmpProps.svgIcon} />
        </MuiSvgIcon>
      );
      return result;
    }
    if (cmpProps.fontIcon) {
      return <MuiIcon {...cmpProps.iconProperties}> {cmpProps.fontIcon} </MuiIcon>;
    }
    if (cmpProps.dynamicIcon && SvgIcons[cmpProps.dynamicIcon]) {
      const DynamicIcon = SvgIcons[cmpProps.dynamicIcon];
      return <DynamicIcon {...cmpProps.iconProperties} />;
    }
    if (cmpProps.bIcon && cmpProps.iconProperties) {
      const folder = BIcons[cmpProps.iconProperties.folder];
      if (folder) {
        const BIconType = folder[cmpProps.bIcon];
        if (BIconType) {
          return <BIconType {...cmpProps.iconProperties} />;
        }
      }
      return <BIcons.Actions.None {...cmpProps.iconProperties} />;
    }
    /* istanbul ignore if */
    if (cmpProps.icon) {
      const icon = React.cloneElement(cmpProps.icon, { ...cmpProps.iconProperties });
      return icon;
    }
    return null;
  }
}

export default Icon;

export * from './icons';
