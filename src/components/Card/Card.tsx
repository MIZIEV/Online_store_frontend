import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../UI/Button/Button";
import Rating from "../../UI/Rating/Rating";
import { CardProps } from "../../shared.types";

import classes from "./Card.module.scss";
import { CartProduct, addToCart } from "../../redux/cartSlice";

const Card: React.FC<CardProps> = (props) => {
	const dispatch = useDispatch();
	const [rating, setRating] = useState<number>(0);
	const [hovered, setHovered] = useState<boolean>(false); // Додайте стан для відстеження наведення на картку

	const addProduct = (payload: CartProduct) => {
		dispatch(addToCart(payload));
	};

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	const handleCardHover = () => {
		setHovered(true); // Встановіть стан, коли курсор наведено на картку
	};

	const handleCardLeave = () => {
		setHovered(false); // Встановіть стан, коли курсор відведено від картки
	};

	return (
		<div
			className={`${classes.card} ${hovered ? classes.hovered : ""}`} // Додайте клас, коли курсор наведено на картку
			onMouseEnter={handleCardHover}
			onMouseLeave={handleCardLeave}
		>
			<img src={props.pictureURL} alt={props.model} />
			<div className={classes["card-text-wrapper"]}>
				<h2>{props.brand}</h2>
				<h3>{props.model}</h3>
				<Rating rating={rating} onChange={handleRatingChange} />
				<h4 className={hovered ? classes.showH4 : ""}>{props.description}</h4> {/* Застосуйте клас, якщо курсор наведено на картку */}
				<h2>₴ {props.price}</h2>
				<Button
					onClick={() =>
						addProduct({
							id: props.id,
							brand: props.brand,
							model: props.model,
							price: props.price,
							quantity: 1,
							rating: rating
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
