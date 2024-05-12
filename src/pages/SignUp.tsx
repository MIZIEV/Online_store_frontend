
import React from 'react';
import RegistrationForm from '../components/Forms/RegistrationForm';
import classes from "./SignUp.module.scss"

const SignUpPage: React.FC = () => {
	return (
		<div className={classes["page"]}>
			<RegistrationForm />
		</div>
	);
};

export default SignUpPage;
