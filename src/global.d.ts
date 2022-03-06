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
}

interface ILecturers extends ILecturerBasic{
    bio:string;
    photoURL: any;
}

interface ILecturersAuth{
    email: string;
    password: string;
}