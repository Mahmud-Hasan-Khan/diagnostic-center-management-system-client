import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import Dashboard from "../layout/Dashboard/Dashboard";
import UserHome from "../pages/Dashboard/User/UserHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllTests from "../pages/AllTests/AllTests";
import TestDetails from "../pages/TestDetails/TestDetails";
import PrivateRoute from "./PrivateRoute";
import UpcomingAppointments from "../pages/Dashboard/User/UpcomingAppointments";

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
                path: '/allTests',
                element: <AllTests />
            },
            {
                path: '/testDetail/:id',
                element: <PrivateRoute>
                    <TestDetails></TestDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/test/${params.id}`)
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
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // admin route
            {
                path: 'adminHome',
                element: <AdminRoute>
                    <AdminHome></AdminHome>
                </AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            // normal user routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'appointments',
                element: <UpcomingAppointments />
            }
        ]
    }

]);

export default myCreatedRouter;