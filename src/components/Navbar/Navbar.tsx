// Navbar.tsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout, isAdminUser } from "../../utils/AuthService"; // Додана функція logout
import Button from "../../UI/Button/Button";
import classes from "./Navbar.module.scss";
import CartIcon from "./Cart/CartIcon";

const Navbar = () => {
  const loggedInUser = getLoggedInUser();
  const isAdmin = isAdminUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Викликаємо функцію logout при кліку на кнопку LogOut
    navigate("/"); // Перенаправляємо користувача на сторінку входу після виходу
  };

  return (
    <header>
      <nav className={classes["navbar-top"]}>
        <NavLink to="/">
          <h1>TalkieTech</h1>
        </NavLink>

        {loggedInUser && (
          <div className={classes["welcome-message"]}>
            Welcome, {loggedInUser}
          </div>
        )}
        {isAdmin && ( // Перевіряємо, чи користувач є адміністратором
          <NavLink to="/admin">
            <Button>ADMIN</Button>{" "}
            {/* Відображаємо кнопку "ADMIN" тільки для адміністраторів */}
          </NavLink>
        )}
        {loggedInUser ? ( // Перевіряємо, чи користувач увійшов у систему
          <Button onClick={handleLogout}>Log Out</Button> // Якщо так, то відображаємо кнопку LogOut
        ) : (
          <>
            {" "}
            {/* Якщо користувач не увійшов у систему, відображаємо кнопки для входу, реєстрації та кнопку admin */}
            {/* <NavLink to="/signin">
                <Button>Sign in</Button>
              </NavLink> */}
            <Link className={classes.link} to="">
              Контакти
            </Link>
            <Link className={classes.link} to="">
              Оплата та доставка
            </Link>
            <Link className={classes.link} to="">
              Блог
            </Link>
            <NavLink to="/signin">
              <Button className={classes["signin-button"]}>Увійти</Button>
            </NavLink>
          </>
        )}
      </nav>
      <nav className={classes["navbar-bottom"]}>
        <Button className={classes["categories-button"]}>
          Категорії
          <img src="/public/icons/arrow.svg" alt="" />
        </Button>
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
          <input type="text" name="" id="" placeholder="Пошук"/>
          <Link to="cart">
            <div className={classes['cart-wrapper']}>
              <CartIcon />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
