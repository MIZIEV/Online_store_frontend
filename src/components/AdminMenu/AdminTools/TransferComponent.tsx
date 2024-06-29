import React from "react";
import classes from "./TransferComponent.module.scss";
import { NavLink, Outlet } from "react-router-dom";

const TransferComponent: React.FC = () => {

    return (
        <div className={classes.container}>

            <Outlet />

            <div className={classes.buttonContainer}>

                <div className={classes.linkBlock}>
                    <h3>Керування смартфонами</h3>
                    <NavLink to="/admin/phone-managment">
                        <svg viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.9785 40C23.1845 40 24.9785 38.206 24.9785 36V4C24.9785 1.794 23.1845 0 20.9785 0H4.97852C2.77252 0 0.978516 1.794 0.978516 4V36C0.978516 38.206 2.77252 40 4.97852 40H20.9785ZM8.97852 4V8H16.9785V4H20.9785L20.9735 32H4.97852V4H8.97852Z" />
                        </svg>
                    </NavLink>
                </div>

                <div className={classes.linkBlock}>
                    <h3>Керування блогами</h3>
                    <NavLink to="/admin/blog-managment">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.0001 12H8.03613V16H40.0001V12Z" />
                            <path d="M40.0001 22H8.03613V26H40.0001V22Z" />
                            <path d="M40.0001 32H8.03613V36H40.0001V32Z" />
                        </svg>
                    </NavLink>
                </div>

                <div className={classes.linkBlock}>
                    <h3>Керування замовленнями</h3>
                    <NavLink to="/admin/orders-managment">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.999 22.002H16.002V26.002H41.999V22.002Z" />
                            <path d="M41.999 11.9951H16.002V15.9951H41.999V11.9951Z" />
                            <path d="M41.999 32.0078H16.002V36.0078H41.999V32.0078Z" />
                            <path d="M10 12H6V16H10V12Z" />
                            <path d="M10 22.0059H6V26.0059H10V22.0059Z" />
                            <path d="M10 32.0127H6V36.0127H10V32.0127Z" />
                        </svg>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

export default TransferComponent;