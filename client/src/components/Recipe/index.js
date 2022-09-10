import './styles.scss';
import { useLocation } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

export default function Recipe() {
  const location = useLocation();
  const data = location.state;
  const { recipe } = data;
  // console.log(recipe);
  const steps = sanitizeHtml(recipe.steps_desc);
  const ingredients = sanitizeHtml(recipe.ingredient_desc);
  const intolerances = sanitizeHtml(recipe.intolerances);
  console.log(steps);
  console.log(ingredients);
  console.log("Les intolerances :", recipe);

  return (
    <div className="recipe">
      <div className="recipe__imgBx">
        
        <img src={recipe?.photo_link.charAt(0) === "h" ? recipe.photo_link : "https://img.cuisineaz.com/660x660/2016/06/27/i93803-porridge-aux-flocons-d-avoine.webp"} className="recipe__img"></img>
        <em className="recipe__time">{recipe.meal_time} minutes</em>
        <div className="bandeau">
          <h2 className="recipe__title">{recipe.name}</h2>

          <p className="recipe__desc">Encore une bonne recette facile à préparer ? Merci oFood !</p>
        </div>
        

      </div>

      <div className="recipe__contentBx">
        <div className="recipe__steps" dangerouslySetInnerHTML={{ __html: steps }} />
        <div className="recipe__ingredients" dangerouslySetInnerHTML={{ __html: ingredients }} />
      </div>
    </div>
  );
}
