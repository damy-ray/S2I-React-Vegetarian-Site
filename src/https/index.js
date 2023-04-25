import axios from 'axios';


const API_SPOONACULAR = 'https://api.spoonacular.com/recipes'
const API_KEY = "dfa0b7d8eb2f4541a7848230d205f7b4";

export const httpSearchRecipe = (value) => {
    return axios.get(`${API_SPOONACULAR}/complexSearch?apiKey=${API_KEY}&query=${value}&diet=vegetarian`);
};

export const htttpGetRecipe = (id) => {
    return axios.get(`${API_SPOONACULAR}/${id}/information?apiKey=${API_KEY}`)
}