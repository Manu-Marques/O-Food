/* eslint-disable jsx-a11y/label-has-associated-control */
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // 



export default function profilForm({ submitProfilForm, currentUser, updateUserState }) {
  // console.log("currentUser From PROFILE FORM",currentUser)

  return (
    <form className="profilForm" action="" onSubmit={submitProfilForm}>
      <legend className="profilForm__legend">Mes informations</legend>
      {currentUser?.profil_is_completed ? (<img className="profile__user-pic" src="https://i89.servimg.com/u/f89/09/02/66/41/avmys10.jpg" alt="avatar" />) : (<img className="profile__user-pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="avatar" />)}
      <fieldset className="profilForm__fieldset">
        <div className="profilForm__inputBx">
          <label htmlFor="lastname" className="profilForm__label">
            Nom
          </label>
          <input 
            id="lastname" 
            name="lastname" 
            type="text" 
            className="profilForm__input" 
            value={currentUser?.lastname} 
            onChange={updateUserState}/>
        </div>
        <div className="profilForm__inputBx">
          <label htmlFor="firstname" className="profilForm__label">
            Prénom
          </label>
          <input 
            id="firstname" 
            name="firstname" 
            type="text" 
            className="profilForm__input" 
            value={currentUser?.firstname} 
            onChange={updateUserState}/>
        </div>
      </fieldset>
      <fieldset className="profilForm__fieldset">

        <label htmlFor="sex" className="profilForm__label">
          Sexe
        </label>
        <div className="profilForm__inputBx--gender">
          <label htmlFor="f" className="profilForm__label">
            <input 
            id="f" 
            name="sex" 
            type="radio" 
            className="profilForm__input--radio"
            value="Femme" 
            onChange={updateUserState}/>
            Femme
          </label>
          <label htmlFor="m" className="profilForm__label">
            <input 
            id="m" 
            name="sex" 
            type="radio" 
            className="profilForm__input--radio" 
            checked="checked"
            value="Homme" 
            onChange={updateUserState}/>
            Homme
          </label>
        </div>

        <div className="profilForm__inputBx">
          <label htmlFor="height" className="profilForm__label">
            Taille
          </label>
          <input 
          id="height" 
          type="text" 
          name="height" 
          className="profilForm__input" 
          value={currentUser?.height} 
          onChange={updateUserState}
          />
        </div>
        <div className="profilForm__inputBx">
          <label htmlFor="weight" className="profilForm__label">
            Poids
          </label>
          <input id="weight"
          type="text"
          name="weight"
          className="profilForm__input"
          value={currentUser?.weight} 
          onChange={updateUserState}
          />
        </div>
      </fieldset>
      <fieldset className="profilForm__fieldset">
        <h3 className="profilForm__subtitle profilForm__subtitle--raspberry">Intolérances</h3>

        <div className="profilForm__inputBx--selectBx">
          <label htmlFor="vegetarien" className="profilForm__label profilForm__label--option">
            <input id="vegetarien"
            type="checkbox"
            name="intolerances"
            value="vegetarien"
            onClick={(e) => updateUserState(e)}
            className="profilForm__input--option" />
            Végétarien
          </label>
          <label htmlFor="vegetalien" className="profilForm__label profilForm__label--option">
            <input 
            id="vegetalien" 
            type="checkbox" 
            name="intolerances" 
            value="vegetalien" 
            className="profilForm__input--option" 
            />
            Végétalien
          </label>
          <label htmlFor="sans lactose" className="profilForm__label profilForm__label--option">
            <input id="sans lactose"
            type="checkbox"
            name="intolerances"
            value="sans lactose"
            className="profilForm__input--option" 
            />
            Sans lactose
          </label>
          <label htmlFor="sans gluten" className="profilForm__label profilForm__label--option">
            <input 
            id="sans gluten" 
            type="checkbox" 
            name="intolerances" 
            value="sans gluten" 
            className="profilForm__input--option" 
            />
            Sans gluten
          </label>
          <label htmlFor="sans porc" className="profilForm__label profilForm__label--option">
            <input id="sans porc"
            type="checkbox"
            name="intolerances"
            value="sans porc"
            className="profilForm__input--option" />
            Sans porc
          </label>
        </div>
      </fieldset>
      <button type="submit" className="profilForm__button">Modifier</button>
    </form>
  );
}

profilForm.propTypes = {
  submitProfilForm: propTypes.func.isRequired,
};
