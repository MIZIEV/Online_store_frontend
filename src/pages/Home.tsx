import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/http";
import Card from "../components/Card/Card";
import { CardProps } from "../shared.types";
import Filter from "../components/HomePage/Filter/Filter";
import { useState } from "react";

const HomePage = () => {
  const [filter, setFilter] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", { filter: filter }],
    queryFn: ({ signal }) => getProducts({ signal, filter }),
  });

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div>
      {isPending && <p>Loading...</p>}
      <Filter onFilterChange={handleFilterChange} />
      {data &&
        data.map((item: CardProps) => (
          <Card
            key={item.id}
            id={item.id}
            brand={item.brand}
            model={item.model}
            description={item.description}
            price={item.price}
            pictureURL={item.pictureURL}
          />
        ))}
      {isError && "Failed to fetch data"}
    </div>
  );
};

export default HomePage;
