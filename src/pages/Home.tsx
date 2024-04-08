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
