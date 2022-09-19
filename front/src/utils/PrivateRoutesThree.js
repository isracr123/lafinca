import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutesThree = () => {

    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/> 
    )
}

export default PrivateRoutesThree