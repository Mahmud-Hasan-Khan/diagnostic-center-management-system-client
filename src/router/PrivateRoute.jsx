import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-infinity loading-lg text-[#00AEEF]"></span>
        </div>
    }
    if (user && !loading) {
        return children
    }

    return (
        <Navigate state={location.pathname} to='/login'></Navigate>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;