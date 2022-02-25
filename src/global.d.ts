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
    fullname: string;
    title: string;
    phone: string;
    department: string;
    location: string;
    office: string;
}

interface ILecturersAuth{
    email: string;
    password: string;
}