import { useQuery } from "@tanstack/react-query";
import { getMethod } from "../utils/http";
import Card from "../components/Card/Card";
import { CardProps } from "../shared.types";

const HomePage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getMethod("http://13.60.5.92:8080/api/product/list"),
  });

  return (
    <div>
      {isPending && <p>Loading...</p>}
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
