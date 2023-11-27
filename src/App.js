import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile'
import Recipe from './components/Recipe';
import MakeRecipe from './components/MakeRecipe';
import AdminRecipes from './components/AdminRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Categories from './components/Categories';
import Ingredients from './components/Ingredients';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/makeRecipe" element={<MakeRecipe />} />
        <Route path="/adminRecipes" element={<AdminRecipes />} />
        <Route path="/favoriteRecipes" element={<FavoriteRecipes/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/ingredients" element={<Ingredients/>} />
      </Routes>
    </Router>
  );
}

export default App;






//npm install react-router-dom