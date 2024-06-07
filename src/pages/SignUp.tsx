
import React from 'react';
import RegistrationForm from '../components/Forms/RegistrationForm';
import classes from "./SignUp.module.scss"
import { Outlet } from 'react-router';

const SignUpPage: React.FC = () => {
	return (
		<div className={classes["page"]}>
			<Outlet />
			<RegistrationForm />
		</div>
	);
};

export default SignUpPage;
