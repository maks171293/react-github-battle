import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview(props){
  return (
    <div className='column'>
      <img src={props.avatar} className='avatar' alt='img'/>
      <h3 className='username'>@{props.username}</h3>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default PlayerPreview;
