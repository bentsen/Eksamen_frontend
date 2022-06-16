const URL = "https://studiebandit.com/sport";

async function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: await res.json()})
    }
    return res.json();
}

function loginFacade() {
    /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () => {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {const options = makeOptions("POST", true,{username: user, password: password });
        return fetch(URL + "/api/auth/login", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
                setUserType(res.userType)
                setUserName(res.username)
                setUserID(res.userID)

            })
    }

    const createMatch = (matchInformation) => {
        const options = makeOptions("POST", true, matchInformation)
        return fetch(URL + "/api/match/createMatch", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const createPlayer = (playerInformation) => {
        const options = makeOptions("POST", true, playerInformation)
        return fetch(URL + "/api/player/createPlayer", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const deletePlayer = (id) => {
        const options = makeOptions("DELETE", true)
        return fetch(URL + "/api/player/deletePlayer/"+id,options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const deleteLocation = (id) => {
        const options = makeOptions("DELETE",true)
        return fetch(URL + "/api/location/deleteLocation/"+id,options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const deleteMatch = (id) => {
        const options = makeOptions("DELETE",true)
        return fetch(URL + "/api/match/deleteMatch/"+id,options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const register = (user, password) => {
        const options = makeOptions("POST", true,{username: user, password: password});
        return fetch(URL + "/api/info/newuser", options)
            .then(handleHttpErrors)
            .then(res => {setToken(res.token)})
    }

    const setUserType = (userType) => {
        localStorage.setItem("userType",userType)
    }

    const setUserID = (userID) => {
        localStorage.setItem("userID", userID)
    }

    const getUserType = ()  => {
        return localStorage.getItem('userType')
    }

    const getUserName = () => {
        return localStorage.getItem("username")
    }

    const setUserName = (userName) => {
        return localStorage.setItem("username",userName)
    }

    const getUserID = () => {
        return localStorage.getItem('userID')
    }


    const fetchData = () => {const options = makeOptions("GET",true); //True add's the token
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);}
    const makeOptions= (method,addToken,body) =>{
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        createMatch,
        login,
        logout,
        fetchData,
        getUserName,
        setUserName,
        setUserType,
        setUserID,
        getUserType,
        getUserID,
        createPlayer,
        deletePlayer,
        deleteLocation,
        deleteMatch,
        register
    }
}
const facade = loginFacade();
export default facade