interface IApp {}

interface IAuthRoute {}

interface IPageProps {
    name?: string;
}

interface IRoutes {
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
    props?: any;
}

interface ILecturerBasic {
    name: string;
    title: string;
    phone: string;
    department: string;
    location: string;
    office: string;
    email: string;
    id: string;
    status: string;
}

interface ILecturers extends ILecturerBasic{
    bio:string;
    photoURL: string;
}

interface ILecturersAuth{
    id: string;
    email: string;
    password: string;
}

interface State {
    password: string;
    showPassword: boolean;
  }