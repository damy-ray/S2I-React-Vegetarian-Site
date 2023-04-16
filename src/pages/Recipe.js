import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from 'axios';

const API_KEY = "e509af0f80c74a1ea7d9794a7b97394c";
const API_SPOONACULAR = 'https://api.spoonacular.com/recipes'


function Recipe() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  const singleRecipe = async () => {
    try {
      const res = await axios.get(`${API_SPOONACULAR}/${id}/information?apiKey=${API_KEY}`)
      setRecipe(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    singleRecipe();
  }, [id])

  if (!recipe) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className='mainContainer'>
      <h1 className='recipeTitle'>{recipe.title}</h1>
      <div className='container'>
        <div className='imageContainer'><img src={recipe.image} className='recipeImage' /></div>
        <div className='ingredients'>
          {recipe.extendedIngredients.map((ingredient) => {
            return (
              <div>{ingredient.original}</div>
            )
          })}
        </div>
      </div>
      <div className='backButtonContainer'>
        <Link to={`/`} className='backButton'>Go back</Link>
      </div>
    </div>

  )
}

export default Recipe

