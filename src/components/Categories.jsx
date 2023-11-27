// Categories.jsx

import React, { useState, useEffect } from 'react';
import '../styles/CategoriesStyle.css'; // Asegúrate de crear este archivo CSS

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/all-categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories); // Muestra todas las categorías
            })
            .catch(error => console.error('Error al obtener categorías:', error));
    }, []);

    return (
        <div className="categoriesContainer">
            {categories.map(category => (
                <div key={category.id_category} className="categoryCard">
                    <img src={`data:image/jpeg;base64,${category.PHOTO}`} alt={category.name} className="categoryImage"/>
                    <h3 className="categoryName">{category.name}</h3>
                    <p className="categoryDescription">{category.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Categories;
