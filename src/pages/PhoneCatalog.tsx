import React from "react";
import classes from "./PhoneCatalog.module.scss"
import CheckBoxBlock from "../UI/CheckBox/CheckBoxBlock";
import CatalogCard from "../components/Card/CatalogCard";

const PhoneCatalog: React.FC = () => {


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
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />
                <CatalogCard />

            </div>

        </div>
    )
}

export default PhoneCatalog;