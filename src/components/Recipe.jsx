
/*
import React from 'react';
import '../styles/RecipeStyle.css';
import tacoImagen from '../styles/ImagesPruebas/taco.jpeg'

// Datos falsos para simular la base de datos
const fakeRecipeData = {
    name: 'Tacos al Pastor',
    servings: 4,
    difficulty: 'Media',
    ingredients: [
        { name: 'Carne de cerdo', quantity: 500, unit: 'gramos' },
        { name: 'Piña', quantity: 1, unit: 'taza' },
        { name: 'Cilantro', quantity: 2, unit: 'ramas' },
        { name: 'Cebolla', quantity: 1, unit: 'unidad' },
        { name: 'Tortillas', quantity: 12, unit: 'unidades' }
    ],
    preparation: 'Cocinar la carne con piña... y luego ya termina todo, ya solo queda disfrutar de la receta y esperar a que todo haya salido bien en la cocina, adios Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis velit vel varius mollis. Duis eleifend, diam feugiat consectetur pulvinar, odio nunc tincidunt nisl, et dapibus ligula enim viverra libero. Vestibulum eleifend, lacus in gravida auctor, orci lectus mollis arcu, eu mollis lectus est in turpis. Nulla sollicitudin nisl at vulputate consectetur. Aenean enim nisl, cursus sit amet nunc in, pretium auctor sapien. Phasellus sagittis pulvinar orci, efficitur accumsan lectus ultrices at. Quisque et lacus mollis, ornare quam vel, efficitur dolor. Ut condimentum vitae ipsum at laoreet. Quisque orci augue, accumsan eu dignissim a, varius vitae ligula. Nam et odio imperdiet, consectetur mi non, tincidunt nulla. Duis scelerisque orci sed elit euismod, quis facilisis nulla commodo.',
    photo: tacoImagen
};

function Recipe() {

    return (
        <div className="recipeContainer">
            <div className="recipePhoto" style={{ backgroundImage: `url(${fakeRecipeData.photo})` }} />
            <div className="recipeDetails">
                <h1>{fakeRecipeData.name}</h1>
                <p><strong>Porciones:</strong> {fakeRecipeData.servings}</p>
                <p><strong>Dificultad:</strong> {fakeRecipeData.difficulty}</p>
                <h3>Ingredientes</h3>
                <ul>
                    {fakeRecipeData.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <span className="ingredientText">{ingredient.name} - {ingredient.quantity} {ingredient.unit}</span>
                        </li>
                    ))}
                </ul>
                <h3>Preparación</h3>
                <p>{fakeRecipeData.preparation}</p>
            </div>
        </div>
    );
}

export default Recipe;
*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeStyle.css';

function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({ ingredients: [] });
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar la receta');
                }
                const data = await response.json();
                setRecipe(data.data);
                setLiked(data.data.liked);
                setLikesCount(data.data.likesCount);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }


            // Nuevo: Comprobar si el usuario actual ha dado like a la receta
            const likeResponse = await fetch(`http://localhost:3001/api/recipes/${id}/check-like`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (likeResponse.ok) {
                const likeData = await likeResponse.json();
                setLiked(likeData.liked);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/recipes/${id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLiked(data.liked);
                setLikesCount(prevLikesCount => data.liked ? prevLikesCount + 1 : prevLikesCount - 1); // Actualizar el conteo de likes
            } else {
                throw new Error('No se pudo actualizar el like');
            }
        } catch (error) {
            console.error('Error al actualizar like:', error);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>Receta no encontrada</div>;

    const photoStyle = recipe.photo ? { backgroundImage: `url(data:image/jpeg;base64,${recipe.photo})` } : {};

    return (
        <div className="recipeContainer">
            <div className="recipePhoto" style={photoStyle}>
                <button onClick={handleBack} className="backButtonRecipe">Regresar</button> {/* Botón para regresar */}
            </div>
            <div className="recipeDetails">
                <div className="recipeHeader">
                    <h1>{recipe.name}</h1>
                    <div className="likeSection">
                        <span onClick={handleLike} className={`heartIcon ${liked ? 'liked' : ''}`}>&#10084;</span>
                        <span className="likesCount">{likesCount} likes</span>
                    </div>
                </div>
                {recipe.username && <p className="createdByUser">Creado por: {recipe.username}</p>} {/* Estilo aplicado aquí */}
                {recipe.category_name && <p className="categoryNameRecipe">Categoría: {recipe.category_name}</p>} {/* Muestra el nombre de la categoría */}
                <p><strong>Porciones:</strong> {recipe.no_portions}</p>
                <p><strong>Dificultad:</strong> {recipe.difficulty}</p>
                <h3>Ingredientes</h3>
                <ul>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <span className="ingredientText">{ingredient.name} - {ingredient.quantity} {ingredient.unit_of_measure}</span>
                        </li>
                    ))}
                </ul>
                <h3>Preparación</h3>
                <p>{recipe.desc_preparation}</p>
            </div>
        </div>
    );
}

export default Recipe;
