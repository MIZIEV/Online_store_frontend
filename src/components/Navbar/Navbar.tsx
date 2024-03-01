//Navbar.tsx

import { NavLink } from "react-router-dom";
import { getLoggedInUser } from "../../utils/AuthService";
import Button from "../../UI/Button/Button";
import classes from "./Navbar.module.scss";

const Navbar = () => {
	const loggedInUser = getLoggedInUser();

	return (
		<nav className={classes.navbar}>
			<NavLink to="/">
				<h1>SHOPNAME</h1>
			</NavLink>
			<div className={classes["buttons-wrapper"]}>
				{loggedInUser && <div className={classes["welcome-message"]}>Welcome, {loggedInUser}</div>}
				<NavLink to="/admin">
					<Button>ADMIN</Button>
				</NavLink>
				<NavLink to="/signin">
					<Button>Sign in</Button>
				</NavLink>
				<NavLink to="/signup">
					<Button>Sign up</Button>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;