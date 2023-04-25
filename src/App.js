import { createUseStyles } from 'react-jss'
import "./App.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Input from './components/Input';
import { httpSearchRecipe } from './https/index';

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
  const [recipes, setRecipes] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [search, setSearch] = useState("bean")
  const [error, setError] = useState(false);

  const searchRecipe = async () => {
    try {
      setIsDisabled(true);
      const res = await httpSearchRecipe(search)
      if (res.data.results.length === 0) {
        setError(true);
      } else {
        setRecipes(res.data.results);
        setError(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <div className={classes.container}>
      <h1 className='title'> Welcome to VegetariAPP! </h1>
      <div>
        <div className='searchContainer'>
          <Input setValue={setSearch} disabled={isDisabled} />
          <button disabled={isDisabled} className="searchButton" onClick={() => searchRecipe(search)}>Search a recipe!</button>
        </div>
      </div>
      {error && (
        <div className={classes.errorSearch}>
          <p> No recipes found for <span style={{ fontSize: "35px" }}>{search}</span> ! </p>
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
