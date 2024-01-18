import React, { useState } from 'react';
import Navbar from './Navbar';
import { MyContext } from '../Context';
import { useContext } from 'react';
import './ManageUsers.css'

const ManageUsers = () => {
  const { user, setUser } = useContext(MyContext);

  const [editPasswordIndex, setEditPasswordIndex] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const handleEditPassword = (index) => {
    setEditPasswordIndex(index);
    setNewPassword('');
  };

  const handleSavePassword = (index) => {
    const updatedUsers = [...user];
    updatedUsers[index].password = newPassword;
    setUser(updatedUsers);
    setEditPasswordIndex(null);
  };

  const handleDeleteAccount = (index) => {
    const updatedUsers = user.filter((user, i) => i !== index);
    setUser(updatedUsers);
  };


  const handleBackPassword = (index) => {
    const updatedUsers = [...user];
    updatedUsers[index].password = user[index].password;
    setUser(updatedUsers);
    setEditPasswordIndex(null);
  }





  return (
    <>
      <Navbar />
      <div className="userList">
        <h1>User Management</h1>
        <ol>
          {user.map((user, index) => (
            <li key={index}>
              <div>
                <p>Email: {user.mail}</p>
                <p>Username: {user.username}</p>
                <p>Password: {user.password}</p>
                {editPasswordIndex === index ? (
                  <div>
                    <label>New Password:</label>
                    <input
                      placeholder='Enter a new password'
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={() => handleSavePassword(index)}>Save</button>
                    <button onClick={() => handleBackPassword(index)}>Back</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleEditPassword(index)}>Edit Password</button>
                    <button onClick={() => handleDeleteAccount(index)}>Delete Account</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default ManageUsers;
