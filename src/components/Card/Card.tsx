import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../UI/Button/Button";
import Rating from "../../UI/Rating/Rating";
import { CardProps } from "../../shared.types";

import classes from "./Card.module.scss";
import { CartProduct, addToCart } from "../../redux/cartSlice";

const Card: React.FC<CardProps> = (props) => {
	const dispatch = useDispatch();
	const [rating, setRating] = useState<number>(0); // Додали стан для зберігання рейтингу

	const addProduct = (payload: CartProduct) => {
		dispatch(addToCart(payload));
	};

	const handleRatingChange = (newRating: number) => {
		setRating(newRating); // Оновлюємо стан рейтингу при зміні
	};

	return (
		<div className={classes.card}>
			<img src={props.pictureURL} alt={props.model} />
			<div className={classes["card-text-wrapper"]}>
				<h2>{props.brand}</h2>
				<h3>{props.model}</h3>
				<Rating rating={rating} onChange={handleRatingChange} /> {/* Додаємо компонент рейтингу */}
				<h4>{props.description}</h4>
				<h2>₴ {props.price}</h2>
				<Button
					onClick={() =>
						addProduct({
							id: props.id,
							brand: props.brand,
							model: props.model,
							price: props.price,
							quantity: 1,
							rating: rating // Додаємо рейтинг до об'єкту товару при додаванні в кошик
						})
					}
				>
					Add to cart
				</Button>
			</div>
		</div>
	);
};

export default Card;
