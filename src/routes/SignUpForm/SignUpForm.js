import { useState } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './signUpForm.styles.scss';

const defaultFormFields = {
  displayName: 'Abhishek Kumar',
  email: '',
  password: '',
  confirmedPassword: ''
}

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmedPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmedPassword) {
      alert("passwords do not match");
      return;
    };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch(error) {
      if(error.code === 'auth/email-already-in=user') {
        alert("email already in use");
      } else {
        console.log('user creation encountered an error', error.message);
      }
    }

  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(event) => { handleSubmit(event) }}>
        <FormInput
          label="DisplayName"
          type="text"
          name="displayName" 
          value={ displayName }
          onChange={ handleChange }
          required />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          required />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={ password }
          onChange={ handleChange }
          required />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmedPassword"
          value={ confirmedPassword }
          onChange={ handleChange }
          required />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;