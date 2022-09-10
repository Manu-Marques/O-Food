import axios from 'axios';
import propTypes from 'prop-types';
import Form from './Form';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

export default function Profil({
  currentUser, setCurrentUser, updateUserState
}) {

  const navigate = useNavigate();
  // console.log(`current user from Profil: ${currentUser}`);
  const makeIMC = (height, weight) => {
    const imc = Math.round((weight * 10000) / (height * height));
    return imc;
  };

  const postProfilForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const obj = Object.fromEntries(formData);
    
    obj.intolerances = formData.getAll("intolerances")

    obj.weight = Number(obj.weight);
    obj.height = Number(obj.height);
    obj.imc = makeIMC(Number(obj.height), Number(obj.weight));

    // console.log("obj de toto", obj);
    // const result = await axios({
    //   url: 'http://localhost:3001/api/users',
    //   // url: 'http://localhost:3001/api/recipes/21',
    //   method: 'GET',
    //   // data: ''
    // });

    const result = await axios({
      url: `http://localhost/api/users/${currentUser.id}`,
      method: 'PATCH',
      data: obj
    });

    // const result = await axios.patch(`http://localhost:3001/api/users/${currentUser.id}`, {
    //   data: obj,
    // });
    console.log(`resultat du update:`, result.data);
    setUser(result.data);
    
    navigate('/users/Dashboard');
  };

  const setUser = (newUser) => {
    setCurrentUser(newUser);
    // console.log(`currentUser in fonction fetch après hook`, currentUser);
  }

  return (
    <div className="profile">
      <Form submitProfilForm={postProfilForm} currentUser={currentUser} updateUserState={updateUserState} />
    </div>
  );
}

Profil.propTypes = {
  currentUser: propTypes.object.isRequired,
  setCurrentUser: propTypes.func.isRequired,
};
