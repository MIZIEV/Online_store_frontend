import React, { useEffect, useState } from "react";
import classes from "./PriceSliderComponent.module.scss";

interface PriceSliderComponentProps {
    maxPrice: number;
    onFilterChange: (filterParams: { [key: string]: string[] }) => void;
}

const PriceSliderComponent: React.FC<PriceSliderComponentProps> = ({ maxPrice: maxPriceProp, onFilterChange }) => {

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(maxPriceProp);
    const [minSliderValue, setMinSliderValue] = useState<number>(0);
    const [maxSliderValue, setMaxSliderValue] = useState<number>(maxPriceProp);

    useEffect(() => {
        setMaxPrice(maxPriceProp);
        setMaxSliderValue(maxPriceProp);
    }, [maxPriceProp]);

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxSliderValue - 1);
        setMinPrice(value);
        setMinSliderValue(value);
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minSliderValue + 1);
        setMaxPrice(value);
        setMaxSliderValue(value);
    };

    const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxSliderValue - 1);
        setMinSliderValue(value);
        setMinPrice(value);
    };

    const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minSliderValue + 1);
        setMaxSliderValue(value);
        setMaxPrice(value);
    };

    const minPercent = (minSliderValue / maxPriceProp) * 100;
    const maxPercent = (maxSliderValue / maxPriceProp) * 100;

    const handleButtonClick = () => {
        onFilterChange({ price: [`${minPrice}`, `${maxPrice}`] });
    };

    return (
        <div className={classes.container}>
            <div className={classes.inputs}>
                <div className={classes.inputContainer}>
                    <input
                        type="number"
                        id="min-price"
                        value={minPrice}
                        onChange={handleMinInputChange}
                    />
                </div>
                <div className={classes.spliter}> - </div>
                <div className={classes.inputContainer}>
                    <input
                        type="number"
                        id="max-price"
                        value={maxPrice}
                        onChange={handleMaxInputChange}
                    />
                </div>

                <button onClick={handleButtonClick}>Ok</button>
            </div>
            <div className={classes.sliderContainer}>
                <input
                    type="range"
                    id="min-slider"
                    className={classes.rangeSlider}
                    min="0"
                    max={maxPriceProp}
                    value={minSliderValue}
                    onChange={handleMinSliderChange}
                />
                <input
                    type="range"
                    id="max-slider"
                    className={classes.rangeSlider}
                    min="0"
                    max={maxPriceProp}
                    value={maxSliderValue}
                    onChange={handleMaxSliderChange}
                />
                <div className={classes.sliderTrack}></div>
                <div
                    className={classes.sliderRange}
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`
                    }}
                ></div>
            </div>
        </div>
    );
};

export default PriceSliderComponent;