import './style.scss';
import Logo from './Fichier 7.svg';

export default function NotFound() {
  return (
      <div className="notFound">
      <div className="box">4</div>
      <div className="box">
        <img className="logo" src={Logo} alt="" />
      </div>
      <div className="box">4</div>
      <div className="message">
        <div className="ribbon">
          <div className="ribbon-content"><p><b>Navré, il n'y a rien de bon à manger sur cette page !</b></p></div>
        </div>
      </div>
    </div>

  );
}
