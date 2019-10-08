/* istanbul ignore file */
/* eslint-disable max-len, react/style-prop-object */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const CountryFlags = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, flagCode, ...otherProps } = props;

  if (props.flagCode === 'TR' || props.flagCode === 'TL' || props.flagCode === 'TRY') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#e30a17' }} />
        <circle cx="9.2" cy="12" r="4.2" style={{ fill: '#fff' }} />
        <circle cx="10.2" cy="12" r="3.3" style={{ fill: '#e30a17' }} />
        <polygon
          points="12.5 12 16.2 13.2 13.9 10 13.9 14 16.2 10.8 12.5 12"
          style={{ fill: '#fff' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'AED') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="9" width="22" height="6" style={{ fill: '#fff' }} />
        <rect x="1" y="4" width="22" height="5.5" style={{ fill: '#00732f' }} />
        <rect x="1" y="14.5" width="22" height="5.5" />
        <rect x="1" y="4" width="6" height="16" style={{ fill: 'red' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ALM (ton)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3c0.2,0.5-0.1,1.1-0.6,1.3C10.8,18,10.7,18,10.6,18z"
          style={{ fill: '#848789' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.6,0-1-0.4-1.1-0.9c0-0.1,0-0.3,0.1-0.4l1.1-3.3c0.3-0.8,1.1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#848789' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.5,8.8,5,9.8,5h4.5c0.9,0,1.7,0.5,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#848789' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ALT (gr)') {
    return (
      <SvgIcon {...otherProps}>
        {/* <path d="M21.61,18H2.39a1,1,0,0,1-1-1.32l3.1-9.31A2,2,0,0,1,6.44,6H17.56a2,2,0,0,1,1.9,1.37l3.1,9.31A1,1,0,0,1,21.61,18Z" style={{ fill: '#ffbf53' }} /> */}
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#FFBF53' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#FFBF53' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#FFBF53' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ATS') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#ed2939' }} />
        <rect x="1" y="9.3" width="22" height="5.3" style={{ fill: '#fff' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'AUD') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#134b8e' }} />
        <rect x="1" y="4" width="11.9" height="8" style={{ fill: '#134b8e' }} />
        <polygon
          points="12.9 6.8 8.2 6.8 8.2 4 5.8 4 5.8 6.8 1 6.8 1 9.2 5.8 9.2 5.8 12 8.2 12 8.2 9.2 12.9 9.2 12.9 6.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="12.9 11 2.4 4 1 4 1 4.9 11.5 12 12.9 12 12.9 11"
          style={{ fill: '#fff' }}
        />
        <polygon points="1 11 11.6 4 12.9 4 12.9 4.9 2.4 12 1 12 1 11" style={{ fill: '#fff' }} />
        <polygon
          points="12.9 7.3 7.7 7.3 7.7 4 6.3 4 6.3 7.3 1 7.3 1 8.7 6.3 8.7 6.3 12 7.7 12 7.7 8.7 12.9 8.7 12.9 7.3"
          style={{ fill: '#ee3f42' }}
        />
        <polygon
          points="12.9 11.9 12.9 11.3 9.7 9.2 8.8 9.2 12.9 11.9"
          style={{ fill: '#ee3f42' }}
        />
        <polygon points="12.9 4 12 4 8.2 6.5 8.2 6.8 8.7 6.8 12.9 4" style={{ fill: '#ee3f42' }} />
        <polygon
          points="5.2 9.2 1 11.9 1 12 1.9 12 5.8 9.4 5.8 9.2 5.2 9.2"
          style={{ fill: '#ee3f42' }}
        />
        <polygon points="1 4 1 4.6 4.2 6.8 5.2 6.8 1 4" style={{ fill: '#ee3f42' }} />
        <polygon
          points="7 14.1 7.3 15.2 8.4 14.8 7.8 15.8 8.8 16.4 7.6 16.5 7.8 17.7 7 16.8 6.1 17.7 6.3 16.5 5.1 16.4 6.1 15.8 5.5 14.8 6.6 15.2 7 14.1"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="18.1 16.4 18.2 16.9 18.8 16.7 18.5 17.2 19 17.5 18.4 17.5 18.5 18.1 18.1 17.7 17.7 18.1 17.7 17.5 17.2 17.5 17.7 17.2 17.3 16.7 17.9 16.9 18.1 16.4"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="15.1 10.1 15.3 10.6 15.8 10.4 15.5 10.9 16 11.2 15.4 11.2 15.5 11.8 15.1 11.4 14.7 11.8 14.8 11.2 14.2 11.2 14.7 10.9 14.4 10.4 14.9 10.6 15.1 10.1"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="18.1 5.8 18.2 6.3 18.8 6.1 18.5 6.6 19 6.9 18.4 6.9 18.5 7.5 18.1 7.1 17.7 7.5 17.7 6.9 17.2 6.9 17.7 6.6 17.3 6.1 17.9 6.3 18.1 5.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="20.7 9 20.9 9.6 21.4 9.4 21.1 9.9 21.6 10.1 21 10.2 21.1 10.8 20.7 10.3 20.3 10.8 20.4 10.2 19.8 10.1 20.3 9.9 20 9.4 20.5 9.6 20.7 9"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="19.3 12.1 19.4 12.5 19.8 12.5 19.5 12.7 19.6 13.1 19.3 12.9 18.9 13.1 19 12.7 18.8 12.5 19.1 12.5 19.3 12.1"
          style={{ fill: '#fff' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'BEF') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#ed2939' }} />
        <rect x="1" y="4" width="14.7" height="16" style={{ fill: '#fae042' }} />
        <rect x="1" y="4" width="7.3" height="16" />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'BHD') {
    return (
      <SvgIcon {...otherProps}>
        <path d="M1,4H23V20H1" style={{ fill: '#fff' }} />
        <path
          d="M23,4H6.4L9.8,5.6,6.4,7.2,9.8,8.8,6.4,10.4,9.8,12,6.4,13.6l3.4,1.6L6.4,16.8l3.4,1.6L6.4,20H23"
          style={{ fill: '#ce1126' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'CAD') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: 'red' }} />
        <rect x="6" y="4" width="12" height="16" style={{ fill: '#fff' }} />
        <path
          d="M12,7.5l-.8,1.4c0,.2-.2.2-.3.1l-.5-.3.4,2.1c.1.4-.2.4-.3.2L9.4,10l-.2.5c0,.1-.1.1-.2.1l-1.2-.3.3,1.1c.1.3.1.4-.1.4l-.4.2,2.1,1.7a.37.37,0,0,1,.1.3l-.2.6c.7-.1,1.3-.2,2.1-.3a.22.22,0,0,1,.2.2l-.1,2.2h.3L12,14.5a.22.22,0,0,1,.2-.2c.7.1,1.3.2,2.1.3l-.2-.6a.37.37,0,0,1,.1-.3L16.3,12h-.4c-.2-.1-.1-.2-.1-.4l.3-1.1-1.2.3a.35.35,0,0,1-.2-.1l-.1-.7-.9,1.1c-.1.2-.4.2-.3-.2l.4-2.1-.7.2c-.2.1-.3.1-.4-.1"
          style={{ fill: 'red' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'CAG (gr)') {
    return (
      <SvgIcon {...otherProps}>
        <circle cx="12" cy="12" r="8.5" style={{ fill: '#e8a049' }} />
        <path
          d="M12,5a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-3A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z"
          style={{ fill: '#ffbf53' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'CHF') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#d52b1e' }} />
        <rect x="7" y="10" width="10" height="4" style={{ fill: '#fff' }} />
        <rect x="10" y="7" width="4" height="10" style={{ fill: '#fff' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'CNY') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1.05" y="4" width="21.91" height="16" style={{ fill: '#de2910' }} />
        <polygon
          points="4.71 6.35 5.18 7.77 6.67 7.77 5.46 8.65 5.92 10.07 4.71 9.19 3.5 10.07 3.96 8.65 2.75 7.77 4.25 7.77 4.71 6.35"
          style={{ fill: '#ffde00' }}
        />
        <polygon
          points="8.61 5.6 8.59 6.09 9.04 6.28 8.56 6.4 8.53 6.89 8.27 6.47 7.79 6.6 8.11 6.22 7.84 5.8 8.3 5.98 8.61 5.6"
          style={{ fill: '#ffde00' }}
        />
        <polygon
          points="10.3 7.2 10.07 7.64 10.42 7.99 9.93 7.91 9.71 8.35 9.63 7.86 9.14 7.78 9.58 7.56 9.51 7.07 9.86 7.42 10.3 7.2"
          style={{ fill: '#ffde00' }}
        />
        <polygon
          points="9.79 9.19 9.94 9.66 10.44 9.66 10.04 9.95 10.19 10.42 9.79 10.13 9.39 10.42 9.54 9.95 9.14 9.66 9.64 9.66 9.79 9.19"
          style={{ fill: '#ffde00' }}
        />
        <polygon
          points="8.61 10.7 8.58 11.19 9.04 11.37 8.56 11.49 8.53 11.98 8.27 11.57 7.79 11.69 8.1 11.31 7.84 10.89 8.3 11.08 8.61 10.7"
          style={{ fill: '#ffde00' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'CU (ton)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#da8a67' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#da8a67' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#da8a67' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'CZK') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#d7141a' }} />
        <rect x="1" y="4" width="22" height="8" style={{ fill: '#fff' }} />
        <path d="M12,12,1,4V20Z" style={{ fill: '#11457e' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'DEM') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#fff' }} />
        <rect x="1" y="9.3" width="22" height="5.3" style={{ fill: '#fff' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'DKK') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#c60c30' }} />
        <rect x="6.5" y="4" width="3" height="16" style={{ fill: '#fff' }} />
        <rect x="1" y="10.5" width="22" height="3" style={{ fill: '#fff' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ESP') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#c60b1e' }} />
        <rect x="1" y="8" width="22" height="8" style={{ fill: '#ffc400' }} />
        <path
          d="M5.6,11.2h0Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.008320000022649765px',
          }}
        />
        <path d="M5.3,11.4H6v-.2H5.3Z" style={{ fill: '#c8b100' }} />
        <path
          d="M5.3,11.4H6v-.2H5.3Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M5.4,11.6h0Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M6.1,14.6H5.3v.1H6c0-.1.1,0,.1-.1h0" style={{ fill: '#005bbf' }} />
        <path
          d="M6.1,14.6H5.3v.1H6c0-.1.1,0,.1-.1Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M6.1,14.7H5.3v.1H6a.1.1,0,0,1,.1-.1h0" style={{ fill: '#ccc' }} />
        <path
          d="M6.1,14.7H5.3v.1H6a.1.1,0,0,1,.1-.1h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M6.1,14.7H5.3v.1H6a.1.1,0,0,0,.1-.1h0" style={{ fill: '#005bbf' }} />
        <path
          d="M6.1,14.7H5.3v.1H6a.1.1,0,0,0,.1-.1h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M6.1,14.9H5.3v-.1H6a.1.1,0,0,1,.1.1h0" style={{ fill: '#ccc' }} />
        <path
          d="M6.1,14.9H5.3v-.1H6a.1.1,0,0,1,.1.1h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M6.1,15H5.3v-.1H6a.1.1,0,0,1,.1.1h0" style={{ fill: '#005bbf' }} />
        <path
          d="M6.1,15H5.3v-.1H6a.1.1,0,0,1,.1.1Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M5.3,14.3h0c0,.1,0,.1-.1.1H6a.1.1,0,0,1-.1-.1H5.3" style={{ fill: '#c8b100' }} />
        <path
          d="M5.3,14.3h0c0,.1,0,.1-.1.1H6a.1.1,0,0,1-.1-.1H5.3Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path d="M5.4,14.2h0" style={{ fill: '#c8b100' }} />
        <path
          d="M5.4,14.2h0Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M5.3,14.6H6v-.2H5.3Z" style={{ fill: '#c8b100' }} />
        <path
          d="M5.3,14.6H6v-.2H5.3Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M5.2,13.6a.1.1,0,0,0-.1.1l.1.1a.1.1,0,0,1,.1.1l.1-.1c-.1-.2-.2-.2-.2-.2"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M5.2,13.6a.1.1,0,0,0-.1.1l.1.1a.1.1,0,0,1,.1.1l.1-.1C5.3,13.6,5.2,13.6,5.2,13.6Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M5.4,14.2h.5V11.7H5.4Z" style={{ fill: '#ccc' }} />
        <path
          d="M5.7,11.6v2.5m.1-2.5v2.5"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M5.4,14.2h.5V11.7H5.4Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M6.4,12.6a4.33,4.33,0,0,0-.5-.1H5.7c-.3.1-.5.2-.5.3h0l-.1-.3c0-.1.2-.3.6-.3H6a.75.75,0,0,1,.5.1l-.1.3"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M6.4,12.6a4.33,4.33,0,0,0-.5-.1H5.7c-.3.1-.5.2-.5.3h0l-.1-.3c0-.1.2-.3.6-.3H6a.75.75,0,0,1,.5.1l-.1.3"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path
          d="M5.4,12.9a.37.37,0,0,1-.3-.1.1.1,0,0,1,.1-.1h.1l.1.2"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M5.4,12.9a.37.37,0,0,1-.3-.1.1.1,0,0,1,.1-.1h.1l.1.2"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M5.9,12.7c.1,0,.2,0,.2.1h0l-.2.2v-.3" style={{ fill: '#ad1519' }} />
        <path
          d="M5.9,12.7c.1,0,.2,0,.2.1h0l-.2.2v-.3"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M5,13.4a1.24,1.24,0,0,1,.3-.2c.1,0,.2-.1.3-.1a1.41,1.41,0,0,0,.5-.3h0v.3a1.87,1.87,0,0,1-.4.3,1,1,0,0,0-.3.1c-.1.1-.3.1-.3.2L5,13.4"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M5,13.4a1.24,1.24,0,0,1,.3-.2c.1,0,.2-.1.3-.1a1.41,1.41,0,0,0,.5-.3h0v.3a1.87,1.87,0,0,1-.4.3,1,1,0,0,0-.3.1c-.1.1-.3.1-.3.2L5,13.4Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path
          d="M10.4,11.2h0Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.008320000022649765px',
          }}
        />
        <path d="M10,11.4h.7v-.2H10Z" style={{ fill: '#c8b100' }} />
        <path
          d="M10,11.4h.7v-.2H10Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M10.1,11.6h0Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M9.9,14.6h.8v.1H10c0-.1-.1,0-.1-.1h0" style={{ fill: '#005bbf' }} />
        <path
          d="M9.9,14.6h.8v.1H10c0-.1-.1,0-.1-.1Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M9.9,14.7h.8v.1H10a.1.1,0,0,0-.1-.1h0" style={{ fill: '#ccc' }} />
        <path
          d="M9.9,14.7h.8v.1H10a.1.1,0,0,0-.1-.1h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M9.9,14.7h.8v.1H10a.1.1,0,0,1-.1-.1h0" style={{ fill: '#005bbf' }} />
        <path
          d="M9.9,14.7h.8v.1H10a.1.1,0,0,1-.1-.1h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M9.9,14.9h.8v-.1H10a.1.1,0,0,0-.1.1h0" style={{ fill: '#ccc' }} />
        <path
          d="M9.9,14.9h.8v-.1H10a.1.1,0,0,0-.1.1h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M9.9,15h.8v-.1H10a.1.1,0,0,0-.1.1h0" style={{ fill: '#005bbf' }} />
        <path
          d="M9.9,15h.8v-.1H10a.1.1,0,0,0-.1.1Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M10.7,14.3h0c0,.1,0,.1.1.1H10a.1.1,0,0,0,.1-.1h.6" style={{ fill: '#c8b100' }} />
        <path
          d="M10.7,14.3h0c0,.1,0,.1.1.1H10a.1.1,0,0,0,.1-.1h.6Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path d="M10.1,14.2h0" style={{ fill: '#c8b100' }} />
        <path
          d="M10.1,14.2h0Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M10,14.6h.7v-.2H10Z" style={{ fill: '#c8b100' }} />
        <path
          d="M10,14.6h.7v-.2H10Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M10.8,13.6a.1.1,0,0,1,.1.1l-.1.1a.1.1,0,0,0-.1.1l-.1-.1c.1-.2.2-.2.2-.2"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M10.8,13.6a.1.1,0,0,1,.1.1l-.1.1a.1.1,0,0,0-.1.1l-.1-.1C10.7,13.6,10.8,13.6,10.8,13.6Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M10.1,14.2h.5V11.7h-.5Z" style={{ fill: '#ccc' }} />
        <path
          d="M10.5,11.6v2.5m.1-2.5v2.5"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M10.1,14.2h.5V11.7h-.5Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M9.6,12.6a4.33,4.33,0,0,1,.5-.1h.2c.3.1.5.2.5.3h0l.1-.3c0-.1-.2-.3-.6-.3H10a.75.75,0,0,0-.5.1l.1.3"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M9.6,12.6a4.33,4.33,0,0,1,.5-.1h.2c.3.1.5.2.5.3h0l.1-.3c0-.1-.2-.3-.6-.3H10a.75.75,0,0,0-.5.1l.1.3"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path
          d="M10.7,12.9a.37.37,0,0,0,.3-.1.1.1,0,0,0-.1-.1h-.1l-.1.2"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M10.7,12.9a.37.37,0,0,0,.3-.1.1.1,0,0,0-.1-.1h-.1l-.1.2"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path d="M10.1,12.7c-.1,0-.2,0-.2.1h0l.2.2v-.3" style={{ fill: '#ad1519' }} />
        <path
          d="M10.1,12.7c-.1,0-.2,0-.2.1h0l.2.2v-.3"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M11,13.4a1.24,1.24,0,0,0-.3-.2c-.1,0-.2-.1-.3-.1a1.41,1.41,0,0,1-.5-.3h0v.3a1.87,1.87,0,0,0,.4.3,1,1,0,0,1,.3.1c.1.1.3.1.3.2l.1-.3"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M11,13.4a1.24,1.24,0,0,0-.3-.2c-.1,0-.2-.1-.3-.1a1.41,1.41,0,0,1-.5-.3h0v.3a1.87,1.87,0,0,0,.4.3,1,1,0,0,1,.3.1c.1.1.3.1.3.2l.1-.3Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path
          d="M7.2,10.4h0c.1-.1.1,0,0,0Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.0015999999595806003px' }}
        />
        <path
          d="M8,9.8a.75.75,0,0,1,.5.1.37.37,0,0,0,.3.1H9a.37.37,0,0,1,.3.1.22.22,0,0,1,.2.2H9.4v.1l-.1.2-.1.1-.2.1H8.9v.1L8,10.7l-1.1.1v-.1H6.8l-.2-.1-.1-.1-.1-.2v-.1H6.3l.2-.2h.7a.37.37,0,0,0,.3-.1A4.33,4.33,0,0,1,8,9.8Z"
          style={{ fill: '#ad1519;stroke:#000;stroke-width:0.008320000022649765px' }}
        />
        <path
          d="M8,11.2a3.08,3.08,0,0,1-1-.1H7A3.08,3.08,0,0,1,8,11a3.08,3.08,0,0,1,1,.1H9a3.08,3.08,0,0,1-1,.1"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8,11.2a2.22,2.22,0,0,1-.9-.1A2.22,2.22,0,0,1,8,11a2.22,2.22,0,0,1,.9.1c-.2,0-.5.1-.9.1"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M8,11.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.0028800000436604023px' }}
        />
        <path
          d="M8,11.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.004480000119656324px' }}
        />
        <path
          d="M7.9,11.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.005760000087320805px' }}
        />
        <path
          d="M7.9,11.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.007360000163316727px' }}
        />
        <path
          d="M7.8,11.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.008960000239312649px' }}
        />
        <path
          d="M7.7,11.2V11m.1.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.01056000031530857px' }}
        />
        <path
          d="M7.6,11.2V11m.1.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.011839999817311764px' }}
        />
        <path
          d="M7.5,11.2V11m.1.2V11m0,.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.013439999893307686px' }}
        />
        <path
          d="M7.5,11.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.014720000326633453px' }}
        />
        <path
          d="M7.5,11.1V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.0163199994713068px' }}
        />
        <path
          d="M7.4,11.1V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.017920000478625298px' }}
        />
        <path
          d="M7.3,11.1V11m.1.1V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.019200000911951065px' }}
        />
        <path
          d="M8.3,11.2V11m-.1.2V11m-.1.2V11"
          style={{ fill: 'none;stroke:#000;stroke-width:0.0015999999595806003px' }}
        />
        <path
          d="M8,10.9c-.4,0-.8.1-1,.1v-.1a.1.1,0,0,0-.1-.1A3.75,3.75,0,0,1,8,10.7c.4,0,.8.1,1.1.1l-.1.1V11c-.2,0-.6-.1-1-.1"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8,10.7c-.4,0-.8.1-1.1.1h0A3.75,3.75,0,0,1,8,10.7a2,2,0,0,1,1.1.1h0c-.3,0-.7-.1-1.1-.1"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8,11.2a2.22,2.22,0,0,1-.9-.1A2.22,2.22,0,0,1,8,11a2.22,2.22,0,0,1,.9.1C8.7,11.1,8.4,11.2,8,11.2Z"
          style={{
            fill: 'none;stroke:#000;stroke-linejoin:round;stroke-width:0.012480000033974648px',
          }}
        />
        <path
          d="M8,10.9H8"
          style={{ fill: '#ad1519;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M7,11.1A3.08,3.08,0,0,1,8,11a3.08,3.08,0,0,1,1,.1"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M7.2,10.1h0l.1-.1c-.1,0-.1-.1-.1-.2h0a.45.45,0,0,1,.4-.3.37.37,0,0,1,.3.1V9.5c-.1,0-.2-.1-.3-.1s-.4.1-.4.3h0c-.1.2,0,.3,0,.4h0"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M7.2,10.1h0l.1-.1c-.1,0-.1-.1-.1-.2h0a.45.45,0,0,1,.4-.3.37.37,0,0,1,.3.1V9.5c-.1,0-.2-.1-.3-.1s-.4.1-.4.3h0c-.1.2,0,.3,0,.4h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M7.2,10.1c-.1,0-.1-.1-.1-.2s.1-.2.2-.3c-.1.1-.2.1-.2.2h0c0,.1.1.2.1.3h0"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M7.2,10.1c-.1,0-.1-.1-.1-.2s.1-.2.2-.3c-.1.1-.2.1-.2.2h0c0,.1.1.2.1.3h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M6.5,10.2c0-.1-.1-.1-.1-.2V9.9A.85.85,0,0,1,7,9.7H7a.76.76,0,0,0-.5.2v.3h0"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M6.5,10.2c0-.1-.1-.1-.1-.2V9.9A.85.85,0,0,1,7,9.7H7a.76.76,0,0,0-.5.2v.3Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M6.6,9.8a.1.1,0,0,0-.1.1V10c0,.1,0,.1.1.2l-.1.1c0-.1-.1-.1-.1-.2s0-.2.2-.3"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M6.6,9.8a.1.1,0,0,0-.1.1V10c0,.1,0,.1.1.2l-.1.1c0-.1-.1-.1-.1-.2S6.4,9.9,6.6,9.8Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8,9.5c.1,0,.1,0,.1.1v.1h0V10l-.1.2L7.8,10V9.7h0V9.6c.1-.1.1-.1.2-.1"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M8,9.5c.1,0,.1,0,.1.1v.1h0V10l-.1.2L7.8,10V9.7h0V9.6c.1-.1.1-.1.2-.1Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8,9.5H8c.1.1.1.1.1.2h0V10l-.1.1L7.9,10V9.7h0A.31.31,0,0,1,8,9.5H8"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M8,9.5H8c.1.1.1.1.1.2h0V10l-.1.1L7.9,10V9.7h0A.31.31,0,0,1,8,9.5Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8.8,10.1h0L8.7,10c.1,0,.1-.1.1-.2h0a.45.45,0,0,0-.4-.3.37.37,0,0,0-.3.1V9.5c.1,0,.2-.1.3-.1s.4.1.4.3h0c.1.2,0,.3,0,.4h0"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M8.8,10.1h0L8.7,10c.1,0,.1-.1.1-.2h0a.45.45,0,0,0-.4-.3.37.37,0,0,0-.3.1V9.5c.1,0,.2-.1.3-.1s.4.1.4.3h0c.1.2,0,.3,0,.4h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M9.5,10.2c0-.1.1-.1.1-.2V9.9A.85.85,0,0,0,9,9.7H9a.76.76,0,0,1,.5.2v.3h0"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M9.5,10.2c0-.1.1-.1.1-.2V9.9A.85.85,0,0,0,9,9.7H9a.76.76,0,0,1,.5.2v.3Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M9.4,9.8a.1.1,0,0,1,.1.1V10c0,.1,0,.1-.1.2l.1.1c0-.1.1-.1.1-.2s0-.2-.2-.3"
          style={{ fill: '#c8b100' }}
        />
        <path
          d="M9.4,9.8a.1.1,0,0,1,.1.1V10c0,.1,0,.1-.1.2l.1.1c0-.1.1-.1.1-.2S9.6,9.9,9.4,9.8Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M7.9,9.4a.1.1,0,1,1,.1.1.1.1,0,0,1-.1-.1"
          style={{ fill: '#005bbf;stroke:#000;stroke-width:0.008320000022649765px' }}
        />
        <path
          d="M8,9H8l-.1.1H8v.2H7.9v.1h.2V9.3H8V9.1h.1V9Z"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.008320000022649765px' }}
        />
        <path
          d="M8,15a2.66,2.66,0,0,1-1.2-.3.67.67,0,0,1-.4-.7V13H9.6v1.1a.84.84,0,0,1-.4.7A5,5,0,0,1,8,15"
          style={{ fill: '#ccc' }}
        />
        <path
          d="M8,15a2.66,2.66,0,0,1-1.2-.3.67.67,0,0,1-.4-.7V13H9.6v1.1a.84.84,0,0,1-.4.7A5,5,0,0,1,8,15Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path d="M8,13H9.6V11.2H8Z" style={{ fill: '#ccc' }} />
        <path
          d="M8,13H9.6V11.2H8Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8,14.1a.86.86,0,0,1-.8.8.79.79,0,0,1-.8-.8V13H8v1.1"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M6.8,14.7c.1,0,.1.1.2.1V13H6.8Z"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M6.4,14.1a.76.76,0,0,0,.2.5V13H6.4Z"
          style={{
            fill: '#c8b100;stroke:#000;stroke-linejoin:round;stroke-width:0.01600000075995922px',
          }}
        />
        <path
          d="M7.1,14.8h.2V13H7.1Z"
          style={{ fill: '#c7b500;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M7.5,14.8a.35.35,0,0,0,.2-.1V13H7.5Z"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path d="M6.4,13H8V11.2H6.4Z" style={{ fill: '#ad1519' }} />
        <path
          d="M6.4,13H8V11.2H6.4Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M7.8,14.5c.1,0,.2-.2.2-.4V13H7.8Z"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8,14.1a.86.86,0,0,1-.8.8.79.79,0,0,1-.8-.8V13H8v1.1"
          style={{ fill: 'none;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M9.6,13v1.1a.86.86,0,0,1-.8.8.79.79,0,0,1-.8-.8V13H9.6"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M9.6,13v1.1a.86.86,0,0,1-.8.8.79.79,0,0,1-.8-.8V13H9.6"
          style={{ fill: 'none;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8.1,14.5a.1.1,0,0,1,.1.1c0,.1-.1.1-.2.1a.35.35,0,0,1-.2-.1c0-.1,0-.1.1-.1h.2"
          style={{ fill: '#ffd691;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8,14.9a.35.35,0,0,0-.2-.1H7.7l.1.1H8"
          style={{ fill: '#058e6e;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8,14.9a.35.35,0,0,1,.2-.1h.2l-.1.1H8"
          style={{ fill: '#058e6e;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8,14.8l-.1-.1a.1.1,0,0,1,.1-.1l.1.1a.1.1,0,0,1-.1.1"
          style={{ fill: '#ad1519;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8,15H8v-.2H8V15H8"
          style={{ fill: '#058e6e;stroke:#000;stroke-width:0.01664000004529953px' }}
        />
        <path
          d="M8.8,10.1h0"
          style={{ fill: '#fff;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M8.1,9.5Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.012480000033974648px' }}
        />
        <path
          d="M7.5,12.8h0m0-.2h0m.1,0h0m-.1.1h0m0-.1h0m.1,0h0m-.1-.2h0m0-.4h0m0,0h0m0-.1h0m0,0h0"
          style={{ fill: '#c8b100;stroke:#000;stroke-width:0.014720000326633453px' }}
        />
        <path
          d="M7.5,13a.56.56,0,0,1,.5-.6.61.61,0,0,1,0,1.2.56.56,0,0,1-.5-.6"
          style={{ fill: '#ad1519' }}
        />
        <path
          d="M7.5,13a.56.56,0,0,1,.5-.6.61.61,0,0,1,0,1.2A.56.56,0,0,1,7.5,13Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.019519999623298645px' }}
        />
        <path d="M7.6,13a.4.4,0,1,1,.4.4.43.43,0,0,1-.4-.4" style={{ fill: '#005bbf' }} />
        <path
          d="M7.6,13a.4.4,0,1,1,.4.4A.43.43,0,0,1,7.6,13Z"
          style={{ fill: 'none;stroke:#000;stroke-width:0.019519999623298645px' }}
        />
        <path
          d="M5.7,11.2h0m-.1,0h0m0,0h0"
          style={{ fill: 'none;stroke:#000;stroke-width:0.00031999999191612005px' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'EUR') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#09509e' }} />
        <polyline
          points="12.16 6.87 12.8 6.87 12.29 7.25 12.48 7.87 11.97 7.49 11.46 7.87 11.66 7.25 11.14 6.87 11.78 6.87 11.97 6.27 12.16 6.87"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="12.19 16.73 12.83 16.73 12.31 17.11 12.51 17.73 12 17.35 11.49 17.73 11.69 17.11 11.17 16.73 11.81 16.73 12 16.13 12.19 16.73"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="14.63 16.07 15.27 16.07 14.76 16.46 14.95 17.07 14.44 16.7 13.93 17.07 14.13 16.46 13.61 16.07 14.25 16.07 14.44 15.48 14.63 16.07"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="14.63 7.52 15.27 7.52 14.76 7.9 14.95 8.52 14.44 8.14 13.93 8.52 14.13 7.9 13.61 7.52 14.25 7.52 14.44 6.92 14.63 7.52"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="16.44 9.33 17.08 9.33 16.57 9.72 16.77 10.33 16.25 9.95 15.74 10.33 15.94 9.72 15.43 9.33 16.06 9.33 16.25 8.73 16.44 9.33"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="16.44 14.29 17.08 14.29 16.57 14.67 16.77 15.29 16.25 14.91 15.74 15.29 15.94 14.67 15.43 14.29 16.06 14.29 16.25 13.69 16.44 14.29"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="17.12 11.77 17.76 11.77 17.25 12.16 17.45 12.77 16.93 12.39 16.42 12.77 16.62 12.16 16.11 11.77 16.74 11.77 16.93 11.18 17.12 11.77"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="9.67 7.53 10.31 7.53 9.8 7.91 10 8.52 9.48 8.14 8.97 8.52 9.18 7.91 8.66 7.53 9.29 7.53 9.48 6.93 9.67 7.53"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="7.91 9.34 8.55 9.34 8.04 9.72 8.23 10.33 7.72 9.96 7.21 10.33 7.41 9.72 6.89 9.34 7.53 9.34 7.72 8.74 7.91 9.34"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="7.26 11.78 7.89 11.78 7.38 12.16 7.58 12.78 7.07 12.4 6.56 12.78 6.76 12.16 6.24 11.78 6.88 11.78 7.07 11.18 7.26 11.78"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="7.91 14.29 8.55 14.29 8.04 14.68 8.23 15.29 7.72 14.91 7.21 15.29 7.41 14.68 6.89 14.29 7.53 14.29 7.72 13.7 7.91 14.29"
          style={{ fill: '#fbed21' }}
        />
        <polyline
          points="9.7 16.08 10.34 16.08 9.82 16.47 10.02 17.08 9.51 16.7 9 17.08 9.2 16.47 8.68 16.08 9.32 16.08 9.51 15.49 9.7 16.08"
          style={{ fill: '#fbed21' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'FIM') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#fff' }} />
        <rect x="1" y="10" width="22" height="4" style={{ fill: '#003580' }} />
        <rect x="7" y="4" width="4" height="16" style={{ fill: '#003580' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'FRF') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="7.33" height="16" style={{ fill: '#1e3364' }} />
        <rect x="8.33" y="4" width="7.33" height="16" style={{ fill: '#fff' }} />
        <rect x="15.67" y="4" width="7.33" height="16" style={{ fill: '#ee4136' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'GBP') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#273376' }} />
        <polygon
          points="23 9.6 14.2 9.6 14.2 4 9.8 4 9.8 9.6 1 9.6 1 14.4 9.8 14.4 9.8 20 14.2 20 14.2 14.4 23 14.4 23 9.6"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="23 18.16 3.52 4 1 4 1 5.85 20.46 20 23 20 23 18.16"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="1 18.16 20.48 4 23 4 23 5.85 3.54 20 1 20 1 18.16"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="23 10.6 13.28 10.6 13.28 4 10.72 4 10.72 10.6 1 10.6 1 13.4 10.72 13.4 10.72 20 13.28 20 13.28 13.4 23 13.4 23 10.6"
          style={{ fill: '#ce202c' }}
        />
        <polygon
          points="23 19.95 23 18.69 17.09 14.4 15.35 14.4 23 19.95"
          style={{ fill: '#ce202c' }}
        />
        <polygon
          points="23 4 21.26 4 14.2 9.12 14.2 9.6 15.28 9.6 23 4 23 4"
          style={{ fill: '#ce202c' }}
        />
        <polygon
          points="8.66 14.4 1 19.95 1 20 2.68 20 9.8 14.83 9.8 14.4 8.66 14.4"
          style={{ fill: '#ce202c' }}
        />
        <polygon points="1 4.01 1 5.27 6.96 9.6 8.7 9.6 1 4.01" style={{ fill: '#ce202c' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'GMS (gr)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#C0C0C0' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#C0C0C0' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#C0C0C0' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'IEP') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4.04" width="7.5" height="16" style={{ fill: '#169b62' }} />
        <rect x="8.3" y="4.04" width="7.3" height="16" style={{ fill: '#fff' }} />
        <rect x="15.5" y="4.04" width="7.5" height="16" style={{ fill: '#ff883e' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ITL') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="7.5" height="16" style={{ fill: '#009246' }} />
        <rect x="8.3" y="4" width="7.3" height="16" style={{ fill: '#fff' }} />
        <rect x="15.5" y="4" width="7.5" height="16" style={{ fill: '#ce2b37' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'JPY') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1.1" y="4.1" width="21.8" height="15.8" style={{ fill: '#f9f9f9' }} />
        <path d="M22.8,4.3V19.8H1.3V4.3H22.8M23,4H1V20H23V4Z" style={{ fill: '#f2f2f2' }} />
        <circle cx="12" cy="12" r="5" style={{ fill: '#bc002d' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'KWD') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="6" style={{ fill: '#007a3d' }} />
        <rect x="1" y="10" width="22" height="4" style={{ fill: '#fff' }} />
        <rect x="1" y="14" width="22" height="6" style={{ fill: '#ce1126' }} />
        <polygon points="1 4 7 10 7 14 1 20 1 4" />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'LUF') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="12" width="22" height="8" style={{ fill: '#00a1de' }} />
        <rect x="1" y="4" width="22" height="8" style={{ fill: '#ed2939' }} />
        <rect x="1" y="9.3" width="22" height="5.3" style={{ fill: '#fff' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'MYR') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#dc241f' }} />
        <rect x="1" y="15.08" width="22" height="1.23" style={{ fill: '#fff' }} />
        <rect x="1" y="12.61" width="22" height="1.23" style={{ fill: '#fff' }} />
        <rect x="1" y="17.54" width="22" height="1.23" style={{ fill: '#fff' }} />
        <rect x="1" y="7.69" width="22" height="1.23" style={{ fill: '#fff' }} />
        <rect x="1" y="5.23" width="22" height="1.23" style={{ fill: '#fff' }} />
        <rect x="1" y="10.15" width="22" height="1.23" style={{ fill: '#fff' }} />
        <rect x="1" y="4" width="9.9" height="9.1" style={{ fill: '#010066' }} />
        <path
          d="M4.9,6A2.52,2.52,0,0,0,2.3,8.6a2.58,2.58,0,0,0,2.6,2.6,3.26,3.26,0,0,0,1.4-.4,2,2,0,0,1-.8.1,2.3,2.3,0,0,1,0-4.6c.3,0,.6.1.8.1A2.3,2.3,0,0,0,4.9,6Z"
          style={{ fill: '#fc0' }}
        />
        <path
          d="M9.2,9.9,8.1,9.3l.3,1.2-.7-1-.2,1.2L7.2,9.5l-.7,1,.3-1.2-1.1.6L6.5,9H5.3l1.1-.5L5.3,8.1l1.2.1-.8-1,1.1.6L6.5,6.6l.7,1,.2-1.2.2,1.2.7-1L8.1,7.8l1.1-.6-.8.9H9.6l-1.1.5,1.1.5L8.4,9Z"
          style={{ fill: '#fc0' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'NI (ton)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#bdbaae' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#bdbaae' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#bdbaae' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'NLG') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#fff' }} />
        <rect x="1" y="4" width="22" height="5.5" style={{ fill: '#ae1c28' }} />
        <rect x="1" y="14.5" width="22" height="5.5" style={{ fill: '#21468b' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'NOK') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#ef2b2d' }} />
        <rect x="7" y="4" width="4" height="16" style={{ fill: '#fff' }} />
        <rect x="1" y="10" width="22" height="4" style={{ fill: '#fff' }} />
        <rect x="8" y="4" width="2" height="16" style={{ fill: '#002868' }} />
        <rect x="1" y="11" width="22" height="2" style={{ fill: '#002868' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'PB (ton)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#808080' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#808080' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#808080' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'PHP') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#0038a8' }} />
        <rect x="1" y="12" width="22" height="8" style={{ fill: '#ce1126' }} />
        <path d="M12.5,12,1,20V4" style={{ fill: '#fff' }} />
        <path
          d="M7.3,12.2l.2-.2-.2-.2-1.2.1v-.1l1.1-.1-.1-.1-1,.2a.52.52,0,0,0-.2-.4l.8-.6v-.2l-.9.7v-.1l.9-.8v-.2H6.5l-.8.9H5.6l.7-.9H6.1l-.5.8c-.1-.1-.3-.1-.4-.2l.2-1-.2-.1L5,10.8H4.9L5,9.6l-.1-.2-.2.2.1,1.2H4.7L4.6,9.7l-.1.1.2,1a.52.52,0,0,0-.4.2l-.6-.8H3.5l.7.8H4.1l-.8-.9H3.1v.2l.9.9v.1l-1-.7v.2l.8.6c-.1.1-.1.3-.2.4l-1-.2-.1.1,1.1.1v.1l-1.2-.1-.1.2.2.2,1.2-.1v.1l-1.1.1.1.1,1-.2a.52.52,0,0,0,.2.4l-.9.6v.2l.9-.7v.1l-.9.8v.2h.2l.8-.9h.1l-.7.9h.2l.6-.8c.1.1.3.1.4.2l-.2,1,.1.1.1-1.1h.1l-.1,1.2.2.2.2-.2V13.2h.1l.1,1.1.1-.1-.2-1a.52.52,0,0,0,.4-.2l.6.8h.2L5.6,13h.1l.8.9h.2v-.2l-.9-.8v-.1l.9.7v-.2l-.8-.6c.1-.2.1-.3.2-.5l1,.2.1-.1-1.1-.1v-.1Z"
          style={{ fill: '#fcd116' }}
        />
        <polygon
          points="10.4 11.8 10.4 11.4 10.1 11.7 9.7 11.6 10 12 9.7 12.4 10.1 12.3 10.4 12.6 10.4 12.2 10.9 12 10.4 11.8"
          style={{ fill: '#fcd116' }}
        />
        <polygon
          points="2.7 17.6 2.2 17.6 2 17.2 1.9 17.6 1.4 17.7 1.8 18 1.7 18.4 2.1 18.1 2.5 18.4 2.3 17.9 2.7 17.6"
          style={{ fill: '#fcd116' }}
        />
        <polygon
          points="2.3 5.9 2.5 5.5 2.1 5.7 1.7 5.4 1.8 5.9 1.4 6.1 1.9 6.2 2 6.6 2.2 6.2 2.7 6.2 2.3 5.9"
          style={{ fill: '#fcd116' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'PLD (gr)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#68a864' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#68a864' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#68a864' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'PLT (gr)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#6286d3' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#6286d3' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#6286d3' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'PTE') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: 'red' }} />
        <rect x="1" y="4" width="8.8" height="16" style={{ fill: '#060' }} />
        <path
          d="M13.3,14.8c-1.4,0-7.6-3.9-7.6-4.5L6,9.7c.6.9,7,4.7,7.6,4.5l-.3.6"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M6,9.6c-.2.3,1.6,1.4,3.7,2.7a15.67,15.67,0,0,0,4,2l.1-.1h-.2a20,20,0,0,1-3.9-2A21.88,21.88,0,0,1,6,9.6V9.5H6v.1Zm7.3,5.2h-.1a20.12,20.12,0,0,1-3.9-1.9c-2.1-1.3-3.9-2.4-3.7-2.7l.1-.1h0c-.2.5,3.5,2.6,3.7,2.7a16,16,0,0,0,3.9,2Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,10.6a12,12,0,0,0,4-.6l-.2-.3a14.26,14.26,0,0,1-3.8.6C8,10.2,6.7,10.1,6,9.6l-.2.4a9.92,9.92,0,0,0,4,.6"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M13.9,10.1a3.55,3.55,0,0,1-1.6.4,14.73,14.73,0,0,1-2.5.2c-1,0-1.8-.1-2.4-.1-1-.2-1.5-.4-1.7-.4v-.1a7.49,7.49,0,0,0,1.6.4,14,14,0,0,0,2.3.2,16.86,16.86,0,0,0,2.5-.2c.9-.2,1.5-.4,1.5-.4Zm-.2-.4a3.4,3.4,0,0,1-1.5.4,14,14,0,0,1-2.3.2c-.9,0-1.7-.1-2.3-.1A4.6,4.6,0,0,1,6,9.7a.1.1,0,0,1,.1-.1,2.91,2.91,0,0,0,1.5.4,14.84,14.84,0,0,0,2.3.1,13,13,0,0,0,2.3-.2,6.27,6.27,0,0,0,1.5-.4v.2Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M5.4,12.3a12.2,12.2,0,0,0,4.4.7,11.17,11.17,0,0,0,4.5-.7v-.4c-.2.4-2.5.7-4.5.7a10.36,10.36,0,0,1-4.4-.7v.4"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M14.3,12.2v.1a5,5,0,0,1-1.8.5,19.1,19.1,0,0,1-2.8.2,17.19,17.19,0,0,1-2.6-.2,8.62,8.62,0,0,1-1.9-.5v-.1a4.49,4.49,0,0,0,1.9.5,17.19,17.19,0,0,0,2.6.2,18.7,18.7,0,0,0,2.7-.2,5,5,0,0,0,1.9-.5Zm0-.4v.1a5,5,0,0,1-1.8.5,19.1,19.1,0,0,1-2.8.2,17.19,17.19,0,0,1-2.6-.2,8.62,8.62,0,0,1-1.9-.5v-.1a4.49,4.49,0,0,0,1.9.5,17.19,17.19,0,0,0,2.6.2,18.7,18.7,0,0,0,2.7-.2,5,5,0,0,0,1.9-.5Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,14.7a13.9,13.9,0,0,1-3.9-.6l.3.4a10.43,10.43,0,0,0,3.7.6,9,9,0,0,0,3.6-.6l.3-.4a14.67,14.67,0,0,1-4,.6"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M13.5,14.4c0,.1-.1.1-.1.2-.4.1-1.1.3-1.4.4a15.16,15.16,0,0,1-2.3.2A12.06,12.06,0,0,1,6,14.6v-.2h.1a11.93,11.93,0,0,0,3.7.6,13.79,13.79,0,0,0,2.2-.2,4.86,4.86,0,0,0,1.5-.4Zm.3-.4h0a.1.1,0,0,1-.1.1,5.83,5.83,0,0,1-1.7.4,9.82,9.82,0,0,1-2.1.2,18.26,18.26,0,0,1-4-.6L5.8,14a17.56,17.56,0,0,0,4,.6,9.82,9.82,0,0,0,2.1-.2,8,8,0,0,0,1.7-.4h.2Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.024692360311746597px',
          }}
        />
        <path
          d="M13.8,11.9a3.93,3.93,0,0,1-1.2,2.9,4,4,0,0,1-5.7,0A4.82,4.82,0,0,1,5.7,12,4.08,4.08,0,0,1,7.1,9,4.8,4.8,0,0,1,9.9,8a4,4,0,0,1,3,1.5,4.33,4.33,0,0,1,.9,2.4Zm-4-4.3A4.53,4.53,0,0,1,14.3,12a4.46,4.46,0,0,1-4.5,4.4,4.4,4.4,0,0,1,0-8.8"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,7.6A4.4,4.4,0,1,1,5.4,12,4.37,4.37,0,0,1,9.8,7.6ZM5.4,12A4.3,4.3,0,1,0,9.7,7.7,4.33,4.33,0,0,0,5.4,12Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,7.9A4.1,4.1,0,1,1,5.7,12,4.19,4.19,0,0,1,9.8,7.9ZM5.8,12a4,4,0,1,0,4-4,4,4,0,0,0-4,4Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M10,7.5H9.6v8.9H10Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.9,7.5h0l.1,9H9.9v-9Zm-.3,0h0l.1,9H9.6v-9Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M14.2,12.2v-.3l-.2-.3-1.5-.4L10.2,11l-2.6.1-1.9.4-.4.3v.3l1-.4,2.3-.4h2.2l1.6.2,1.1.3Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,11.3a12.92,12.92,0,0,1,2.9.3,4.38,4.38,0,0,1,1.6.6v.1a3,3,0,0,0-1.6-.6,12.31,12.31,0,0,0-2.9-.3,12.31,12.31,0,0,0-2.9.3,3.54,3.54,0,0,0-1.6.6v-.1c.1-.2.7-.4,1.6-.6a12.31,12.31,0,0,1,2.9-.3Zm0-.4a12.92,12.92,0,0,1,2.9.3,4.38,4.38,0,0,1,1.6.6v.1a3,3,0,0,0-1.6-.6A12.31,12.31,0,0,0,9.8,11a12.31,12.31,0,0,0-2.9.3,3.54,3.54,0,0,0-1.6.6v-.1c.1-.2.7-.4,1.6-.6a12.31,12.31,0,0,1,2.9-.3Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,9a8.77,8.77,0,0,1,3.8.6l.2.4a10.65,10.65,0,0,0-4-.6,11.24,11.24,0,0,0-4,.6l.3-.5A11.75,11.75,0,0,1,9.8,9"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,9.3a19.66,19.66,0,0,1,2.6.2,4,4,0,0,1,1.4.4l.1.1a5.92,5.92,0,0,0-1.5-.4,18.36,18.36,0,0,0-2.6-.2,17.19,17.19,0,0,0-2.6.2c-.8.2-1.3.4-1.4.4l.1-.1a3.93,3.93,0,0,1,1.3-.4,17.19,17.19,0,0,1,2.6-.2Zm0-.3a9.75,9.75,0,0,1,2.5.2,6.83,6.83,0,0,1,1.3.4l.1.2a3.17,3.17,0,0,0-1.4-.5A17.14,17.14,0,0,0,9.8,9c-.9.1-1.8.1-2.5.2a4.93,4.93,0,0,0-1.2.4l.1-.1a5.31,5.31,0,0,1,1.1-.3A9.37,9.37,0,0,1,9.8,9Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M12,13.9a9,9,0,0,0-2.2-.2c-2.8,0-3.6.6-3.8.7l-.2-.3a7.74,7.74,0,0,1,4-.8,16.59,16.59,0,0,1,2.4.2l-.2.4"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M9.8,13.6a7.84,7.84,0,0,1,2.2.2v.1a15,15,0,0,0-2.2-.2,13.58,13.58,0,0,0-2.9.3c-.3.1-.8.3-.8.4H6c0-.1.3-.3.8-.4a10.32,10.32,0,0,1,3-.4Zm0-.4a19.42,19.42,0,0,1,2.4.2l-.1.1a15.42,15.42,0,0,0-2.4-.2,11,11,0,0,0-3.1.4c-.3.1-.9.3-.9.5l-.1-.1c0-.1.5-.3.9-.5a21.09,21.09,0,0,1,3.3-.4Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.024692360311746597px',
          }}
        />
        <path
          d="M13.7,14.1l-.3.5-1-.8L10,12.1,7.2,10.6l-1.4-.5.3-.6.1-.1.9.2,3,1.5,1.7,1.1,1.4,1,.6.7Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M5.7,10.1c.3-.1,2.1.7,4.1,1.9s3.8,2.5,3.6,2.8l-.1.1h0v-.1c-.1-.3-1.4-1.3-3.6-2.6s-3.9-2-4.1-1.8l.1-.3Zm8.1,4c.2-.3-1.6-1.6-3.7-2.9S6.3,9.3,6,9.5v.1h.2a15,15,0,0,1,3.9,1.8c.8.4,3.7,2.2,3.7,2.7l-.1.1.1-.1Z"
          style={{
            fill:
              '#ff0;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.025724949315190315px',
          }}
        />
        <path
          d="M7.1,12.5a2.73,2.73,0,0,0,.8,1.9,2.56,2.56,0,0,0,1.9.8,2.73,2.73,0,0,0,1.9-.8,2.56,2.56,0,0,0,.8-1.9h0V8.9H7.2l-.1,3.6Z"
          style={{ fill: '#fff;stroke:#000;stroke-width:0.0300963893532753px' }}
        />
        <path
          d="M7.2,12.5h0A2.5,2.5,0,0,0,8,14.3a2.41,2.41,0,0,0,1.8.7,2.87,2.87,0,0,0,1.8-.7,2.41,2.41,0,0,0,.7-1.8h0V9.1H7.2v3.4m4.1-2.4v2.4h0v.2a1.8,1.8,0,0,1-.4.9,1.5,1.5,0,0,1-1.1.4,1.72,1.72,0,0,1-1.6-1.6V10l3.1.1Z"
          style={{ fill: 'red;stroke:#000;stroke-width:0.0227771308273077px' }}
        />
        <path d="M7.6,10a.37.37,0,0,1,.2-.3A.37.37,0,0,1,8,10H7.6" style={{ fill: '#ff0' }} />
        <path
          d="M7.4,9.7V10h.2a.37.37,0,0,1,.2-.3A.37.37,0,0,1,8,10h.2V9.7Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,9.9h0c0,.1-.1.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.6,9.9a.35.35,0,0,1,.1-.2s.1,0,.1.2H7.6"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,9.5h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,9.6h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.6,9.1h.3v.1H7.7c-.1,0-.1,0-.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.8,9.2v.3H7.6V9.2h.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.6,9.4v.2H7.4V9.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.1,9.4v.2H7.9V9.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,9.3h.2v.1H7.4V9.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.9,9.3h.2v.1H7.9V9.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M7.6,12a.37.37,0,0,1,.2-.3A.37.37,0,0,1,8,12H7.6" style={{ fill: '#ff0' }} />
        <path
          d="M7.4,11.7V12h.2a.37.37,0,0,1,.2-.3A.37.37,0,0,1,8,12h.2v-.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,12h0c0,.1-.1.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.6,12a.35.35,0,0,1,.1-.2s.1,0,.1.2H7.6"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,11.6h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,11.7h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.6,11.2h.3v.1H7.7c-.1,0-.1,0-.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.8,11.3v.3H7.6v-.3h.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.6,11.5v.2H7.4v-.2Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.1,11.5v.2H7.9v-.2Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.4,11.3h.2v.1H7.4v-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.9,11.3h.2v.1H7.9v-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M8.4,14.2c-.2-.2-.1-.3-.1-.3a.35.35,0,0,1,.4.1l-.3.2" style={{ fill: '#ff0' }} />
        <path
          d="M8.1,14.1l.2.2.1-.1c-.2-.2-.1-.3-.1-.3a.22.22,0,0,1,.3.1l.1-.1-.2-.2-.4.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.2,14.3l.5-.5h0l-.5.5c.1.1,0,.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.4,14.1a.31.31,0,0,1-.1-.2.31.31,0,0,1,.2.1l-.1.1"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8,14l.5-.5h0L8,14H8C7.9,14.1,7.9,14,8,14Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8,14.1l.5-.5h0l-.5.5Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.8,13.6h0l.1-.1h0l.1.1H7.8Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.1,13.5l.2.2-.1.1L8,13.6l.1-.1"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8,13.8l.1.1L8,14l-.1-.1.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.3,13.4l.1.1-.1.1-.1-.1.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M7.8,13.8h0l.1-.1H8l-.2.1c.1.1,0,.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M8.1,13.5h0l.1-.1h0l.1.1H8.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M8,13.9c-.1,0,0-.1,0,0H8" />
        <path d="M9.6,10a.37.37,0,0,1,.2-.3.37.37,0,0,1,.2.3H9.6" style={{ fill: '#ff0' }} />
        <path
          d="M9.5,9.7V10h.2a.37.37,0,0,1,.2-.3.37.37,0,0,1,.2.3h.2V9.7Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.4,9.9h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.7,9.9a.35.35,0,0,1,.1-.2s.1,0,.1.2H9.7"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.4,9.5h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.5,9.6h0c-.1.1-.1,0,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.7,9.1H10v.1H9.7V9.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.9,9.2v.3H9.7V9.2h.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.7,9.4v.2H9.5V9.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M10.1,9.4v.2H9.9V9.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.4,9.3h.2v.1H9.5a.1.1,0,0,1-.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M9.9,9.3h.2v.1H9.9V9.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M12,10a.37.37,0,0,0-.2-.3.37.37,0,0,0-.2.3H12" style={{ fill: '#ff0' }} />
        <path
          d="M12.2,9.7V10H12a.37.37,0,0,0-.2-.3.37.37,0,0,0-.2.3h-.2V9.7Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,9.9h0c0,.1.1.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.9,9.9a.35.35,0,0,0-.1-.2s-.1,0-.1.2h.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,9.5h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,9.6h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12,9.1h-.3v.1h.2c.1,0,.1,0,.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.8,9.2v.3H12V9.2h-.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12,9.4v.2h.2V9.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.5,9.4v.2h.2V9.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,9.3H12v.1h.2V9.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.7,9.3h-.2v.1h.2V9.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M12,12a.37.37,0,0,0-.2-.3.37.37,0,0,0-.2.3H12" style={{ fill: '#ff0' }} />
        <path
          d="M12.2,11.7V12H12a.37.37,0,0,0-.2-.3.37.37,0,0,0-.2.3h-.2v-.3Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,12h0c0,.1.1.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.9,12a.35.35,0,0,0-.1-.2s-.1,0-.1.2h.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,11.6h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,11.7h0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12,11.2h-.3v.1h.2c.1,0,.1,0,.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.8,11.3v.3H12v-.3h-.2"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12,11.5v.2h.2v-.2Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.5,11.5v.2h.2v-.2Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M12.2,11.3H12v.1h.2v-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.7,11.3h-.2v.1h.2v-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M11.2,14.2c.2-.2.1-.3.1-.3a.35.35,0,0,0-.4.1l.3.2" style={{ fill: '#ff0' }} />
        <path
          d="M11.5,14.1l-.2.2-.1-.1c.2-.2.1-.3.1-.3a.22.22,0,0,0-.3.1l-.1-.1.2-.2.4.4Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.4,14.3l-.5-.5h0l.5.5Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.2,14.1a.31.31,0,0,0,.1-.2.31.31,0,0,0-.2.1l.1.1"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.6,14l-.5-.5h0l.5.5h0C11.7,14.1,11.7,14,11.6,14Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.6,14.1l-.5-.5h0l.5.5Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.8,13.6h0l-.1-.1h0l-.1.1h.2Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.5,13.5l-.2.2.1.1.2-.2-.1-.1"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.6,13.8l-.1.1.1.1.1-.1-.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.3,13.4l-.1.1.1.1.1-.1-.1-.1Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.8,13.8h0l-.1-.1h0l-.1.1h.2c-.1.1,0,.1,0,0Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path
          d="M11.5,13.5h0l-.1-.1h0l-.1.1h.2Z"
          style={{ fill: '#ff0;stroke:#000;stroke-width:0.022447599098086357px' }}
        />
        <path d="M11.6,13.9c.1,0,0-.1,0,0h0" />
        <path
          d="M9.5,12.1h0a.37.37,0,0,0,.1.3c.1.1.1.1.2.1s.2,0,.2-.1a.37.37,0,0,0,.1-.3v-.5H9.4l.1.5"
          style={{ fill: '#039' }}
        />
        <circle cx="9.6" cy="11.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10" cy="11.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.8" cy="12" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.6" cy="12.2" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10" cy="12.2" r="0.1" style={{ fill: '#fff' }} />
        <path
          d="M9.5,10.9h0a.37.37,0,0,0,.1.3c.1.1.1.1.2.1s.2,0,.2-.1a.37.37,0,0,0,.1-.3v-.5H9.4l.1.5"
          style={{ fill: '#039' }}
        />
        <circle cx="9.6" cy="10.6" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10" cy="10.6" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.8" cy="10.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.6" cy="11" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10" cy="11" r="0.1" style={{ fill: '#fff' }} />
        <path
          d="M8.5,12.1h0a.37.37,0,0,0,.1.3c.1.1.1.1.2.1s.2,0,.2-.1a.37.37,0,0,0,.1-.3v-.5H8.4l.1.5"
          style={{ fill: '#039' }}
        />
        <circle cx="8.7" cy="11.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.1" cy="11.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="8.9" cy="12" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="8.7" cy="12.2" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.1" cy="12.2" r="0.1" style={{ fill: '#fff' }} />
        <path
          d="M10.4,12.1h0a.37.37,0,0,0,.1.3c.1.1.1.1.2.1s.2,0,.2-.1a.37.37,0,0,0,.1-.3v-.5h-.7l.1.5"
          style={{ fill: '#039' }}
        />
        <circle cx="10.6" cy="11.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10.9" cy="11.8" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10.7" cy="12" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10.6" cy="12.2" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10.9" cy="12.2" r="0.1" style={{ fill: '#fff' }} />
        <path
          d="M9.5,13.3h0a.37.37,0,0,0,.1.3c.1.1.1.1.2.1s.2,0,.2-.1a.37.37,0,0,0,.1-.3v-.5H9.4l.1.5"
          style={{ fill: '#039' }}
        />
        <circle cx="9.6" cy="13" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10" cy="13" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.8" cy="13.1" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="9.6" cy="13.3" r="0.1" style={{ fill: '#fff' }} />
        <circle cx="10" cy="13.3" r="0.1" style={{ fill: '#fff' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'QAR') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#8d1b3d' }} />
        <path
          d="M7.5,20H1V4H7.5l1.8.9-1.8.9,1.8.9-1.8.9,1.8.9-1.8.8,1.8.9-1.8.9,1.7.9-1.8.9,1.8.9-1.8.9,1.8.9-1.8.9,1.8.9-1.8.9,1.8.9Z"
          style={{ fill: '#fff' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'RUB') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="5.3" style={{ fill: '#fafafa' }} />
        <rect x="1" y="14" width="22" height="6" style={{ fill: '#d52b1e' }} />
        <rect x="1" y="9" width="22" height="5.5" style={{ fill: '#0039a6' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'SAR') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#006c35' }} />
        <path
          d="M10,8.1h0c-.1.1-.3.3-.3.4v.2c0,.1.1.1.2,0l.1-.1c0-.1-.1.1-.1-.1a.76.76,0,0,1,.1-.4Zm1.3,0a.1.1,0,0,0-.1.1c0,.1-.2.2-.1.5a1.48,1.48,0,0,1,.1.7c-.1.1-.1.1-.1.2a.19.19,0,0,1-.3,0l-.2-.2V8.6c-.1-.1-.2-.1-.2,0a1.62,1.62,0,0,0-.5.9c0,.2-.1.1-.2,0s-.1-1-.3-.9c-.2.8.2,1.5.4,1.4.2.1.3-.3.4-.7l.1-.1c0,.5,0,.6.2.8s.5,0,.6,0l.2-.2c.1-.1.1-.1.2,0s.1.2.2.3.4,0,.5-.1a.37.37,0,0,0,.1-.3.14.14,0,0,1,.2,0,.14.14,0,0,0,0,.2c.1.1.1,0,.1,0a.78.78,0,0,0,.3-.4.1.1,0,0,0-.1-.1c-.1,0-.1,0-.1.1s-.2.1-.3,0a.6.6,0,0,1-.1-.4s-.1-.2,0-.2h.2a.76.76,0,0,0-.2-.4.19.19,0,0,0-.3,0,.31.31,0,0,0-.1.2A.37.37,0,0,0,12,9a1.45,1.45,0,0,1,.2.7.35.35,0,0,1-.2.1c-.1,0-.2,0-.2-.4a2.48,2.48,0,0,0-.1-.9c-.3-.3-.3-.4-.4-.4Zm-.4.1a.1.1,0,0,0-.1.1,2.27,2.27,0,0,1-.1.4c0,.1.1.2.2,0a.76.76,0,0,0,.1-.4.1.1,0,0,0-.1-.1Zm1.6,0h0a.76.76,0,0,0-.1.4c0,.1.1.2.2.3.3.4.5.7.8,1.1,0,.3.1.6.1.8a13.33,13.33,0,0,1,0,2c.1,0,.3-.2.4-.5V10.6a10.93,10.93,0,0,1,.8,1.5c.1,0,.1-.6,0-.7a9.05,9.05,0,0,0-.6-1.1c0-.1-.2-.2-.3-.5a2.18,2.18,0,0,0-.1-.6c0-.3.1,0,.1-.1a3,3,0,0,0-.4-.8c-.1-.1-.1-.1-.2,0a.3.3,0,0,0,0,.4l-.1-.1-.3-.3a.77.77,0,0,0-.3-.1Zm4.6,0c-.1,0-.1.1,0,0-.1.1-.2.2-.2.3A.9.9,0,0,0,17,9v.1h0c-.3-.3.1-.1-.1-.3s-.2-.3-.4-.4-.1-.1-.1,0v.4c0,.1.1.2.1.3a2.7,2.7,0,0,0,.7.8c0,.6.1,1.2.1,1.8,0,.3-.1.6-.2.6a.14.14,0,0,1-.2,0c-.1,0-.3-.4-.3-.4a.19.19,0,0,0-.3,0,7.26,7.26,0,0,0-.5.9c0,.1-.2.1-.3,0-.3-.4-.1-1-.2-.9a.77.77,0,0,0-.1.9,1.38,1.38,0,0,0,.3.4c.2.1.3,0,.4,0a1.08,1.08,0,0,0,.2-.7c.1-.2.2-.1.3-.1s.1.2.2.2.3.2.5,0l.3-.3a11.75,11.75,0,0,0,0-1.9c.1.2.2.3.3.5,0,.5.1,1.1.1,1.6,0,.1.3-.3.3-.5v-.5a5.58,5.58,0,0,0,.5.8.85.85,0,0,0,0-.7,9.22,9.22,0,0,1-.5-.8c0-.3-.1-.6-.1-.8s-.1-.4-.1-.6-.1-.3,0-.3.1,0,.1-.1-.2-.7-.3-.9-.1-.1-.2.1a.45.45,0,0,0,0,.5,7.84,7.84,0,0,1,.2,1.4c-.1-.2-.3-.4-.4-.6V8.9h.1l.1-.1c-.1,0-.3-.3-.4-.6ZM5.2,8.3c-.1,0-.1,0-.1.1a1.44,1.44,0,0,0,.2.3V9a.44.44,0,0,0,.1-.3c0-.1,0-.4-.2-.4Zm13.5,0h0a.66.66,0,0,0-.1.6,20.41,20.41,0,0,1,.3,3.4.37.37,0,0,1-.1.3c-.1.1-.2.3-.3.4a.76.76,0,0,1-.4.2c-.2.1-.2.3,0,.3a1.22,1.22,0,0,0,1-.5,1.07,1.07,0,0,0,.2-.6,13.7,13.7,0,0,0-.2-3V9.1c0-.1.1,0,.2-.1-.1,0-.4-.5-.6-.7Zm-3.4,0h0a1.51,1.51,0,0,0-.2.8,14.47,14.47,0,0,1,.4,3.5c.1,0,.2-.3.3-.5v-.8a12,12,0,0,0-.3-2c-.1-.3.2,0,.2-.2a5.94,5.94,0,0,1-.4-.8Zm-8.4,0h0c-.1.1-.1.1-.1.2a.1.1,0,0,1-.1-.1V8.3h0v.1h0V8.3h0a.1.1,0,0,0-.1.1s0,.2.1.2c0,.2.3.1.3-.1s0-.1-.1-.2ZM9,8.3H8.9a.3.3,0,0,0,0,.4.35.35,0,0,1,.1.2c-.3.2-.9.6-.9.7h.4c.1,0,.7-.7.7-.7a.1.1,0,0,1-.1-.1V8.7c.2-.1.1-.3,0-.4Zm5.7,0h0a1.42,1.42,0,0,0-.2.6c.2,1.1.2,2,.3,3.1,0,.1,0,.3-.1.3a3.92,3.92,0,0,1-1,.8s.1.3.3.3.6-.2.9-.7a1.06,1.06,0,0,0,.2-.5,21.58,21.58,0,0,0-.2-2.8V9.2a.1.1,0,0,0,.1-.1c0-.1-.2-.5-.3-.8Zm-8.8,0a.1.1,0,0,0-.1.1v.5a2.92,2.92,0,0,1,.2.9c0,.4-.2.2-.2,0a1.63,1.63,0,0,0,0-.7c0-.1-.1-.1-.2-.1s-.3.2-.3.5a.49.49,0,0,1-.1.3c0,.2-.1.3-.2,0s-.1-.9-.2-.7c0,.5-.1,1.3.3,1.3s.2-.8.4-.9c0-.1.1-.1.1,0v.7a.27.27,0,0,0,.3.3.37.37,0,0,1,.3.1,4.87,4.87,0,0,0,.1,1.2s.3.1.3-.7c0-.5-.1-.8,0-.9s.1-.1.2,0,.2.2.4.1.5-.2.5-.4a1.27,1.27,0,0,0-.1-.6.14.14,0,0,1,0-.2c.1.1.1.1.1,0a.52.52,0,0,0-.2-.4c-.5-.1-.6-.1-.7.1a1.85,1.85,0,0,0,.2.7c0,.1.1.2.1.3H6.9l-.2-.2a.69.69,0,0,0,0-.5c0-.1-.1-.2-.2-.3s-.1-.1-.2,0a.85.85,0,0,0,0,.7.77.77,0,0,1,.1.3c0,.1-.1.1-.1,0A2.49,2.49,0,0,1,6.2,9c0-.2,0-.5-.2-.6,0-.1,0-.1-.1-.1Zm1.7,0h0c-.2.1-.3.2-.2.3.1.7.2,1.3.3,2a.35.35,0,0,1-.1.2c-.2-.1-.2-.3-.5-.3a.43.43,0,0,0-.4.4v.5c.1.2.3.1.4.1s.2-.2.3-.1h0a.9.9,0,0,1-.5.7c-.5.1-.7.1-.9-.1s0-.8-.2-.7c-.6,1.7,1.5,1.9,1.7.1a.1.1,0,0,1,.1-.1v.1c0,1.6-1.7,1.8-1.9,1.2-.1-.1-.1-.4-.1-.6s0-.2-.1-.2-.2.1-.2.3v.4c.1,1.3,2.2.7,2.5-.3.2-.6,0-1,.1-1h0c.2.2.5,0,.6,0s.1-.1.1,0c.2.1.4.1.5-.1s.1-.4.1-.6a.35.35,0,0,0-.2.1H9v.2H8.9c0-.2-.3-.3-.4.1a.19.19,0,0,1-.3,0c0-.2-.1-.3-.3-.2-.1-.5-.1-.9-.2-1.4.1,0,.2.1.2,0,0-.4-.1-.9-.3-1h0c.1.1,0,.1,0,0Zm6.4,0c-.1,0-.2,0-.1.2s.2.2.2.4,0,.3,0,.3.1-.2.2-.3a.71.71,0,0,0-.3-.6ZM9,8.5a.1.1,0,0,1,.1.1v.1A.1.1,0,0,1,9,8.6V8.5Zm9.3.3c-.1,0-.2.1-.1.2s.2.3.2.4v.4a1,1,0,0,0,.1-.4c0-.2-.1-.6-.2-.6Zm-5.1.1h0c0,.2,0,.2.1.3L13.1,9c-.1-.1,0-.1.1-.1Zm1.1.6h0l-.1.1a.1.1,0,0,1-.1-.1V9.4h0v.1h0V9.4h0a.1.1,0,0,0-.1.1s0,.2.1.2.5,0,.4-.2c-.1.1-.1,0-.2,0Zm-5.4,0h0c-.2.1-.2.3-.1.5s.2.1.2.1.2-.3.2-.3,0-.1-.2.1V9.8c-.1-.1-.1-.1-.1-.3.1.1.1,0,0,0Zm7.7.1c-.1,0-.2,0-.2.2V10s0,.1-.1,0l-.1-.1H16c0,.1-.1.1,0,.2s.4.5.5.5v-.5a.1.1,0,0,1,.1-.1h.1a.37.37,0,0,0-.1-.3c.1-.1,0-.1,0-.1Zm-6.3.5h0c-.2.2-.2.2-.2.4a3.93,3.93,0,0,0,.2.6,2.49,2.49,0,0,1,.1.8,2,2,0,0,1-.9.9c-.2.1-.3,0-.4,0h0a.31.31,0,0,1-.1-.2H9a2.55,2.55,0,0,0,.9-.9.63.63,0,0,0,0-.6c0-.1-.1-.2-.1-.3h0s.2.1.2,0a1.69,1.69,0,0,0-.2-.5.19.19,0,0,0-.3,0,.6.6,0,0,0-.1.4,1.38,1.38,0,0,1,.3.4h0v.3c0,.1-.6.6-.6.6h0v-.4h0c-.2.1-.2.5-.3.6a7.3,7.3,0,0,0-1.3.9c-.2.2,1.1-.3,1.2-.3h0a.31.31,0,0,0,.1.2.57.57,0,0,0,.7.2,2.72,2.72,0,0,0,1-.8c0-.1.1-.1.2-.1a1.49,1.49,0,0,0,1.4.7c.2-.2.1-.3,0-.3a.78.78,0,0,1-.4-.3c0-.1,0-.2.2-.3.4-.1.9-.1,1.3-.2,0-.1.1-.3.1-.4a.1.1,0,0,1,.1-.1H11.9a.93.93,0,0,0,1-.7c0-.3-.1-.5-.5-.5a.44.44,0,0,0-.4.6c0,.1,0,.2-.1.2-.5,0-1.1.4-1.1.6h0l-.1-.1a1.92,1.92,0,0,0-.4-1.2v-.2Zm1.3.2h0l-.1.1a.1.1,0,0,1-.1-.1v-.1h0v.1h0v-.1h0a.1.1,0,0,0-.1.1s0,.2.1.2.5,0,.4-.2c-.1.1-.1.1-.2,0Zm5.4.2h0l-.8.5c-.1.1,0,.3,0,.3a5.58,5.58,0,0,0,.8-.5v-.3Zm-4.7.1h.1a.1.1,0,0,1,.1.1h-.1c-.1,0-.2,0-.1-.1Zm-6.5.1a1.37,1.37,0,0,0-1,.8L6,10.9c0-.1,0-.2-.2-.2Zm1.2.2H7a.31.31,0,0,1,.1.2H6.9c0-.1,0-.1.1-.2Zm9.8.2c-.1,0-.1.1-.1.2s.1.3.1.4V12a.37.37,0,0,0,.2-.3c.1-.2,0-.6-.2-.6.1,0,0-.1,0,0Zm-8.3.3c-.1,0-.1,0-.1.1s.2.1.2.3v.3a.44.44,0,0,0,.1-.3c.1-.1,0-.3-.2-.4Zm2.5.4h0a1.27,1.27,0,0,1,.6.1c.2,0,.2.1.1.2s-.3.1-.3.3v.2h-.1c-.1-.1-.4-.2-.4-.6-.1-.2,0-.2.1-.2ZM4.9,12h0a1.22,1.22,0,0,0-.2,1.1.37.37,0,0,0,.3.1,1.06,1.06,0,0,0,.2-.5c0-.1-.1-.1-.1,0s-.1.1-.2,0V12Zm7.8.5h0c-.1,0-.2.1-.3.2v.1c0,.1.1,0,.1,0s.1,0,.1.1V13s.1.1.1,0c.2-.1.3-.1.5-.2s.1-.2,0-.2a.37.37,0,0,0-.3.1c-.1,0-.1,0-.1-.1,0,.1,0,0-.1-.1Zm5,.2h-.1a.1.1,0,0,0,0,.2s.1.1,0,.1a.1.1,0,0,0-.1.1v.1A2.57,2.57,0,0,0,18,13c.1,0,0-.1,0-.1h-.1a.1.1,0,0,1,0-.2c0,.1,0,0-.2,0Zm-2.1,2.5h0a.25.25,0,0,0-.1.4h-7c-.4,0-1.9-.1-1.9-.1a1.54,1.54,0,0,0,1.4.6h7.5c-.1.2,0,.5.1.5h0c.1,0,.1,0,.2-.1h1.1c.1.1.1.2.2.1s.3-.1.3-.4c0,0,0-.6-.4-.6h-.4a3.08,3.08,0,0,1-.9-.1s.1-.2,0-.3h-.1c.1.1.1,0,0,0Zm.2.9h1c.1,0,0,.2,0,.2h-.3c0-.1-.2-.1-.3,0h-.5c0-.1,0-.2.1-.2Z"
          style={{ fill: '#fff' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'SEK') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#006aa7' }} />
        <rect x="7" y="4" width="4" height="16" style={{ fill: '#fecc00' }} />
        <rect x="1" y="10" width="22" height="4" style={{ fill: '#fecc00' }} />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'SGD') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="8" style={{ fill: '#f42a41' }} />
        <rect x="1" y="12" width="22" height="8" style={{ fill: '#fff' }} />
        <path
          d="M4.61,8A3.14,3.14,0,0,1,6.43,5.14a2.84,2.84,0,0,0-.66-.07,2.94,2.94,0,0,0,0,5.87,2.84,2.84,0,0,0,.66-.08A3.14,3.14,0,0,1,4.61,8Z"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="7.8 5.63 7.97 6.15 8.53 6.15 8.08 6.48 8.25 7 7.8 6.68 7.36 7 7.53 6.48 7.08 6.15 7.63 6.15 7.8 5.63"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9.43 6.85 9.6 7.37 10.16 7.37 9.71 7.7 9.88 8.22 9.43 7.9 8.99 8.22 9.16 7.7 8.71 7.37 9.26 7.37 9.43 6.85"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.14 6.85 6.31 7.37 6.87 7.37 6.42 7.7 6.59 8.22 6.14 7.9 5.69 8.22 5.87 7.7 5.42 7.37 5.97 7.37 6.14 6.85"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="8.81 8.79 8.98 9.32 9.53 9.32 9.09 9.64 9.26 10.17 8.81 9.84 8.36 10.17 8.53 9.64 8.09 9.32 8.64 9.32 8.81 8.79"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.78 8.79 6.95 9.32 7.5 9.32 7.06 9.64 7.23 10.17 6.78 9.84 6.33 10.17 6.5 9.64 6.06 9.32 6.61 9.32 6.78 8.79"
          style={{ fill: '#fff' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'SN (ton)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#d3d4d5' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#d3d4d5' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#d3d4d5' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'TRY') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style="fill:#e30a17" />
        <circle cx="9.2" cy="12" r="4.2" style="fill:#fff" />
        <circle cx="10.2" cy="12" r="3.3" style="fill:#e30a17" />
        <polygon points="12.5 12 16.2 13.2 13.9 10 13.9 14 16.2 10.8 12.5 12" style="fill:#fff" />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'USD') {
    return (
      <SvgIcon {...otherProps}>
        <rect x="1" y="4" width="22" height="16" style={{ fill: '#fff' }} />
        <rect x="1" y="4" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="6.5" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="8.9" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="11.4" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="13.8" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="16.3" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="18.8" width="22" height="1.2" style={{ fill: '#be2033' }} />
        <rect x="1" y="4" width="9.5" height="8.6" style={{ fill: '#212f64' }} />
        <polygon
          points="8.2 4.5 8.2 4.7 8.4 4.7 8.3 4.8 8.3 5 8.2 4.9 8 5 8.1 4.8 7.9 4.7 8.1 4.7 8.2 4.5"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="8.2 6.2 8.2 6.4 8.4 6.4 8.3 6.6 8.3 6.8 8.2 6.6 8 6.8 8.1 6.6 7.9 6.4 8.1 6.4 8.2 6.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="8.2 8 8.2 8.2 8.4 8.2 8.3 8.3 8.3 8.6 8.2 8.4 8 8.6 8.1 8.3 7.9 8.2 8.1 8.2 8.2 8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="8.2 9.8 8.2 10 8.4 10 8.3 10.2 8.3 10.4 8.2 10.2 8 10.4 8.1 10.2 7.9 10 8.1 10 8.2 9.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="8.2 11.6 8.2 11.8 8.4 11.8 8.3 11.9 8.3 12.1 8.2 12 8 12.1 8.1 11.9 7.9 11.8 8.1 11.8 8.2 11.6"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.6 4.5 6.6 4.7 6.8 4.7 6.7 4.8 6.7 5 6.6 4.9 6.4 5 6.5 4.8 6.3 4.7 6.5 4.7 6.6 4.5"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.6 6.2 6.6 6.4 6.8 6.4 6.7 6.6 6.7 6.8 6.6 6.6 6.4 6.8 6.5 6.6 6.3 6.4 6.5 6.4 6.6 6.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.6 8 6.6 8.2 6.8 8.2 6.7 8.3 6.7 8.6 6.6 8.4 6.4 8.6 6.5 8.3 6.3 8.2 6.5 8.2 6.6 8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.6 9.8 6.6 10 6.8 10 6.7 10.2 6.7 10.4 6.6 10.2 6.4 10.4 6.5 10.2 6.3 10 6.5 10 6.6 9.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="6.6 11.6 6.6 11.8 6.8 11.8 6.7 11.9 6.7 12.1 6.6 12 6.4 12.1 6.5 11.9 6.3 11.8 6.5 11.8 6.6 11.6"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5 4.5 5 4.7 5.3 4.7 5.1 4.8 5.1 5 5 4.9 4.8 5 4.9 4.8 4.7 4.7 4.9 4.7 5 4.5"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5 6.2 5 6.4 5.3 6.4 5.1 6.6 5.1 6.8 5 6.6 4.8 6.8 4.9 6.6 4.7 6.4 4.9 6.4 5 6.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5 8 5 8.2 5.3 8.2 5.1 8.3 5.1 8.6 5 8.4 4.8 8.6 4.9 8.3 4.7 8.2 4.9 8.2 5 8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5 9.8 5 10 5.3 10 5.1 10.2 5.1 10.4 5 10.2 4.8 10.4 4.9 10.2 4.7 10 4.9 10 5 9.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5 11.6 5 11.8 5.3 11.8 5.1 11.9 5.1 12.1 5 12 4.8 12.1 4.9 11.9 4.7 11.8 4.9 11.8 5 11.6"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="3.4 4.5 3.4 4.7 3.7 4.7 3.5 4.8 3.5 5 3.4 4.9 3.2 5 3.3 4.8 3.1 4.7 3.3 4.7 3.4 4.5"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="3.4 6.2 3.4 6.4 3.7 6.4 3.5 6.6 3.5 6.8 3.4 6.6 3.2 6.8 3.3 6.6 3.1 6.4 3.3 6.4 3.4 6.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="3.4 8 3.4 8.2 3.7 8.2 3.5 8.3 3.5 8.6 3.4 8.4 3.2 8.6 3.3 8.3 3.1 8.2 3.3 8.2 3.4 8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="3.4 9.8 3.4 10 3.7 10 3.5 10.2 3.5 10.4 3.4 10.2 3.2 10.4 3.3 10.2 3.1 10 3.3 10 3.4 9.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="3.4 11.6 3.4 11.8 3.7 11.8 3.5 11.9 3.5 12.1 3.4 12 3.2 12.1 3.3 11.9 3.1 11.8 3.3 11.8 3.4 11.6"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="1.8 4.5 1.8 4.7 2.1 4.7 1.9 4.8 2 5 1.8 4.9 1.6 5 1.7 4.8 1.5 4.7 1.7 4.7 1.8 4.5"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="1.8 6.2 1.8 6.4 2.1 6.4 1.9 6.6 2 6.8 1.8 6.6 1.6 6.8 1.7 6.6 1.5 6.4 1.7 6.4 1.8 6.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="1.8 8 1.8 8.2 2.1 8.2 1.9 8.3 2 8.6 1.8 8.4 1.6 8.6 1.7 8.3 1.5 8.2 1.7 8.2 1.8 8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="1.8 9.8 1.8 10 2.1 10 1.9 10.2 2 10.4 1.8 10.2 1.6 10.4 1.7 10.2 1.5 10 1.7 10 1.8 9.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="1.8 11.6 1.8 11.8 2.1 11.8 1.9 11.9 2 12.1 1.8 12 1.6 12.1 1.7 11.9 1.5 11.8 1.7 11.8 1.8 11.6"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9 5.3 9 5.6 9.3 5.6 9.1 5.7 9.2 5.9 9 5.8 8.8 5.9 8.9 5.7 8.7 5.6 8.9 5.6 9 5.3"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9 7.2 9 7.4 9.3 7.4 9.1 7.5 9.2 7.7 9 7.6 8.8 7.7 8.9 7.5 8.7 7.4 8.9 7.4 9 7.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9 9 9 9.2 9.2 9.2 9.1 9.3 9.1 9.5 9 9.4 8.8 9.5 8.9 9.3 8.7 9.2 8.9 9.2 9 9"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="8.9 10.8 9 11 9.2 11 9.1 11.1 9.1 11.3 8.9 11.2 8.8 11.3 8.8 11.1 8.7 11 8.9 11 8.9 10.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="7.4 5.3 7.4 5.6 7.7 5.6 7.5 5.7 7.6 5.9 7.4 5.8 7.2 5.9 7.3 5.7 7.1 5.6 7.3 5.6 7.4 5.3"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="7.4 7.2 7.4 7.4 7.7 7.4 7.5 7.5 7.6 7.7 7.4 7.6 7.2 7.7 7.3 7.5 7.1 7.4 7.3 7.4 7.4 7.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="7.4 9 7.4 9.2 7.6 9.2 7.5 9.3 7.5 9.5 7.4 9.4 7.2 9.5 7.3 9.3 7.1 9.2 7.3 9.2 7.4 9"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="7.4 10.8 7.4 11 7.6 11 7.5 11.1 7.5 11.3 7.4 11.2 7.2 11.3 7.2 11.1 7.1 11 7.3 11 7.4 10.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5.8 5.3 5.9 5.5 6.1 5.5 5.9 5.6 6 5.8 5.8 5.7 5.6 5.8 5.7 5.6 5.5 5.5 5.7 5.5 5.8 5.3"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5.8 7.1 5.9 7.3 6.1 7.3 5.9 7.5 6 7.7 5.8 7.5 5.6 7.7 5.7 7.5 5.5 7.3 5.7 7.3 5.8 7.1"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5.8 8.9 5.8 9.1 6.1 9.1 5.9 9.3 5.9 9.5 5.8 9.3 5.6 9.5 5.7 9.3 5.5 9.1 5.7 9.1 5.8 8.9"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="5.8 10.7 5.8 10.9 6 10.9 5.9 11 5.9 11.2 5.8 11.1 5.6 11.2 5.6 11 5.5 10.9 5.7 10.9 5.8 10.7"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="4.2 5.3 4.3 5.5 4.5 5.5 4.3 5.6 4.4 5.8 4.2 5.7 4 5.8 4.1 5.6 3.9 5.5 4.1 5.5 4.2 5.3"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="4.2 7.1 4.3 7.3 4.5 7.3 4.3 7.4 4.4 7.6 4.2 7.5 4 7.6 4.1 7.4 3.9 7.3 4.1 7.3 4.2 7.1"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="4.2 8.9 4.2 9.1 4.5 9.1 4.3 9.2 4.3 9.4 4.2 9.3 4 9.4 4.1 9.2 3.9 9.1 4.1 9.1 4.2 8.9"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="4.2 10.7 4.2 10.9 4.4 10.9 4.3 11 4.3 11.2 4.2 11.1 4 11.2 4.1 11 3.9 10.9 4.1 10.9 4.2 10.7"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="2.6 5.2 2.7 5.4 2.9 5.4 2.7 5.6 2.8 5.8 2.6 5.6 2.4 5.8 2.5 5.6 2.3 5.4 2.5 5.4 2.6 5.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="2.6 7.1 2.7 7.3 2.9 7.3 2.7 7.4 2.8 7.6 2.6 7.5 2.4 7.6 2.5 7.4 2.3 7.3 2.5 7.3 2.6 7.1"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="2.6 8.9 2.6 9.1 2.9 9.1 2.7 9.2 2.7 9.4 2.6 9.3 2.4 9.4 2.5 9.2 2.3 9.1 2.5 9.1 2.6 8.9"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="2.6 10.7 2.6 10.9 2.8 10.9 2.7 11 2.7 11.2 2.6 11.1 2.4 11.2 2.5 11 2.3 10.9 2.5 10.9 2.6 10.7"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9.8 4.5 9.8 4.7 10 4.7 9.9 4.8 9.9 5 9.8 4.9 9.6 5 9.7 4.8 9.5 4.7 9.7 4.7 9.8 4.5"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9.8 6.2 9.8 6.4 10 6.4 9.9 6.6 9.9 6.8 9.8 6.6 9.6 6.8 9.7 6.6 9.5 6.4 9.7 6.4 9.8 6.2"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9.8 8 9.8 8.2 10 8.2 9.9 8.3 9.9 8.6 9.8 8.4 9.6 8.6 9.7 8.3 9.5 8.2 9.7 8.2 9.8 8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9.8 9.8 9.8 10 10 10 9.9 10.2 9.9 10.4 9.8 10.2 9.6 10.4 9.7 10.2 9.5 10 9.7 10 9.8 9.8"
          style={{ fill: '#fff' }}
        />
        <polygon
          points="9.8 11.6 9.8 11.8 10 11.8 9.9 11.9 9.9 12.1 9.8 12 9.6 12.1 9.7 11.9 9.5 11.8 9.7 11.8 9.8 11.6"
          style={{ fill: '#fff' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ZCeyrek') {
    return (
      <SvgIcon {...otherProps}>
        <circle cx="12" cy="12" r="7" style={{ fill: '#e8a049' }} />
        <path
          d="M12,7a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-4a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z"
          style={{ fill: '#ffbf53' }}
        />
      </SvgIcon>
    );
  }
  if (props.flagCode === 'ZN (ton)') {
    return (
      <SvgIcon {...otherProps}>
        <path
          className="st0"
          d="M10.6,18H2.4c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4l1.1,3.3C11.8,17.3,11.3,18,10.6,18z"
          style={{ fill: '#666666' }}
        />
        <path
          className="st0"
          d="M22.6,16.7c0.2,0.6-0.3,1.3-0.9,1.3h-8.2c-0.7,0-1.2-0.7-0.9-1.3l1.1-3.3c0.3-0.8,1-1.4,1.9-1.4h4.1c0.9,0,1.6,0.6,1.9,1.4L22.6,16.7z"
          style={{ fill: '#666666' }}
        />
        <path
          className="st0"
          d="M16.6,11H7.4c-0.7,0-1.2-0.7-0.9-1.3l1.2-3.3C8,5.6,8.8,5,9.8,5h4.5c0.9,0,1.8,0.6,2.1,1.4l1.2,3.3C17.7,10.3,17.3,11,16.6,11z"
          style={{ fill: '#666666' }}
        />
      </SvgIcon>
    );
  }

  return null;
};

CountryFlags.propTypes = {
  context: PropTypes.object,
  flagCode: PropTypes.string,
  viewBox: PropTypes.string,
};

CountryFlags.defaultProps = {
  flagCode: 'TR',
  viewBox: '0 0 24 24',
};

export default CountryFlags;
