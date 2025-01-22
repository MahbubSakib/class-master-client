import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const Welcome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h2 className='text-center pl-8 pt-2 text-4xl font-bold'>Hi! {user.displayName}</h2>
            <p className='text-center mt-5 text-xl'>Welcome to Your Dashboard. This is your central hub to efficiently manage all your data and activities.</p>
        </div>
    );
};

export default Welcome;