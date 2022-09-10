import axios from 'axios';
import AuthService from '../../services/auth.service';

const API_URL = 'http://localhost/api/meals/';

// The service uses Axios for HTTP requests and Local Storage for user information & JWT.
// It provides following important functions:

// Procédure pour que le user puisse générer son planing :

// 1. Il doit update son profil
// 2. Lorsque c'est fait il passe Profilcompleted à true et donc peut générer son planing ou récupérer les repas déjà générés.


  const fetchUserMeals = async () => {
    try {
      const result = await axios.get(`http://localhost/api/meals/${AuthService.getCurrentUser().id}/postnewmeals`, {
        headers: {
          // authorization: `Bearer ${currentUser.token}`,
          authorization: `Bearer ${AuthService.getCurrentUser().token}`,
        },
      });
      return result.data;
    }
    catch (err) {
      clearUser(err);
    }
  };

const RecipesService = {
  fetchUserMeals,
};
export default RecipesService;
