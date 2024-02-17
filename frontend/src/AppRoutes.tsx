import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import ManageRestaurantPage from "./pages/ManageRestaurantPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="/" element={<Layout showHero={true}> <HomePage /> </Layout>} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
                <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage /></Layout>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes