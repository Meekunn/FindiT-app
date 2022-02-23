import Welcome from "../pages/welcome";
import SignUp from "../pages/auth/signup";

const routes:IRoutes[] = [
    {
        path: '/',
        exact: true,
        component: Welcome,
        name: 'welcome',
        protected: false
    },
    {
        path: '/signup',
        exact: true,
        component: SignUp,
        name: 'signup',
        protected: false
    }
]

export default routes