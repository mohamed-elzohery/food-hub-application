import React from 'react';
import classes from './LoginForm.module.css'
import useInput from '../hooks/use-input';
import FormGroup from './FormGroup';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[A-Za-z]\w*$/;

const validateName = (val) => {
    let name = val.toString().trim();
    if(name === '' ) return {isValid: false, msg: 'Name is required'};
    if(name.length < 3 ) return {isValid: false, msg: 'Name is less than 3 chars'};
    if(!name.match(usernameRegex)) return {isValid: false, msg: 'Name is not valid'};
    return {isValid: true}
}

const validateEmail = (val) => {
    let email = val.toString().trim().toLowerCase();
    if(email === '' ) return {isValid: false, msg: 'Email is required'};
    if(!email.match(emailRegex)) return {isValid: false, msg: 'Eamil is not valid'};
    return {isValid: true}
}

const validatePassword = (val) => {
    let password = val.toString().trim().toLowerCase();
    if(password === '' ) return {isValid: false, msg: 'Password is required'};
    if(password.length < 8 ) return {isValid: false, msg: 'Name is less than 8 chars'};
    return {isValid: true}
}

const LoginForm = () => {
    const {
        enteredValue: enteredName, 
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        msg: nameErrMsg,
        isValid: isNameValid,
        resetHandler: resetNameHandler
    } = useInput(validateName);

    const {
        enteredValue: enteredEmail, 
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        msg: emailErrMsg,
        isValid: isEmailValid,
        resetHandler: resetEmailHandler
    } = useInput(validateEmail);

    const {
        enteredValue: enteredPassword, 
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        msg: passwordErrMsg,
        isValid: isPasswordValid,
        resetHandler: resetPasswordHandler
    } = useInput(validatePassword);

    const onSumbitHandler = (e) => {
        e.preventDefault();
        console.log('Form is sumbitted successfully');
        resetNameHandler();
        resetEmailHandler();
        resetPasswordHandler();
    }


    return(
        <form onSubmit={onSumbitHandler} className={classes.form}>
            <FormGroup 
            type='text'
            name='name'
            valueChangedHandler={nameChangeHandler}
            inputBlurHandler={nameBlurHandler}
            enteredValue={enteredName}
            inputHasError={nameInputHasError}
            errMsg={nameErrMsg}
            />
             <FormGroup 
            type='text'
            name='email'
            valueChangedHandler={emailChangeHandler}
            inputBlurHandler={emailBlurHandler}
            enteredValue={enteredEmail}
            inputHasError={emailInputHasError}
            errMsg={emailErrMsg}
            />
             <FormGroup 
            type='password'
            name='password'
            valueChangedHandler={passwordChangeHandler}
            inputBlurHandler={passwordBlurHandler}
            enteredValue={enteredPassword}
            inputHasError={passwordInputHasError}
            errMsg={passwordErrMsg}
            />
            <div className={classes['form-action']}>
                <button className={`${isEmailValid && isNameValid && isPasswordValid ? '' : classes.disabled}`}>Sumbit</button>
            </div> 
        </form>
    );
}

export default LoginForm;