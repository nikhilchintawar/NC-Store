import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ name, description, imageUrl, history, match }) => (
  <div
    className='menu-item'
    onClick={() => history.push(`${match.path}shop/${name}`)}
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{name.toUpperCase()}</h1>
      <span className='subtitle'>{description}</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
