import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';

const getMinLevel = content => {
  let level = 0;
  if (content.length > 0) level = content[0].level;
  content.forEach(item => {
    /* istanbul ignore if */
    if (item.level < level) {
      level = item.level;
    }
  });
  return level;
};

/**
 * This component renders a table of content tree.
 * It supports `[{id, level, content, [children]}]` formatted JSONs.
 */
@ComponentComposer
class DocToc extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * Active item id on component.
     */
    activeItem: PropTypes.string,
    /**
     * Data for the table tree.
     */
    content: PropTypes.array.isRequired,
    /**
     * Header text of the component.
     */
    header: PropTypes.string,
    /**
     * Event for item clicked.
     */
    linkOnClick: PropTypes.func,
  };

  static defaultProps = {
    header: 'Contents',
    content: [],
  };

  state = {
    activeItem: this.props.activeItem,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeItem) {
      this.setState({ activeItem: nextProps.activeItem });
    }
  }

  render() {
    const mainStyle = Object.assign(
      {
        borderLeftColor: this.props.context.theme.boaPalette.pri500,
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
      },
      this.props.style,
    );
    this.minLevel = getMinLevel(this.props.content);
    const content = this.populateContent(this.props.content);

    return <div style={mainStyle}>{content}</div>;
  }

  onClick(id) {
    if (this.state.activeItem !== id) {
      this.setState({ activeItem: id });
    }
    /* istanbul ignore else */
    if (this.props.linkOnClick) {
      this.props.linkOnClick(id);
    }
  }

  getLinkStyle(content, isHeader) {
    const style = {
      textDecoration: 'none',
      textOverflow: 'ellipsis',
      color: this.props.context.theme.palette.textColor,
      overflow: 'hidden',
      userSelect: 'none',
      lineHeight: '16px',
      fontSize: '13px',
      cursor: 'pointer',
    };
    if (isHeader === true) style.fontWeight = 'bold';
    if (content === this.state.activeItem) style.color = this.props.context.theme.boaPalette.pri500;
    return style;
  }

  getListItemStyle(level, index) {
    return {
      textDecoration: 'none',
      textOverflow: 'ellipsis',
      listStyleType: 'none',
      lineHeight: '16px',
      marginTop: index === -1 ? 0 : 8,
      marginLeft: level ? (level - this.minLevel) * 12 : undefined,
    };
  }

  populateContent(children, level = 0) {
    const headerId = 'top_of_page';
    const items = children.map((child, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} style={this.getListItemStyle(child.level, index)}>
          {child && (
            <label style={this.getLinkStyle(child.id)} onClick={this.onClick.bind(this, child.id)}>
              {child.content}
            </label>
          )}
          {child.children ? this.populateContent(child.children, level + 1) : null}
        </li>
      );
    });
    const listStyle = {
      listStyleType: 'none',
      paddingLeft: 12,
      marginTop: 0,
      marginBottom: 1,
    };
    return (
      <ul style={listStyle}>
        {level === 0 ? (
          <li style={this.getListItemStyle(0, -1)}>
            <label
              style={this.getLinkStyle(headerId, true)}
              onClick={this.onClick.bind(this, headerId)}
            >
              {this.props.header}
            </label>
          </li>
        ) : null}
        {items}
      </ul>
    );
  }
}

export default DocToc;
