import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutesTwo = () => {

    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/> 
    )
}

export default PrivateRoutesTwo