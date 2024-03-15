import React from "react";

interface RatingProps {
  rating: number; // число рейтингу від 1 до 5
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Функція для створення масиву зірочок на основі рейтингу
  const renderStars = (): JSX.Element[] => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>&#9733;</span>); // відображається заповнена зірочка
      } else {
        stars.push(<span key={i}>&#9734;</span>); // відображається не заповнена зірочка
      }
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default Rating;
