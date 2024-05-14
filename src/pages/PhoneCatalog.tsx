import React, { useState } from "react";
import classes from "./PhoneCatalog.module.scss"
import CheckBoxBlock from "../UI/CheckBox/CheckBoxBlock";
import CatalogCard from "../components/Card/CatalogCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/http";
import { NavLink } from "react-router-dom";

const PhoneCatalog: React.FC = () => {

    const [filter, setFilter] = useState("?sort=maxRating");

    const { data, isPending, isError } = useQuery({
        queryKey: ["products", { filter: filter }],
        queryFn: ({ signal }) => getProducts({ signal, filter }),
    });

    return (
        <div className={classes.container}>
            <div className={classes.leftBlock}>

                <CheckBoxBlock title="Бренд" />
                <CheckBoxBlock title="Модель смартфона" />
                <CheckBoxBlock title="Стан" />
                <CheckBoxBlock title="Діагональ екрану" />
                <CheckBoxBlock title="Роздільна здатність екрану" />
                <CheckBoxBlock title="Оперативна пам'ять" />
                <CheckBoxBlock title="Обсяг пам'яті" />
                <CheckBoxBlock title="Кількість ядер" />
                <CheckBoxBlock title="Кількість SIM-карт" />
            </div>

            <div className={classes.rightBlock}>
                {data && data.length > 0 ? (
                    data.map((phone) => (
                        <NavLink to={`/phone/${phone.id}`} className={classes.link}>

                            <CatalogCard phoneData={phone} />
                        </NavLink>
                    ))
                ) : (
                    <div>No data</div>
                )}

            </div>

        </div>
    )
}

export default PhoneCatalog;