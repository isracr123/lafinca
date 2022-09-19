import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutesKitchen = () => {

    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/> 
    ) 
    
}

export default PrivateRoutesKitchen