import React, { useEffect, useState } from "react";
import classes from "./PhoneCatalog.module.scss"
import CheckBoxBlock from "../UI/CheckBox/CheckBoxBlock";
import CatalogCard from "../components/Card/CatalogCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/http";
import { NavLink } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { getAllPhoneDistinctCharacteristics } from "../utils/phoneService";

const PhoneCatalog: React.FC = () => {

    const [filter, setFilter] = useState("?sort=maxRating");
    const [distinctPhoneCharacteristic, setDistinctPhoneCharacteristic] = useState({});

    useEffect(() => {
        getAllPhoneDistinctCharacteristics().then((response) => {
            setDistinctPhoneCharacteristic(response);
        })
    }, [])

    const { data, isPending, isError } = useQuery({
        queryKey: ["products", { filter: filter }],
        queryFn: ({ signal }) => getProducts({ signal, filter }),
    });

    return (
        <div className={classes.container}>
            <div className={classes.breadCrumb}>
                <BreadCrumb items={[{ path: "/", title: "Головна" }, { path: "/phone/catalog", title: "/товари" }]} />
            </div>

            <h1>Товари</h1>

            <div className={classes.pageContent}>

                <div className={classes.leftBlock}>
                    <CheckBoxBlock characteristicData={["Apple", "Samsung", "Xiaomi"]} title="Бренд" />
                    <CheckBoxBlock characteristicData={["Новий", "Бу"]} title="Стан" />
                    <CheckBoxBlock characteristicData={distinctPhoneCharacteristic.screenSize} title="Діагональ екрану" />
                    <CheckBoxBlock characteristicData={distinctPhoneCharacteristic.resolution} title="Роздільна здатність екрану" />
                    <CheckBoxBlock characteristicData={distinctPhoneCharacteristic.ram} title="Оперативна пам'ять" />
                    <CheckBoxBlock title="Обсяг пам'яті" />
                    <CheckBoxBlock characteristicData={distinctPhoneCharacteristic.countOfCores} title="Кількість ядер" />
                    <CheckBoxBlock characteristicData={distinctPhoneCharacteristic.countOfSimCard} title="Кількість SIM-карт" />
                </div>

                <div className={classes.rightBlock}>
                    {data && data.length > 0 ? (
                        data.map((phone) => (
                            <NavLink key={phone.id} to={`/phone/${phone.id}`} className={classes.link}>
                                <CatalogCard key={phone.id} phoneData={phone} />
                            </NavLink>
                        ))
                    ) : (
                        <div>No data</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PhoneCatalog;