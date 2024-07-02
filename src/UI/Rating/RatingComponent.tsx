import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from "react";
import { hasUserRatedPhone, putTheMark } from '../../utils/phoneService';
import { isUserLoggedIn } from '../../utils/AuthService';


const customRatingStyle = {
  '& .MuiRating-iconFilled': {
    color: 'black',
  },
  '& .MuiRating-iconEmpty': {
    color: '#767676',
  },
};

interface RatingComponentProps {
  phoneId: string;
  rating: number;
  handleChangeRating: () => void;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ phoneId, rating, handleChangeRating }) => {
  const [value, setValue] = useState<number | null>(rating);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const email = localStorage.getItem("authenticatedEmail");
  const isAuthenticated = isUserLoggedIn();

  useEffect(() => {
    const checkUserHasRated = async () => {
      if (isAuthenticated) {
        try {
          const userHasRated = await hasUserRatedPhone(phoneId, email);
          setHasRated(userHasRated);
        } catch (error) {
          console.error("Failed to check if user has rated:", error);
        }
      }
    };

    checkUserHasRated();
  }, [phoneId, isAuthenticated]);

  const handleRating = async (newValue: number | null) => {
    if (isAuthenticated && newValue !== null) {
      if (!hasRated) {
        try {
          await putTheMark(phoneId, newValue);
          setHasRated(true);
          handleChangeRating();
        } catch (error) {
          console.error("Failed to submit rating:", error);
        }
      } else {
        console.log("User has already rated this phone");
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  return (
    <div>
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