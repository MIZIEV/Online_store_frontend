import React from "react";
import { Link } from "react-router-dom";

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
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        items.map((item, index) => (
                            <li key={index} className={`breadcrumb-item${index === items.length - 1 ? `acrive` : ``}`}>
                                {index === items.length - 1 ? (
                                    item.title
                                ) : (
                                    <Link to={item.path}>{item.title}</Link>
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