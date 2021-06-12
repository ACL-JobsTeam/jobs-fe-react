import { useEffect, useState } from 'react';
import {fetchUser} from './authHook';

export const testHook = () => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        fetchUser()
            .then(setUser)
            
    }, []);

    

    return [user];
}