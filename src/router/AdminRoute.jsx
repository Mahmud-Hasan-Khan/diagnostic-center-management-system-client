import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { RingLoader } from "react-spinners";
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <RingLoader color="#e00000" />
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.object.isRequired
}

export default AdminRoute;