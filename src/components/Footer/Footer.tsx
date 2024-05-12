import { NavLink } from "react-router-dom";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={classes["footer-wrapper"]}>

      <footer>

        <h1>TalkieTech</h1>

        <div className={classes["footer-sections"]}>

          <div>
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

            <p>Особистий кабінет</p>

            <NavLink className={classes.link} to="/guarantee">
              <p>Гарантія</p>
            </NavLink>

            <NavLink className={classes.link} to={"/blog"}>
              <p>Блог</p>
            </NavLink>

          </div>

          <div>
            <p>Б/У пропозиції</p>
            <p>Бестселери</p>
            <p>Новинки</p>
          </div>

          <div>
            <p>Apple</p>
            <p>Samsung</p>
            <p>Xiaomi</p>
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
