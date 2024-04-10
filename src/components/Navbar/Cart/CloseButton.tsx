import React from 'react';
import classes from './CartModal.module.scss';
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from '../../../redux/cartSlice'
import { Link } from 'react-router-dom';

const CloseButton = () => {
  const dispatch = useDispatch();

  const handleCartModalVisibility = () => {
    dispatch(toggleModalVisibility());
  };

  return (
    <Link to="..">
      <button className={classes.closeButton} onClick={() => handleCartModalVisibility}>
        <span className={classes.closeIcon} aria-label="Close">
          {/* Green circle and "X" symbol styles */}
          <span className={classes.closeCircle}>
            <span className={classes.closeSymbol}>&#10006;</span>  {/* "X" symbol using character code */}
          </span>
        </span>
      </button>
    </Link>
  );
};

export default CloseButton;