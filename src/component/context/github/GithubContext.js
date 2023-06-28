import { createContext,useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users : [],
        loading : false,
        user : {},
    }

const [state,dispatch] = useReducer(githubReducer,initialState)

     //getsearch
     const searchUsers = async (text) => {

        const params = new URLSearchParams({
            q : text
        })
         setLoading()

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })
        const {items} = await response.json()
        dispatch({
            type : 'GET_USERS',
            payload : items,
        })
    }

     //get user
     const getUser = async (login) => {
         setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        if(response.status === 404){
            window.location = '/notfound';
        }else{
            const data = await response.json()
            dispatch({
                type : 'GET_USER',
                payload : data,
            })  
        }

        
    }

    //setloading 
    const setLoading = () => dispatch({
        type : 'SET_LOADING'
    })

    //clear User
    const clearUsers = () => dispatch({type : 'CLEAR_USERS'})

    return <GithubContext.Provider value={{
        users : state.users,
        loading : state.loading,
        user : state.user,
        searchUsers,
        clearUsers,
        getUser,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext 