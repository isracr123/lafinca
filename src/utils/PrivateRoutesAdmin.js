import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutesAdmin = () => {

    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/> 
    )
}

export default PrivateRoutesAdmin