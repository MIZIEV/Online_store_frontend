import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/http";
import Card from "../components/Card/Card";
import { CardProps } from "../shared.types";
import Filter from "../components/HomePage/Filter/Filter";
import { useState } from "react";
import classes from "./Home.module.scss";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

import xiaomiImage from "../images/xiaomi_image.png";
import samsungImage from "../images/samsung_image.png";
import appleImage from "../images/apple_image.png";
import CardIsUsed from "../components/Card/CardIsUsed";

const HomePage = () => {
  const [filter, setFilter] = useState("?sort=maxRating");
  const PHONE_URL = "/phone/";

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", { filter: filter }],
    queryFn: ({ signal }) => getProducts({ signal, filter }),
  });

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  console.log(data);

  return (
    <div>
      <h1 className={classes.title}>Обери свй ідеальний смартфон</h1>

      <div className={classes.topContainer}>

        <div className={classes.leftBlock}>
          <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-0.00225067 44.9977L90 90L77.85 49.4977L29.2477 49.4977V40.4977L77.85 40.4977L89.9978 -0.00225067L-0.00225067 44.9977Z" fill="#0D0C0C" />
          </svg>
          <div className={classes.leftImage}>
            <img src={xiaomiImage} alt="xiaomi image" />
            <h5>xiaomi</h5>
          </div>
        </div>

        <div className={classes.middleBlock}>
          <img src={appleImage} alt="apple image" />
          <h2>Apple</h2>
        </div>

        <div className={classes.rightBlock}>
          <div className={classes.rigthImage}>
            <img src={samsungImage} alt="samsung image" />
            <h5>samsung</h5>
          </div>
          <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90.0023 45.0023L0 0L12.15 40.5023H60.7523V49.5023H12.15L0.00224984 90.0023L90.0023 45.0023Z" fill="#0D0C0C" />
          </svg>
        </div>
      </div>
      <Outlet />

      <div className={classes.phoneBlockTitle}>
        <span>Лідер продажу</span>
        <span>
          <svg width="21" height="35" viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4141 32.0861L5.82906 17.5001L20.4141 2.91406L17.5861 0.0860634L0.171064 17.5001L17.5861 34.9141L20.4141 32.0861Z" fill="black" />
          </svg>
          <svg width="21" height="35" viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.585938 2.91394L15.1709 17.4999L0.585938 32.0859L3.41394 34.9139L20.8289 17.4999L3.41394 0.0859375L0.585938 2.91394Z" fill="black" />
          </svg>
        </span>
      </div>
      {data && data.length === 0 && <p>Nothing was found for your search</p>}

      <div className={classes.phones}>
        {data &&
          data.map((item: CardProps) => (
            <NavLink className={classes.link} to={PHONE_URL + item.id}>
              <Card
                key={item.id}
                id={item.id}
                brand={item.brand}
                model={item.model}
                description={item.description}
                price={item.price}
                mainPictureURL={item.mainPictureURL}
                rating={item.rating}
              />
            </NavLink>
          ))}
      </div>
      {isPending && <p>Loading...</p>}
      {isError && "Failed to fetch data"}

      <div className={classes.phoneBlockTitle}>
        <span>Спеціальні пропозиції</span>
        <span>
          <svg width="21" height="35" viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4141 32.0861L5.82906 17.5001L20.4141 2.91406L17.5861 0.0860634L0.171064 17.5001L17.5861 34.9141L20.4141 32.0861Z" fill="black" />
          </svg>
          <svg width="21" height="35" viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.585938 2.91394L15.1709 17.4999L0.585938 32.0859L3.41394 34.9139L20.8289 17.4999L3.41394 0.0859375L0.585938 2.91394Z" fill="black" />
          </svg>
        </span>
      </div>

      <div className={classes.phones}>
        {data &&
          data.map((item: CardProps) => (
            <NavLink className={classes.link} to={PHONE_URL + item.id}>
              <CardIsUsed
                key={item.id}
                id={item.id}
                brand={item.brand}
                model={item.model}
                description={item.description}
                price={item.price}
                mainPictureURL={item.mainPictureURL}
                rating={item.rating}
              />
            </NavLink>
          ))}
      </div>
      {isPending && <p>Loading...</p>}
      {isError && "Failed to fetch data"}

      <div className={classes.subscribeBlock}>

        <div className={classes.iconBlock}>
          <svg width="80" height="80" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90.0023 45.0023L0 0L12.15 40.5023H60.7523V49.5023H12.15L0.00224984 90.0023L90.0023 45.0023Z" fill="#0D0C0C" />
          </svg>
        </div>

        <div className={classes.textBlock}>
          <h4 className={classes.topText}>Підпишись на розсилку</h4>
          <h5 className={classes.bottomText}>та першим дізнайся про нові Б/У надходження</h5>
        </div>

        <div className={classes.inputBlock}>
          <input type="text" placeholder="Введіть пошту" />
          <button >
            Підписатись
            <svg width="20" height="21" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12.5H19" stroke="#F7F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 5.5L19 12.5L12 19.5" stroke="#F7F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={classes.phoneBlockTitle}>
        <span>Новинки</span>
        <span>
          <svg width="21" height="35" viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4141 32.0861L5.82906 17.5001L20.4141 2.91406L17.5861 0.0860634L0.171064 17.5001L17.5861 34.9141L20.4141 32.0861Z" fill="black" />
          </svg>
          <svg width="21" height="35" viewBox="0 0 21 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.585938 2.91394L15.1709 17.4999L0.585938 32.0859L3.41394 34.9139L20.8289 17.4999L3.41394 0.0859375L0.585938 2.91394Z" fill="black" />
          </svg>
        </span>
      </div>

      <div className={classes.phones}>
        {data &&
          data.map((item: CardProps) => (
            <NavLink className={classes.link} to={PHONE_URL + item.id}>
              <Card
                key={item.id}
                id={item.id}
                brand={item.brand}
                model={item.model}
                description={item.description}
                price={item.price}
                mainPictureURL={item.mainPictureURL}
                rating={item.rating}
              />
            </NavLink>
          ))}
      </div>
      {isPending && <p>Loading...</p>}
      {isError && "Failed to fetch data"}

    </div>
  );
};

export default HomePage;
