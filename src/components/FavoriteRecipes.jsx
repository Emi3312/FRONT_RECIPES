// FavoriteRecipes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FavoriteRecipesStyle.css'; 

function FavoriteRecipes() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            const response = await fetch('http://localhost:3001/api/favorite-recipes', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setFavoriteRecipes(data.favoriteRecipes);
        };

        fetchFavoriteRecipes();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="favoriteRecipesContainer">
            <button className="backButtonProfile" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="favoriteRecipesTitle">Mis Recetas Favoritas</h1>
            <div className="favoriteRecipesList">
                {favoriteRecipes.map(recipe => (
                    <div key={recipe.id_recipe} className="favoriteRecipeItem" onClick={() => navigate(`/recipe/${recipe.id_recipe}`)}>
                        <img src={`data:image/jpeg;base64,${recipe.photo}`} alt={recipe.name} className="favoriteRecipeImage" />
                        <p className="favoriteRecipeName">{recipe.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteRecipes;
