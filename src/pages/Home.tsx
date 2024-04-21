import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/http";
import Card from "../components/Card/Card";
import { CardProps } from "../shared.types";
import Filter from "../components/HomePage/Filter/Filter";
import { useState } from "react";
import classes from "./Home.module.scss";
import { Outlet } from "react-router";

const HomePage = () => {
  const [filter, setFilter] = useState("?sort=maxRating");

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
            image
          </div>
        </div>

        <div className={classes.middleBlock}>
          img
        </div>

        <div className={classes.rightBlock}>
          <div className={classes.rigthImage}>
            image
          </div>
          <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90.0023 45.0023L0 0L12.15 40.5023H60.7523V49.5023H12.15L0.00224984 90.0023L90.0023 45.0023Z" fill="#0D0C0C" />
          </svg>
        </div>
      </div>



      <Outlet />
      <Filter onFilterChange={handleFilterChange} />
      {data && data.length === 0 && <p>Nothing was found for your search</p>}
      <div className={classes.products}>
        {data &&
          data.map((item: CardProps) => (
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
          ))}
      </div>
      {isPending && <p>Loading...</p>}
      {isError && "Failed to fetch data"}
    </div>
  );
};

export default HomePage;
