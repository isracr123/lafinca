import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutesFour = () => {

    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/> 
    )
}

export default PrivateRoutesFour