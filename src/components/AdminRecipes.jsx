import React, { useState, useEffect } from 'react';
import '../styles/AdminRecipesStyle.css';
import { useNavigate } from 'react-router-dom';

function AdminRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/my-recipes', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                setRecipes(data.data);
            } catch (error) {
                console.error('Error al cargar recetas:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const navigateToRecipe = (id) => {

        navigate(`/recipe/${id}`);
    };

    const handleDeleteClick = (event, recipeId) => {
        event.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        setSelectedRecipeId(recipeId);
        setShowDeleteDialog(true);
    };




    const confirmDelete = async () => {
        try {
            await fetch(`http://localhost:3001/api/recipes/${selectedRecipeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            setRecipes(recipes.filter(recipe => recipe.id_recipe !== selectedRecipeId));
            setShowDeleteDialog(false);
        } catch (error) {
            console.error('Error al eliminar receta:', error);
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    

    return (
        <div className="adminRecipesContainer">
            <button className="backButtonProfile" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="adminRecipesTitle">Mis Recetas</h1>
            <div className="adminRecipesList">
                {recipes.map((recipe, index) => (
                    <div key={index} className="adminRecipeItem" onClick={() => navigateToRecipe(recipe.id_recipe)}>
                        <img src={`data:image/jpeg;base64,${recipe.photo}`} alt={recipe.name} className="adminRecipeImage" />
                        <p className="adminRecipeName">{recipe.name}</p>
                        

                        <button className="adminRecipeDeleteBtn" onClick={(e) => handleDeleteClick(e, recipe.id_recipe)}>Eliminar</button>
                    </div>

                ))}
            </div>
            {showDeleteDialog && (
                <div>
                    <div className="dialogBackdrop" onClick={cancelDelete}></div>
                    <div className="deleteDialog">
                        <p>¿Quieres eliminar esta receta?</p>
                        <button onClick={confirmDelete}>Sí</button>
                        <button onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminRecipes;
