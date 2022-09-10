// useEffect(async () => {
//   const fetch = await axios.get('http://localhost:3001/api');
//   console.log(fetch.data.message);
// }, []);

const [user, setUser] = useState(null);
const [userMeals, setUserMeals] = useState([]);

useEffect(async () => {
  console.log(userMeals);
}, [userMeals]);

const getUserMeals = async () => {
  const mealsList = await axios.post('http://localhost/api/meals/addmeals');{
    
  }
  
  // const recipesList = await axios.get('http://localhost:3001/api/recipes');
  setUserMeals(mealsList.data);
};

const getRecipe = () => {

};

const checkIfLogged = () => {
  if (user !== null) {
    console.log(user);
    return true;
  }

  return false;
};

const logMe = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData);
  console.log(obj);
  const response = await axios({
    method: 'post',
    url: 'http://localhost/api/users/login',
    data: obj,
  });
  const result = await response.data;
  setUser(result);
  console.log(result);
  // const fetch = await axios.get('http://localhost:3001/api');
  // console.log(fetch.data.message);
  // console.log(response);
};
