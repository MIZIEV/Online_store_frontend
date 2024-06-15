import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Footer.module.scss";
import { useState } from "react";
import { isUserLoggedIn } from "../../utils/AuthService";
import ErrorModal from "../../UI/Modal/ErrorModal";

const Footer = () => {

  const navigator = useNavigate();
  const isAuthenticated = isUserLoggedIn();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const scrollToNewPhonesHandler = () => {
    const newPhonesSection = document.getElementById("newPhones");

    if (newPhonesSection) {
      newPhonesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSpecialOffersHandler = () => {
    const specialOffersSection = document.getElementById("specialOffers");
    if (specialOffersSection) {
      specialOffersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSelsLeadersHandler = () => {
    const selsLeadersSection = document.getElementById("selsLeaders");
    if (selsLeadersSection) {
      selsLeadersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToCatalogPage = () => {
    navigator("phone/catalog")
  }

  const navigateToPersonalPage = () => {
    if (!isAuthenticated) {
      setIsError(true);
      errorMessages.push("Для переходу на особисту сторінку авторизуйтесь!");
      setErrorMessages(errorMessages);
      return;
    }
    navigator(":savedUser/personal-page");
  }

  const closeErroModalHandler = () => {
    setErrorMessages([]);
    setIsError(false);
  }

  return (
    <div className={classes["footer-wrapper"]}>

      {isError && <ErrorModal message={errorMessages} onClose={closeErroModalHandler} />}
      <footer>

        <h1>TalkieTech</h1>

        <div className={classes["footer-sections"]}>

          <div >
            <p>Приймаємо дзвінки з 10:00 до 19:00</p>
            <p className={classes["phone-section"]}>
              <img src="/public/icons/phone.svg" alt="" />
              <span className={classes["phone"]}>0 800 600 600</span>
            </p>

            <p>Безкоштовно по Україні</p>
            <p>З’явились питання - support@TalkieTech.ua</p>
          </div>

          <div>
            <NavLink className={classes.link} to="/payment-delivery">
              <p>Оплата і доставка</p>
            </NavLink>

            <p onClick={navigateToPersonalPage}>Особистий кабінет</p>

            <NavLink className={classes.link} to="/guarantee">
              <p>Гарантія</p>
            </NavLink>

            <NavLink className={classes.link} to={"/blog"}>
              <p>Блог</p>
            </NavLink>

          </div>

          <div>
            <p className={classes.link} onClick={scrollToSpecialOffersHandler}>Б/У пропозиції</p>
            <p className={classes.link} onClick={scrollToSelsLeadersHandler}>Бестселери</p>
            <p className={classes.link} onClick={scrollToNewPhonesHandler}>Новинки</p>
          </div>

          <div>
            <p className={classes.link} onClick={navigateToCatalogPage}>Apple</p>
            <p className={classes.link} onClick={navigateToCatalogPage}>Samsung</p>
            <p className={classes.link} onClick={navigateToCatalogPage}>Xiaomi</p>
          </div>
        </div>
        <p className={classes['footer-botom']}>
          @Інтеренет-магазин “TalkieTech” 2023-2024. Всі права захищені.
          Оголошена вартість товарів та умови їх придбання дійсні на поточну
          дату.
        </p>
      </footer>
    </div>
  );
};
export default Footer;
