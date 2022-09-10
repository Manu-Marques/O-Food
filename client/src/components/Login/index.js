/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.scss';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.service';
import sanitizeHtml from 'sanitize-html';


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback">
        Ce champ est requis !
      </div>
    );
  }
};

export default function Login({ login, addNewUserFunction }) {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const onChangeUseremail = (e) => {
    const email = sanitizeHtml(e.target.value);
    setUseremail(email);
  };
  const onChangePassword = (e) => {
    const password = sanitizeHtml(e.target.value);
    setPassword(password);
  };
  const handleLogin = (e) => {

    console.log("TOTO a la plage")
    e.preventDefault();

    setMessage('');
    setLoading(true);
    // form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        (user) => {
          console.log("USER", user)
          addNewUserFunction(user)
          navigate('/users/Dashboard');
          // window.location.reload(); // Interdit
          // On navige et c'est tout ! 
        },
        (error) => {
          const resMessage = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString();
          setLoading(false);
          setMessage(resMessage);
        },
      );
    }
    // Pourquoi ici il y 'a un .then ligne 48 ? C'est une promesse ? 
    else {
      setLoading(false);
    }
  };

  return (
    <div className="login__container">

    <div className="login">
      <Form className="login__form" action="" method="post" onSubmit={handleLogin}>
        <h1 className="login__title">Bienvenue !</h1>
        {message && (
        <div className="form-group">
          <div className="alert alert-danger login-danger" role="alert">
            {message}
          </div>
        </div>
        )}
        <div className="login__inputBx">
          <label htmlFor="email" className="login__email">Email</label>
          <Input name="email" id="email" type="text" className="login__input" value={email} onChange={onChangeUseremail} validations={[required]} />
        </div>
        <div className="login__inputBx">
          <label htmlFor="password" className="login__password">Mot de passe</label>
          <Input name="password" id="password" type="password" className="login__input" value={password} onChange={onChangePassword} validations={[required]} />
        </div>
        <Input className="login__submit" type="submit" value="Connexion" />
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>

    </div>

  );
}
