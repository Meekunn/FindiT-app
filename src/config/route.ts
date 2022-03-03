import Welcome from "../pages/welcome"
import SignUp from "../pages/auth/signup"
import SignIn from "../pages/auth/signin"
import Dashboard from "../pages/dashboard"
import Edit from "../pages/edit"
import SearchPage from "../pages/searchpage"
import ProfileSetup from "../pages/setup"
import ChangePassword from "../pages/auth/editpass"

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
    },
    {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        name: 'dashboard',
        protected: true
    },
    {
        path: '/signin',
        exact: true,
        component: SignIn,
        name: 'signin',
        protected: false
    },
    {
        path: '/setup',
        exact: true,
        component: ProfileSetup,
        name: 'setup',
        protected: true
    },
    {
        path: '/edit',
        exact: true,
        component: Edit,
        name: 'edit',
        protected: true
    },
    {
        path: '/home',
        exact: true,
        component: SearchPage,
        name: 'home',
        protected: false
    },
    {
        path: '/editpassword',
        exact: true,
        component: ChangePassword,
        name: 'editpassword',
        protected: true
    }
]

export default routes