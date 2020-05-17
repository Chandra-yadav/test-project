import {API} from '../config'

export const signUp = (user) => {

    return(
        fetch(`${API}/signup`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}

export const signIn = (user) => {

    return(
        fetch(`${API}/signin`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));

        next();
    }
}

export const signOut = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');

        next();

        return fetch(`${API}/signlout`, {
            method: "GET"
        })
        .then(response => {
            console.log('signout', response);
        })
        .catch(err => console.log(err));
    }
}