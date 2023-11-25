import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";
import Text from "../pages/Test/Text";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import Dashboard from "../layout/Dashboard/Dashboard";
import UserHome from "../pages/Dashboard/User/UserHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import UserProfile from "../pages/Dashboard/User/UserProfile";


const myCreatedRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/test',
                element: <Text />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <Registration />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // normal user routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },

            // admin route
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },

        ]
    }

]);

export default myCreatedRouter;