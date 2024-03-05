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

  console.log(data);

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      {data && data.length === 0 && <p>Nothing was found for your search</p>}
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
      {isPending && <p>Loading...</p>}
      {isError && "Failed to fetch data"}
    </div>
  );
};

export default HomePage;
