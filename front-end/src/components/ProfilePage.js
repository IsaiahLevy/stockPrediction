import React from 'react';
import './ProfilePage.css';
import Header from './Header';

const ProfilePage = () => {
  // Sample data, replace with actual user data
  const userProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '********', // Hashed password
    status: 'Premium' // or 'Basic'
  };

  return (
    <div>
        <Header />
        <div className="profile-page">
        <div className="profile-picture-section">
            <img src="profile_picture.png" alt="Profile" className="profile-picture" />
        </div>
        <button className="edit-btn">Edit</button>
        <div className="profile-info-container">
            <div className="profile-info">
            <div className="info-field">
                <label>Name:</label>
                <div className="field-value">{userProfile.name}</div>
                <button className="edit-btn">Edit</button>
            </div>
            <div className="info-field">
                <label>Email:</label>
                <div className="field-value">{userProfile.email}</div>
                <button className="edit-btn">Edit</button>
            </div>
            <div className="info-field">
                <label>Password:</label>
                <div className="field-value">{userProfile.password}</div>
                <button className="edit-btn">Edit</button>
            </div>
            <div className="info-field">
                <label>Status:</label>
                <div className="field-value">{userProfile.status}</div>
                <button className="edit-btn">Manage</button>
            </div>
            </div>
            <button className="logout-btn">Logout</button>
        </div>
        </div>
    </div>

  );
};

export default ProfilePage;
