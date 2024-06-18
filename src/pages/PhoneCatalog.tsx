import React, { useEffect, useState } from "react";
import classes from "./PhoneCatalog.module.scss"
import CheckBoxBlock from "../UI/CheckBox/CheckBoxBlock";
import CatalogCard from "../components/Card/CatalogCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/http";
import { Outlet, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { getAllPhoneDistinctCharacteristics } from "../utils/phoneService";
import ReactPaginate from 'react-paginate';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Phone, PhoneDistinctCharacteristics } from "../shared.types";
import PriceSliderComponent from "../UI/PriceSlider/PriceSliderComponent";
import { getWishListForUser } from "../utils/UserService";

const PhoneCatalog: React.FC = () => {
    const location = useLocation(); // New state for location

    const [filter, setFilter] = useState("?sort=maxRating");
    const [distinctPhoneCharacteristic, setDistinctPhoneCharacteristic] = useState<PhoneDistinctCharacteristics>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [wishList, setWishList] = useState<Phone[]>([]);
    const [isWishListLoading, setIsWishListLoading] = useState(true);
    const email = sessionStorage.getItem("authenticatedEmail");

    const itemsPerPage = 15;
    const screenSizes = ["до 4\"", "4.1\" - 4.9\"", "5\" - 5.5\"", "5.6\" - 6\"", "більше 6\""]

    const { data, isPending, isError } = useQuery({
        queryKey: ["products", { filter: filter }],
        queryFn: ({ signal }) => getProducts({ signal, filter }),
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get("searchTerm");
        if (searchQuery) {
            setFilter(`?searchTerm=${encodeURIComponent(searchQuery)}`);
            console.log(filter)
        }
    }, [location.search]);

    useEffect(() => {
        getAllPhoneDistinctCharacteristics().then((response) => {
            setDistinctPhoneCharacteristic(response);
        })
    }, [])

    useEffect(() => {
        if (data) {
            if (maxPrice === 0) {
                const maxPrice = Math.max(...data.map((product: any) => product.price));
                setMaxPrice(maxPrice);
            }
        }
    }, [data]);

    useEffect(() => {
        if (email) {
            setIsWishListLoading(true);
            getWishListForUser(email).then((response) => {
                console.log("Fetched wishlist:", response);
                setWishList(response);
                setIsWishListLoading(false);
            }).catch(error => {
                console.error("Error fetching wishlist:", error);
                setIsWishListLoading(false);
            });
        } else {
            setIsWishListLoading(false);
        }
    }, [email]);

    const handleFilterChange = (filterParams: { [key: string]: string[] }) => {
        const currentFilterParams = new URLSearchParams(filter);

        for (const key in filterParams) {
            if (Array.isArray(filterParams[key]) && filterParams[key].length > 0) {
                if (key === "screenSize") {

                    const screenSizeValues = filterParams[key].map(value => {
                        if (value === "до 4\"") return "0-4";
                        else if (value === "4.1\" - 4.9\"") return "4.1-4.9";
                        else if (value === "5\" - 5.5\"") return "5-5.5";
                        else if (value === "5.6\" - 6\"") return "5.6-6";
                        else return "6-10";
                    });
                    currentFilterParams.set(key, screenSizeValues.join(','));
                } else if (key === "isUsed") {
                    const transformedValues = filterParams[key].map(value => {
                        if (value === "Новий") return "false";
                        if (value === "Б/у") return "true";
                        return value;
                    });
                    currentFilterParams.set(key, transformedValues.join(','));
                } else {
                    currentFilterParams.set(key, filterParams[key].join(','));
                }
            } else {
                currentFilterParams.delete(key);
            }
        }

        const queryString = currentFilterParams.toString();
        setFilter(`?${queryString}`);
        setCurrentPage(0);
    }

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    }

    const offset = currentPage * itemsPerPage;
    const currentPageData = data ? data.slice(offset, offset + itemsPerPage) : [];

    const sortedResolutionData = distinctPhoneCharacteristic?.resolution?.sort((a: string, b: string) => {
        if (!a || !b) return 0;

        const [aWidth, aHeight] = a.split('x').map(Number);
        const [bWidth, bHeight] = b.split('x').map(Number);

        if (aWidth !== bWidth) {
            return aWidth - bWidth;
        }

        return aHeight - bHeight;
    });

    const sortedRomData = distinctPhoneCharacteristic?.rom?.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
    const sortedRamData = distinctPhoneCharacteristic?.ram?.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
    const sortedCountOfCoresData = distinctPhoneCharacteristic?.countOfCores?.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));
    const sortedCountOfSimCardData = distinctPhoneCharacteristic?.countOfSimCard?.sort((a: string, b: string) => parseFloat(a) - parseFloat(b));

    const isInWishlist = (phoneId) => {
        return wishList.some(phone => phone.id === phoneId);
    };

    const leftButton = () => {
        return (
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.5859 6.58496L13.1709 23.999L30.5859 41.413L33.4139 38.585L18.8289 23.999L33.4139 9.41296L30.5859 6.58496Z" fill="black" />
            </svg>
        )
    }

    const rightButton = () => {
        return (
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5859 9.41296L29.1709 23.999L14.5859 38.585L17.4139 41.413L34.8289 23.999L17.4139 6.58496L14.5859 9.41296Z" fill="black" />
            </svg>
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.breadCrumb}>
                <BreadCrumb items={[{ path: "/", title: "Головна" }, { path: "/phone/catalog", title: "/телефони" }]} />
            </div>

            <h1>Товари</h1>

            <div className={classes.pageContent}>

                <div className={classes.leftBlock}>

                    <PriceSliderComponent maxPrice={maxPrice} onFilterChange={handleFilterChange} />
                    <Outlet />

                    <CheckBoxBlock
                        filterKey="brand"
                        onFilterChange={handleFilterChange}
                        characteristicData={["Apple", "Samsung", "Xiaomi"]}
                        title="Бренд" />
                    <CheckBoxBlock
                        filterKey="isUsed"
                        onFilterChange={handleFilterChange}
                        characteristicData={["Новий", "Б/у"]}
                        title="Стан" />
                    <CheckBoxBlock
                        filterKey="screenSize"
                        onFilterChange={handleFilterChange}
                        characteristicData={screenSizes}
                        title="Діагональ екрану" />
                    <CheckBoxBlock
                        filterKey="resolution"
                        onFilterChange={handleFilterChange}
                        characteristicData={sortedResolutionData}
                        title="Роздільна здатність екрану" />
                    <CheckBoxBlock
                        filterKey="ram"
                        onFilterChange={handleFilterChange}
                        characteristicData={sortedRamData}
                        title="Оперативна пам'ять" />
                    <CheckBoxBlock
                        filterKey="rom"
                        onFilterChange={handleFilterChange}
                        characteristicData={sortedRomData}
                        title="Обсяг пам'яті" />
                    <CheckBoxBlock
                        filterKey="countOfCores"
                        onFilterChange={handleFilterChange}
                        characteristicData={sortedCountOfCoresData}
                        title="Кількість ядер" />
                    <CheckBoxBlock
                        filterKey="countOfSimCard"
                        onFilterChange={handleFilterChange}
                        characteristicData={sortedCountOfSimCardData}
                        title="Кількість SIM-карт" />
                </div>

                <div className={classes.rightBlock}>
                    {isWishListLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <TransitionGroup component={null}>{
                            currentPageData.map((phone) => (
                                <CSSTransition
                                    key={phone.id}
                                    timeout={300}
                                    classNames={{
                                        enter: classes.itemEnter,
                                        enterActive: classes.itemEnterActive,
                                        exit: classes.itemExit,
                                        exitActive: classes.itemExitActive,
                                    }}
                                >
                                    <CatalogCard inWishList={isInWishlist(phone.id)} phoneData={phone} />
                                </CSSTransition>
                            ))
                        }
                        </TransitionGroup>
                    )}
                </div>
            </div>

            {data && data.length > 0 && (
                <ReactPaginate
                    className={classes.pagination}
                    previousLabel={leftButton()}
                    nextLabel={rightButton()}
                    breakLabel={"..."}
                    pageCount={Math.ceil(data.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={classes.pagination}
                    activeClassName={classes.active}
                />
            )}
        </div>
    )
}

export default PhoneCatalog;