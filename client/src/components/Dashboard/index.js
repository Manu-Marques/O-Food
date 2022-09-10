import './styles.scss';
import propTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Dashboard({
  getUserMeals, userMeals, currentUser
}) {
  console.log('currentUser in DASHBOARD', currentUser);
  return (

    <main className="main_dashboard">
      <div className="head__container">

        <div className="avatar__container">
        {currentUser?.firstname ? (<img className="avatar__dashboard" src="https://i89.servimg.com/u/f89/09/02/66/41/avmys10.jpg" alt="avatar" />) : (<img className="avatar__dashboard" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="avatar" />)}
          <div>
            {currentUser?.firstname ? (<p>{currentUser.firstname}</p>) : (<p></p>)}
            {currentUser?.lastname ? (<p>{currentUser.lastname}</p>) : (<p></p>)}
          </div>
        </div>

        <button className={currentUser?.profil_is_completed ? 'button_generate' : 'button_generate button_generate--forbidden'} type="button" onClick={getUserMeals} disabled={currentUser?.profil_is_complete}>Générer mon planing</button>
      </div>

      {currentUser?.profil_is_completed === false && (
      <div className="messageBx">
        <p className="dashboardMessage">Configurez votre profil afin d'avoir accès au menu !</p>
      </div>
      )}


      {userMeals.length > 0 && (
      <div className="main__card__container">
        {
            userMeals.map((day, i) => {
              const date = moment().locale('fr').add(i, 'days').format('dddd');
              const formattedDate = date.charAt(0).toUpperCase() + date.slice(1);

              return (
                <div>
                  <h2 className="title__day">{ formattedDate }</h2>
                  <div className="card__container">
                    {
                    day.recipesofuser.map((recipe) => (
                      <div className="Card animated animatedFadeInUp fadeInUp" key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`} state={{ recipe }}>
                        <div className="container__picture">
                          <img className="picture__card" src={recipe?.photo_link.charAt(0) === "h" ? recipe.photo_link : "https://img.cuisineaz.com/660x660/2016/06/27/i93803-porridge-aux-flocons-d-avoine.webp"} alt="avatar" />
                        </div>
                        <div>
                          <h3 className="name__recipe"> {recipe.name } </h3>
                          <p className="time__recipe">{recipe.meal_time } min</p>
                        </div>
                        <div>
                          <Link to={`/recipes/${recipe.id}`} state={{ recipe }} type="button" className="button__card">Commencer</Link>
                        </div>
                        </Link>
                      </div>
                    ))
                  }
                  </div>
                </div>
              );
            })
          }
      </div>
      )}
    </main>
  );
}

Dashboard.propTypes = {
  userMeals: propTypes.array.isRequired,
  getUserMeals: propTypes.func.isRequired,
};
