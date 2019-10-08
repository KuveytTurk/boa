/* eslint-disable max-len, import/prefer-default-export */
const styles = {
  gray: {
    columnRow: 'display: table-row; color:#757575; height:40px;',
    columnCell: 'display: table-cell; font-weight: bold; padding: 6px; vertical-align:middle;',
    oddRow: 'display: table-row;',
    oddCell:
      'display: table-cell; border-top:1px solid rgb(224,224,224); border-bottom:1px solid rgb(224,224,224); background:#F5F5F5; padding: 6px;',
    evenRow: 'display: table-row;',
    evenCell:
      'display: table-cell; border-top:1px solid rgb(224,224,224); border-bottom:1px solid rgb(224,224,224); padding: 6px;',
  },
  green: {
    columnRow: 'display: table-row; background:rgba(124,179,66, 1); color:#ffffff; height:40px;',
    columnCell: 'display: table-cell; font-weight: bold; padding: 6px; vertical-align:middle;',
    oddRow: 'display: table-row;',
    oddCell:
      'display: table-cell; border-top:1px solid rgb(124,179,66); border-bottom:1px solid rgb(124,179,66); padding: 6px;',
    evenRow: 'display: table-row;',
    evenCell:
      'display: table-cell; border-top:1px solid rgb(124,179,66); border-bottom:1px solid rgb(124,179,66); background:rgba(124,179,66,.1); padding: 6px;',
  },
  blue: {
    columnRow: 'display: table-row; background:rgba(2,136,209, 1); color:#ffffff; height:40px;',
    columnCell: 'display: table-cell; font-weight: bold; padding: 6px; vertical-align:middle;',
    oddRow: 'display: table-row;',
    oddCell:
      'display: table-cell; border-top:1px solid rgb(2,136,209); border-bottom:1px solid rgb(2,136,209); padding: 6px;',
    evenRow: 'display: table-row;',
    evenCell:
      'display: table-cell; border-top:1px solid rgb(2,136,209); border-bottom:1px solid rgb(2,136,209); background:rgba(2,136,209,.1); padding: 6px;',
  },
  orange: {
    columnRow: 'display: table-row; background:rgba(255,145,0, 1); color:#ffffff; height:40px;',
    columnCell: 'display: table-cell; font-weight: bold; padding: 6px; vertical-align:middle;',
    oddRow: 'display: table-row;',
    oddCell:
      'display: table-cell; border-top:1px solid rgb(255,145,0); border-bottom:1px solid rgb(255,145,0); padding: 6px;',
    evenRow: 'display: table-row;',
    evenCell:
      'display: table-cell; border-top:1px solid rgb(255,145,0); border-bottom:1px solid rgb(255,145,0); background: rgba(255,145,0,.1); padding: 6px;',
  },
  red: {
    columnRow: 'display: table-row; background:rgba(255,82,82, 1); color:#ffffff; height:40px;',
    columnCell: 'display: table-cell; font-weight: bold; padding: 6px; vertical-align:middle;',
    oddRow: 'display: table-row;',
    oddCell:
      'display: table-cell; border-top:1px solid rgb(255,82,82); border-bottom:1px solid rgb(255,82,82); padding: 6px;',
    evenRow: 'display: table-row;',
    evenCell:
      'display: table-cell; border-top:1px solid rgb(255,82,82); border-bottom:1px solid rgb(255,82,82); background:rgba(255,82,82,.1); padding: 6px;',
  },
  black: {
    columnRow: 'display: table-row; background:rgba(64,64,64, 1); color:#ffffff; height:40px;',
    columnCell: 'display: table-cell; font-weight: bold; padding: 6px; vertical-align:middle;',
    oddRow: 'display: table-row;',
    oddCell:
      'display: table-cell; border-top:1px solid rgb(64,64,64); border-bottom:1px solid rgb(64,64,64); padding: 6px;',
    evenRow: 'display: table-row;',
    evenCell:
      'display: table-cell; border-top:1px solid rgb(64,64,64); border-bottom:1px solid rgb(64,64,64); background:rgba(64,64,64,.1); padding: 6px;',
  },
};

export function getStyle(color) {
  return {
    table: `display: table; border-collapse:collapse;  border: 0px solid rgb(224,224,224);
            border-spacing: 0; font: 14px/20px Roboto,sans-serif; width: 100%; margin-top: 1em; margin-bottom: 1em;`,
    rowGroup: 'display: table-row-group; ',
    columnRow: styles[color].columnRow,
    columnCell: styles[color].columnCell,
    oddRow: styles[color].oddRow,
    oddCell: styles[color].oddCell,
    evenRow: styles[color].evenRow,
    evenCell: styles[color].evenCell,
  };
}
