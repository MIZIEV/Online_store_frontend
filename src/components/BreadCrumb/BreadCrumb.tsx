import React from "react";
import { Link } from "react-router-dom";
import classes from "./BreadCrumb.module.scss"

interface BreadcrumbItem {
    path: string;
    title: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}



const BreadCrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <>
            <nav className={classes.breadCrumbNav} >
                <ol>
                    {
                        items.map((item, index) => (
                            <li key={index} >
                                {index === items.length - 1 ? (
                                    item.title
                                ) : (
                                    <Link className={classes.Link} to={item.path}>{item.title}</Link>
                                )}
                            </li>
                        ))
                    }
                </ol>
            </nav>
        </>
    )
}

export default BreadCrumb;