import useAuth from "../../hooks/useAuth";


const AdminHome = () => {
    const { user } = useAuth();
    return (
        <div>
            {
                user?.displayName ? <h1 className="text-2xl ">Hi! Welcome, {user?.displayName}</h1> : 'No Name'
            }
        </div>
    );
};

export default AdminHome;