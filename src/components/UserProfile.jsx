import React from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserProfile.css'

const UserProfile = () => {

    const nav = useNavigate()

    const { currentAccount, setUser, user, setCurrentAccount, setIsAdmin, setIsUser } = useContext(MyContext)


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

        const updatedCurrentAccount = [...currentAccount];
        updatedCurrentAccount[0].password = newPassword;
        setCurrentAccount(updatedCurrentAccount);

        setEditPasswordIndex(null);
    };

    const handleDeleteAccount = (index) => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (shouldDelete) {
            const updatedUsers = user.filter((user, i) => i !== index);
            setUser(updatedUsers);
            setIsAdmin(false);
            setIsUser(false);
            nav('/');
        }
    };


    const handleBackPassword = (index) => {
        const updatedUsers = [...user];
        updatedUsers[index].password = user[index].password;
        setUser(updatedUsers);
        console.log(user[index].password)
        setEditPasswordIndex(null);
    }


    return (
        <>
            <Navbar />
            <div className="userProfileWrapper">
                <div className="userProfile">
                    <h1>Manage Profile</h1>

                    {currentAccount.map((account, index) =>

                        <div className="manageuserprof" key={index}>

                            <p>Your Mail : {account.mail}</p>
                            <p>Password : {account.password}</p>
                            <div className="userProfileBtns">
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

                        </div >
                    )}
                </div>
            </div>





        </>
    )
}

export default UserProfile