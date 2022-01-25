import Welcome from "../pages/welcome";
import SignUp from "../pages/auth/signup";

const routes:IRoutes[] = [
    {
        path: '/welcome',
        exact: true,
        element: Welcome,
        name: 'welcome',
        protected: false
    },
    {
        path: '/signup',
        exact: true,
        element: SignUp,
        name: 'signup',
        protected: false
    }
]

export default routes