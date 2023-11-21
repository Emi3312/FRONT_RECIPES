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
