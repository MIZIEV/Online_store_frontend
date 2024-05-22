import { Link, NavLink, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout, isAdminUser } from "../../utils/AuthService";
import Button from "../../UI/Button/Button";
import classes from "./Navbar.module.scss";
import CartButton from "./Cart/CartButton";

const Navbar = () => {
  const loggedInUser = getLoggedInUser();
  const isAdmin = isAdminUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <nav className={classes["navbar-top"]}>
        <NavLink to="/">
          <h1>TalkieTech</h1>
        </NavLink>

        {isAdmin && (
          <>
            <NavLink to="/admin">
              <Button className={classes["signin-button"]}>ADMIN</Button>{" "}
            </NavLink>
          </>
        )}
        {loggedInUser ? (
          <>
            <Link className={classes.link} to="">
              Контакти
            </Link>
            <Link className={classes.link} to="/payment-delivery">
              Оплата та доставка
            </Link>
            <Link className={classes.link} to="/blog">
              Блог
            </Link>
            <Button className={classes["signin-button"]} onClick={handleLogout}>Вийти</Button>
          </>

        ) : (
          <>
            <Link className={classes.link} to="">
              Контакти
            </Link>
            <Link className={classes.link} to="/payment-delivery">
              Оплата та доставка
            </Link>
            <Link className={classes.link} to="/blog">
              Блог
            </Link>
            <NavLink to="/signin">
              <Button className={classes["signin-button"]}>Увійти</Button>
            </NavLink>
          </>
        )}
      </nav>
      <nav className={classes["navbar-bottom"]}>

        <div className={classes['links-group']}>
          <Link className={classes.link} to="">
            Б/У пропозиції
          </Link>
          <Link className={classes.link} to="">
            Бестселери
          </Link>
          <Link className={classes.link} to="">
            Новинки
          </Link>
        </div>
        <div className={classes['search-cart-group']}>
          <input type="text" name="" id="" placeholder="Пошук" />
          <CartButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;