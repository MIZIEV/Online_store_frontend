import React, { useState } from "react";
import classes from "./UserPersonalPage.module.scss";
import OrderHistory from "../components/UserPageAdditionalComponents/OrderHistory";
import WishList from "../components/UserPageAdditionalComponents/WishList";
import UserData from "../components/UserPageAdditionalComponents/UserData";

interface PageState {
    selectedOption: string;
}

const UserPersonalPage: React.FC = () => {


    const [pageState, setPageState] = useState<PageState>({
        selectedOption: 'option1'
    });

    const handleOptionChange = (option: string) => {
        setPageState({ selectedOption: option });
    };


    return (
        <div className={classes.container}>
            <div className={classes.topBlock}>
                <div className={classes.leftMenuBlock}>
                    <h5>Мій кабінет</h5>

                    <label onClick={() => handleOptionChange('option1')}>Історія замовлень</label>
                    <label onClick={() => handleOptionChange('option2')}>Список бажань</label>
                    <label onClick={() => handleOptionChange('option1')}>Налаштування</label>
                    <label>Вихід</label>
                </div>

                {pageState.selectedOption && (
                    <div className={classes.rightContentBlock}>
                        {pageState.selectedOption === 'option1' && <OrderHistory />}
                        {pageState.selectedOption === 'option2' && <WishList />}
                        {pageState.selectedOption === 'option3' && <UserData />}
                    </div>
                )}

            </div>

            <div className={classes.bottomBlock}>
                <div className={classes.subscribeBlock}>

                    <div className={classes.iconBlock}>
                        <svg width="80" height="80" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M90.0023 45.0023L0 0L12.15 40.5023H60.7523V49.5023H12.15L0.00224984 90.0023L90.0023 45.0023Z" fill="#0D0C0C" />
                        </svg>
                    </div>

                    <div className={classes.textBlock}>
                        <h4 className={classes.topText}>Підпишись на розсилку</h4>
                        <h5 className={classes.bottomText}>та першим дізнайся про нові Б/У надходження</h5>
                    </div>

                    <div className={classes.inputBlock}>
                        <input type="text" placeholder="Введіть пошту" />
                        <button >
                            Підписатись
                            <svg width="20" height="21" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12.5H19" stroke="#F7F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 5.5L19 12.5L12 19.5" stroke="#F7F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonalPage;