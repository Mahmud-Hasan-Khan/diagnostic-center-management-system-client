import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div>
            {
                user?.displayName ? user?.displayName : 'No Name'
            }
        </div>
    );
};

export default UserHome;