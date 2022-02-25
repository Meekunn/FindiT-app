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

interface ILecturer {
    id: string;
    firstname: string;
    lastname: string;
    title: string;
    phone: number;
    email: string;
    location: string;
    office: string;
    bio: string;
}

interface ILecturersAuth{
    email: string;
    password: string;
}