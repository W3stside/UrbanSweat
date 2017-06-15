import React from 'react';

const BigHeader = ({text, fontSize}) => (
  <div style={{display: 'flex', height: '100%', width: '100%'}}>
    <span style={{
      border: '0.7vw solid',
      display: 'inline',
      font: 'bold italic ' + fontSize + ' Helvetica',
      letterSpacing: '-0.7vw',
      margin: 'auto',
      padding: '10px 20px 10px 10px'
      }}>
        {text.toUpperCase()}
      </span>
  </div>
);

BigHeader.defaultProps = {
  fontSize: '6.7vw',
  text: 'My City'
};

export default BigHeader;
