/*
import React, { useState } from 'react';


function Home() {
  return(
    <h1>Pagina Home</h1>
  );
}

export default Home;
*/

// RecipeGrid.jsx



import React from 'react';
import '../styles/HomeStyle.css' 
import { Link, useNavigate } from 'react-router-dom';
//import tacoImagen from '../styles/ImagesPruebas/taco.jpeg'
//import usuarioImagen from '../styles/ImagesPruebas/user.png'
import { useState, useEffect } from 'react';


function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:3001/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error al obtener las recetas:', error));

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <div className="homePageContainer">
            {/* HEADER Y MENU DESPLEGABLE */}
            <header className="headerHome">

                <nav>

                    <div className="dropdown">
                        <button className="dropbtn">
                            <i className="fas fa-home" style={{ color: 'orange' }}></i>
                        </button>
                        <div className="dropdown-content">
                            <Link to="/profile">Mi perfil</Link>
                            <Link to="/adminRecipes">Mis recetas</Link>
                            <Link to="/Ingredients">Ingredientes</Link>
                            <Link to="/categories">Categorias</Link>
                            <Link to="/makeRecipe">Crear receta </Link>
                            <Link to="/favoriteRecipes">Favoritos </Link>
                        </div>
                    </div>
                </nav>

                {/* Titulo del sitio en el centro */}
                <h1 className="headerTitle">Gourmet en casa</h1>

                <div className="userProfileContainer">
                    <div className="userProfile">
                        {user.photo ? (
                            <img src={`data:image/jpeg;base64,${user.photo}`} alt={`${user.name}'s Profile`} />
                        ) : (
                            <i className="fas fa-user" style={{ fontSize: '40px', color: 'white' }}></i>
                        )}
                        <div className="userProfileDropdown">
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>


            </header>
            {/* Menú desplegable */}
            <main className="recipeGrid">
                {recipes.map(recipe => (
                    <Link to={`/recipe/${recipe.id_recipe}`} key={recipe.id_recipe} className="recipeCard">
                        <img src={`data:image/jpeg;base64,${recipe.photo}`} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                    </Link>
                ))}

            </main>
        </div>
    );
}

export default HomePage;








/*
import React from 'react';
import '../styles/HomeStyle.css' // You'll need to create this CSS file
import { Link } from 'react-router-dom';
import tacoImagen from '../styles/ImagesPruebas/taco.jpeg'
import usuarioImagen from '../styles/ImagesPruebas/user.png'

// Mock data for recipes
const recipesData = [
    { id: 1, name: 'Greek Salad', image: tacoImagen },
    { id: 2, name: 'Chipotle Wrap', image: tacoImagen },
    { id: 3, name: 'Pumpkin Soup', image: tacoImagen },
    { id: 4, name: 'Yemp', image: tacoImagen },
    { id: 5, name: 'Pumpkin Soup', image: tacoImagen },
    { id: 6, name: 'Pumpkin Soup', image: tacoImagen },

];

// Mock data for user
const userData = {
    name: 'John Doe',
    profileImage: usuarioImagen, // This should be a placeholder image if the user doesn't have one
};

function HomePage() {
    // Here you can fetch real data from your database instead of using mock data
    const recipes = recipesData; // This should come from your database
    const user = userData; // This should come from your database

    return (
        <div className="homePageContainer">
            
            <header className="headerHome">

                <nav>

                    <div className="dropdown">
                        <button className="dropbtn">
                            <i className="fas fa-home" style={{ color: 'orange' }}></i>
                        </button>
                        <div className="dropdown-content">
                            <Link to="/profile">Mi perfil</Link>
                            <Link to="/recipes">Mis recetas</Link>
                            <Link to="/favorites">Favoritos</Link>
                            <Link to="/Ingredients">Ingredientes</Link>
                            <Link to="/Categories">Categorias</Link>
                        </div>
                    </div>
                </nav>

                
                <h1 className="headerTitle">Gourmet en casa</h1>

                <div className="userProfile">
                    <img src={user.profileImage} alt={`${user.name}'s Profile`} />
                </div>
            </header>
            
            <main className="recipeGrid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipeCard">
                        <img src={recipe.image} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default HomePage;



*/