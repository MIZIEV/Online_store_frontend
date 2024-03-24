import React from "react";

interface RatingProps {
	rating: number; // число рейтингу від 1 до 5
	onChange?: (newRating: number) => void; // Додали обробник події зміни рейтингу
}

const Rating: React.FC<RatingProps> = ({ rating, onChange }) => {
	// Функція для створення масиву зірочок на основі рейтингу
	const renderStars = (): JSX.Element[] => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(<span key={i} onClick={() => onChange && onChange(i)}>&#9733;</span>); // Додали обробник події для кожної зірочки
			} else {
				stars.push(<span key={i} onClick={() => onChange && onChange(i)}>&#9734;</span>); // Додали обробник події для кожної зірочки
			}
		}
		return stars;
	};

	return <div>{renderStars()}</div>;
};

export default Rating;
