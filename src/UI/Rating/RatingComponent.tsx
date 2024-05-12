import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from "react";
import { putTheMark } from '../../utils/phoneService';
import { isUserLoggedIn } from '../../utils/AuthService';


const customRatingStyle = {
  '& .MuiRating-iconFilled': {
    color: 'black',
  },
  '& .MuiRating-iconEmpty': {
    color: '#767676',
  },
};

const RatingComponent: React.FC = ({ phoneId, rating, handleChangeRating }) => {
  const [value, setValue] = useState<number | null>(rating);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const isAuthenticated = isUserLoggedIn();


  useEffect(() => {
    const userHasRated = sessionStorage.getItem(`rated_${phoneId}`);

    if (userHasRated) {
      setHasRated(true);
    }
  }, [phoneId]);

  const handleRating = async (newValue) => {

    if (isAuthenticated) {
      if (!hasRated) {
        await putTheMark(phoneId, newValue);
        setHasRated(true);

        console.log("second calling after put the mark")
        handleChangeRating();

        sessionStorage.setItem(`rated_${phoneId}`, `true`);
      } else {
        console.log("User has already rated this phone");
      }
    } else {
      console.log("user is not authenticated")
    }
  }

  return (
    <div >
      <Rating
        sx={customRatingStyle}
        name="simple-controlled"
        value={value}
        disabled={hasRated || !isAuthenticated}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleRating(newValue);
        }}
      />
    </div>
  );
};

export default RatingComponent;