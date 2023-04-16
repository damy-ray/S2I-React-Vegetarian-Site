import { createUseStyles } from 'react-jss'
import "./App.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Input from './components/Input';

const API_SPOONACULAR = 'https://api.spoonacular.com/recipes'

const useStyles = createUseStyles({
  recipes: {
    display: 'flex',
    justifyContent: "space-between",
    padding: '16px',
    flexWrap: 'wrap',
    gap: '32px',
    alignItems: 'center'
  },
  card: {
    maxWidth: 300,
    backgroundColor: '#275610',
    padding: 16,
    borderRadius: 8,
    marginTop: '60px',
    fontFamily: 'Rubik',
  },
  recipeImage: {
    width: '300px',
    height: '200px',
    backgroundSize: 'cover'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'lightgreen'
    }
  },
  errorSearch: {
    fontSize: '25px',
    fontWeight: "bold",
    marginTop: "150px",
    display: 'flex',
    justifyContent: 'center',
    color: 'red'




  },
  


})


function App() {
  const classes = useStyles()
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("bean")
  const [error, setError] = useState(false);


  const searchRecipe = async () => {
    try {
      const res = await axios.get(`${API_SPOONACULAR}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${search}&diet=vegetarian`);

      if (res.data.results.length === 0) {
        setError(true);
      } else {
        setRecipes(res.data.results);
        setError(false);
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className='title'> Welcome to VegetariAPP! </h1>
      <div>
        <div className='searchContainer'>
          <Input setValue={setSearch} />
          <button className="searchButton" onClick={() => searchRecipe()}>Search a recipe!</button>
        </div>
      </div>
      {error && (
        <div className={classes.errorSearch}>
          <p> No recipes found for <span style={ { fontSize: "35px"}}>{search}</span> ! </p> 
          {/* <div> Try Again </div> */}
        </div>
      )}
      {!error && (
        <div className={classes.recipes}>
          {recipes.map((recipe) => {
            return (
              <div className={classes.card}>
                <div className={classes.recipeImage} style={{ backgroundImage: `url("${recipe.image}"` }} />
                <h2><Link className={classes.link} to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h2>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
