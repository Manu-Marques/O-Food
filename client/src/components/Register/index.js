/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.scss';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire.
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Cet email n'est pas valide.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 4 || value.length > 12) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit être comprit entre 4 et 12 caractères.
      </div>
    );
  }
};

export default function Register() {


  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          navigate("/users/login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="register">
      <h1 className="form__creatAccount">Créer un compte</h1>
      <p className="form__texte">Des recettes crées aux petits oignons pour vous.</p>
      <Form className="form" onSubmit={handleRegister} ref={form}>
        <div className="form__register">
        <label className="form__email" htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />

        <label className="form__password" htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />

          <div className="form__checkbox">
            <input type="checkbox" required="required" name="checkbox" className="regular-checkbox" />
            <h2 className="form__cgu">J'ai lu et j'accepte les conditions générales d'utilisation</h2>
          </div>
          <h2 className="form__alreadyRegister">Déjà inscris ? <NavLink to="/users/login"><span className="form__log">Connecte-toi</span></NavLink></h2>
          <div className="form__creatAccount">
            <Input className="form__registerSubmit" type="submit" value="Créer un compte" />
          </div>
        </div>
        {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>

    </div>
  );
}
