import React from 'react';

/*
A stateless component to  abstracted away all markup functions 
to avoid repeated markup
*/
const loginFormInput = props => {
    const { name, label, input, type, meta } = props;
    return (
        <div className="loginForm__wrapper">
            <label htmlFor={name} className="loginForm__label">
                {label}
            </label>
            <input {...input} className="loginForm__input" type={type} />
            {meta.error && meta.touched && (
                <div style={{ color: 'red', fontSize: '0.8rem' }}>{meta.error}</div>
            )}
        </div>
    );
};

export default loginFormInput;
