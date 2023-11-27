import React, { useState, useEffect } from 'react';
import '../styles/MakeRecipeStyle.css'
import { useNavigate } from 'react-router-dom';

function MakeRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [category, setCategory] = useState('');
    const [portions, setPortions] = useState(1);
    const [difficulty, setDifficulty] = useState('FACIL');
    const [ingredients, setIngredients] = useState([]);
    const [preparation, setPreparation] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);//SaveCategories

    const handleRecipeNameChange = (e) => {
        const newName = e.target.value;
        if (newName.length <= 50) {
            setRecipeName(newName);
        }
    };

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    useEffect(() => {
        // Función para cargar las categorías desde el backend
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/categories');
                const data = await response.json();
                setCategories(data.categories);

                // Establecer un valor inicial para `category` basado en las categorías obtenidas
                if (data.categories.length > 0) {
                    setCategory(data.categories[0].name);
                }
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };

        fetchCategories();
    }, []);


    //Back
    const handleGoBack = () => {
        navigate(-1);
    };


    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const handleIngredientChange = (index, field, value) => {
        const formattedValue = field === 'name' ? formatIngredientName(value) : value;

        const newIngredients = ingredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [field]: formattedValue };
            }
            return ingredient;
        });
        setIngredients(newIngredients);
    };

    // Función para formatear el nombre del ingrediente
    const formatIngredientName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const handleSaveRecipe = async () => {
        if (!recipeName || !category || !difficulty || portions < 1 || ingredients.length === 0 || !preparation) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        if (!['FACIL', 'MEDIA', 'DIFICIL'].includes(difficulty)) {
            alert("Por favor, selecciona una dificultad válida.");
            return;
        }

        // Comprobar si alguno de los ingredientes está incompleto
        const ingredientIncomplete = ingredients.some(ingredient => !ingredient.name || !ingredient.quantity || !ingredient.unit);
        if (ingredientIncomplete) {
            alert("Por favor, completa o elimina los ingredientes incompletos.");
            return;
        }

        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('category', category);
        formData.append('portions', portions);
        formData.append('difficulty', difficulty);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('preparation', preparation);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await fetch('http://localhost:3001/api/recipes/create', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                // Tratamiento de la respuesta (ej. mostrar mensaje de éxito)
                console.log('Receta creada con éxito:', data);
                navigate('/home'); // Redirigir a otra página tras la creación exitosa
            } else {
                throw new Error(data.message || 'Error al crear la receta');
            }
        } catch (error) {
            console.error('Error al guardar receta:', error);
            // Tratamiento del error (ej. mostrar mensaje de error)
        }
    };



    return (
        <div className="makeRecipePage">
            <div className="makeRecipeContainer">
                <button className="backButtonProfile" onClick={handleGoBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2>Crear Receta</h2>
                <label>Nombre de la Receta:</label>
                <input
                    type="text"
                    className="recipeInput"
                    placeholder="Introduce el nombre de la receta"
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                />

                <label>Categoría:</label>
                <select className="recipeSelect" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(cat => (
                        <option key={cat.id_category} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                <label>Porciones:</label>
                <input type="number" className="recipeInput" min="1" max="10" placeholder="Número de porciones" value={portions} onChange={(e) => setPortions(e.target.value)} />

                <label>Dificultad:</label>
                <select className="recipeSelect" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="FACIL">Fácil</option>
                    <option value="MEDIA">Media</option>
                    <option value="DIFICIL">Difícil</option>
                </select>

                <label>Ingredientes:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredientInput">
                        <input type="text" placeholder="Nombre del ingrediente" value={ingredient.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} />
                        <input type="number" placeholder="Cantidad" value={ingredient.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} />
                        <input type="text" placeholder="Unidad (ej. gramos, tazas)" value={ingredient.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} />
                        <button className="removeIngredientBtn" onClick={() => handleRemoveIngredient(index)}> X </button>

                    </div>
                ))}
                <button className="addIngredientBtn" onClick={handleAddIngredient}>Agregar Ingrediente</button>

                <label>Preparación:</label>
                <textarea className="recipeTextarea" placeholder="Describe los pasos de la preparación" value={preparation} onChange={(e) => setPreparation(e.target.value)}></textarea>

                <label>Foto de la Receta:</label>
                <input type="file" className="recipeInput" onChange={(e) => setPhoto(e.target.files[0])} />

                <button className="saveRecipeBtn" onClick={handleSaveRecipe}>Guardar Receta</button>
            </div>
        </div>
    );
}

export default MakeRecipe;
