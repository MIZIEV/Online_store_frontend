import { Link, NavLink, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout, isAdminUser } from "../../utils/AuthService";
import Button from "../../UI/Button/Button";
import classes from "./Navbar.module.scss";
import CartButton from "./Cart/CartButton";

const Navbar = () => {
  const loggedInUser = getLoggedInUser();
  const isAdmin = isAdminUser();
  const navigate = useNavigate();
  const savedUser = sessionStorage.getItem("authenticatedUser");

  const handleLogout = () => {
    navigate(`${savedUser}/personal-page`);
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
            <Button className={classes["signin-button"]} onClick={handleLogout}>
              <svg width="17" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4215 13.457L12.5 18L7.5785 13.457C4.837 15.2105 3 18.3745 3 22H22C22 18.3745 20.163 15.2105 17.4215 13.457Z" fill="white" />
                <path d="M12.5 14C14.275 14 15.8645 13.225 16.963 12C17.9155 10.938 18.5 9.539 18.5 8C18.5 4.6865 15.8135 2 12.5 2C9.1865 2 6.5 4.6865 6.5 8C6.5 9.539 7.0845 10.938 8.037 12C9.1355 13.225 10.725 14 12.5 14Z" fill="white" />
              </svg>
              {savedUser?.substring(0, 6) + "..."}
            </Button>
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