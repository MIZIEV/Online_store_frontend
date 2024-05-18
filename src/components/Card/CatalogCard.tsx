import React from "react";
import classes from "./CatalogCard.module.scss";

const CatalogCard: React.FC = (props) => {

    const phoneData = props.phoneData;
    const colors = props.phoneData.colors;

    return (
        <div className={classes.container}>
            <div className={classes.image}>

                <img src={phoneData.mainPictureURL} />

                <div className={classes.colors}>

                    {
                        colors.map((color, index) => (
                            <div
                                key={index}
                                className={classes.circle}
                                style={{ backgroundColor: color.colorName }}></div>
                        ))
                    }
                </div>

            </div>

            <div className={classes.bottomBlock}>
                <div className={classes.textBlock}>
                    <h4>{phoneData.model}</h4>
                    <h5>{`Код товару: ${phoneData.id}`}</h5>
                    <h4>{`${phoneData.price} ₴`}</h4>
                </div>

                <div className={classes.likeIcon}>
                    <svg width="24" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.8797 2.66754C23.4663 1.25048 21.5928 0.385592 19.5975 0.229098C17.6022 0.0726048 15.6167 0.634826 13.9997 1.81421C12.3033 0.552388 10.1917 -0.0197801 8.09028 0.212921C5.98885 0.445623 4.05364 1.46591 2.67435 3.06832C1.29506 4.67073 0.574146 6.73623 0.656784 8.84889C0.739423 10.9615 1.61947 12.9644 3.11972 14.4542L11.3997 22.7475C12.0931 23.4299 13.0269 23.8124 13.9997 23.8124C14.9725 23.8124 15.9064 23.4299 16.5997 22.7475L24.8797 14.4542C26.4365 12.8879 27.3103 10.7692 27.3103 8.56087C27.3103 6.35251 26.4365 4.23385 24.8797 2.66754ZM22.9997 12.6142L14.7197 20.8942C14.6255 20.9893 14.5134 21.0649 14.3898 21.1164C14.2662 21.1679 14.1336 21.1945 13.9997 21.1945C13.8658 21.1945 13.7332 21.1679 13.6097 21.1164C13.4861 21.0649 13.3739 20.9893 13.2797 20.8942L4.99972 12.5742C3.95406 11.5053 3.36853 10.0695 3.36853 8.57421C3.36853 7.07892 3.95406 5.64308 4.99972 4.5742C6.06526 3.52219 7.50235 2.9323 8.99972 2.9323C10.4971 2.9323 11.9342 3.52219 12.9997 4.5742C13.1237 4.69918 13.2711 4.79837 13.4336 4.86606C13.5961 4.93375 13.7704 4.9686 13.9464 4.9686C14.1224 4.9686 14.2967 4.93375 14.4592 4.86606C14.6216 4.79837 14.7691 4.69918 14.8931 4.5742C15.9586 3.52219 17.3957 2.9323 18.8931 2.9323C20.3904 2.9323 21.8275 3.52219 22.893 4.5742C23.9531 5.62907 24.5578 7.05713 24.5778 8.55245C24.5977 10.0478 24.0312 11.4915 22.9997 12.5742V12.6142Z" fill="#767676" />
                    </svg>
                </div>

            </div>

        </div>
    )
}

export default CatalogCard;