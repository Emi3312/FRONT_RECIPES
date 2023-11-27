import React, { useState, useEffect } from 'react';
import '../styles/IngredientsStyle.css';
import { useNavigate } from 'react-router-dom';

function Ingredients() {
    const [ingredients, setIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/recipes/ingredients/view')
            .then(response => response.json())
            .then(data => setIngredients(data.ingredients))
            .catch(error => console.error('Error al obtener ingredientes:', error));
    }, []);

    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="mainContainerIngredient">
            <button className="backButtonProfile" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <input
                type="text"
                placeholder="Buscar ingrediente..."
                className="searchInputIngredient"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="ingredientsContainer">
                {filteredIngredients.map(ingredient => (
                    <div key={ingredient.id_ingredient} className="ingredientCard">
                        <img src={`data:image/jpeg;base64,${ingredient.photo}`} alt={ingredient.name} className="ingredientImage" />
                        <h3 className="ingredientNameView">{ingredient.name}</h3>
                        <p className="ingredientDescription">{ingredient.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ingredients;
