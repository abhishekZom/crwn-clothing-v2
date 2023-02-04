import { useState } from "react";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import './signInForm.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();

    } catch(error) {
      if(error.code === 'auth/wrong-password') {
        alert("wrong password");
      } else if(error.code === 'auth/user-not-found') {
        alert("user not found");
      } else {
        alert("something went wrong");
      }
      console.log(error.message)
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(event) => { handleSubmit(event) }}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google" 
            onClick={ signInWithGoogle }>Google sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;