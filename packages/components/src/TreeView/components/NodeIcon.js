/* eslint-disable max-len */
import React from 'react';
import FolderSpecial from '@material-ui/icons/FolderSpecial';
import FolderOpen from '@material-ui/icons/FolderOpen';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Icon } from '../../Icon';

@ComponentComposer
class NodeIcon extends ComponentBase {
  getStyle() {
    const style = {
      textAlign: 'center',
      width: '24px',
      display: 'flex',
      verticalAlign: 'middle',
      height: this.props.rowHeight,
      alignItems: 'center',
      lineHeight: `${this.props.rowHeight}px`,
    };

    if (this.props.context.localization.isRightToLeft) {
      style.marginLeft = 12;
    } else {
      style.marginRight = 12;
    }

    return style;
  }

  render() {
    let content;
    if (this.props.icon && React.isValidElement(this.props.icon)) {
      content = this.props.icon;
    } else if (this.props.icon) {
      content = Icon.getIcon(this.props.icon);
    } else if (this.props.hasChildren && this.props.showFolderIcon) {
      content = (
        <div>
          {{
            opened: <FolderOpen style={{ color: this.props.context.theme.boaPalette.pri500 }} />,
            closed: <FolderSpecial style={{ color: this.props.context.theme.boaPalette.pri500 }} />,
          }[this.props.state] || (
              <FolderSpecial style={{ color: this.props.context.theme.boaPalette.pri500 }} />
            )}
        </div>
      );
    } else {
      content = (<div />);
    }
    return <div style={this.getStyle()}>{content}</div>;
  }
}
export default NodeIcon;
