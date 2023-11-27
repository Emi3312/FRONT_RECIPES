import React, { useState, useEffect } from 'react';
import '../styles/ProfileStyle.css';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    //Change Password
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/user/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            const result = await response.json();
            if (response.ok) {
                alert('Contraseña cambiada con éxito. Por favor, inicie sesión de nuevo.');
                navigate('/login'); // Asumiendo que tienes una ruta de login
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelChangePassword = () => {
        setShowChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    //Back
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const updateUserData = async () => {
        try {
            const response = await fetch('http://localhost:3001/user/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const updatedUserData = await response.json();
            if (response.ok) {
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                setUserData(updatedUserData);
            } else {
                console.error('Error al obtener datos actualizados del usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSubmit = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const response = await fetch('http://localhost:3001/user/updatePhoto', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                // Actualiza los datos del usuario en el localStorage
                localStorage.setItem('userData', JSON.stringify(result.userData));
                setUserData(result.userData);
                await updateUserData();
                // Recargar la página para reflejar los cambios
                window.location.reload();
            } else {
                console.error('Error al actualizar la foto:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="userProfileContainerAccess">
            <button className="backButtonProfile" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <div className="profileCard">
                <div className="profileImageContainer"
                    onMouseEnter={() => document.getElementById('fileInput').style.visibility = 'visible'}
                    onMouseLeave={() => document.getElementById('fileInput').style.visibility = 'hidden'}>
                    {userData.photo ? (
                        <img src={`data:image/jpeg;base64,${userData.photo}`} alt={`${userData.name}'s Profile`} />
                    ) : (
                        <div className="profileIconContainer">
                            <i className="fas fa-user profileIcon"></i>
                        </div>
                    )}
                    <input type="file" id="fileInput" onChange={handleFileChange} style={{ visibility: 'hidden' }} />
                </div>

                {selectedFile && (
                    <button onClick={handleSubmit} className="updatePhotoButton">Actualizar Foto</button>
                )}
                <div className="profileInfo">
                    <h1>{userData.name}</h1>
                    <h2>{userData.last_name}</h2>
                    <p>{userData.email}</p>
                    
                </div>
                <button className="settingsButton" onClick={() => setShowChangePassword(!showChangePassword)}>
                    <i className="fas fa-key"></i>
                </button>

                

            </div>


            {showChangePassword && (
                    <div className="passwordChangeContainer">

                        <input
                            type="password"
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="passwordInput"
                        />
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="passwordInput"
                        />
                        <input
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="passwordInput"
                        />
                        <button className="cancelPasswordButton" onClick={handleCancelChangePassword}>Cancelar</button>
                        <button onClick={handleChangePassword} className="confirmPasswordButton">Confirmar cambio</button>
                    </div>
                )}
        </div>
    );
}

export default UserProfile;
