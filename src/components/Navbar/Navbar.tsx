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
    <nav className={classes.navbar}>
      <NavLink to="/">
        <h1>SHOPNAME</h1>
      </NavLink>
      <div className={classes["buttons-wrapper"]}>
        <Link to="cart">
          <CartIcon />
        </Link>
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
            <NavLink to="/signin">
              <Button>Sign in</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button>Sign up</Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
