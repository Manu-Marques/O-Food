/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.scss';

export default function Contact() {
  return (
    <div className="contact">
      <form id="contact-form" method="POST">
        <h1 className="contact__title">Vous avez une question, sugestion, requête ?</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="contact__email">E-mail</label>
          <input type="email" className="contact__input" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="contact__message">Votre message</label>
          <textarea type="message" className="contact__input__message" />
        </div>
        <button className="contact__submit" type="submit">Submit</button>
      </form>
    </div>
  );
}
