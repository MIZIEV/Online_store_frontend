import Rating from '@mui/material/Rating';
import React from "react";
import { putTheMark } from '../../utils/phoneService';


const customRatingStyle = {
  '& .MuiRating-iconFilled': {
    color: 'black', 
  },
  '& .MuiRating-iconEmpty': {
    color: '#767676', 
  },
};

const RatingComponent: React.FC = ({ phoneId, rating }) => {
  const [value, setValue] = React.useState<number | null>(rating);

  const hanleRating = (newValue) => {
    console.log("value in hanler - " + newValue)
    putTheMark(phoneId, newValue);
  }

  return (
    <div >
      <Rating
        sx={customRatingStyle}
        name="simple-controlled"
        value={value}

        onChange={(event, newValue) => {
          console.log("new value" + newValue)
          setValue(newValue);
          hanleRating(newValue)
        }}
      />
    </div>
  );
};

export default RatingComponent;