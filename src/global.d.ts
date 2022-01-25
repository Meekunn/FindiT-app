interface IApp {}

interface IAuthRoute {}

interface IRoutes {
    path: string;
    exact: boolean;
    element: any;
    name: string;
    protected: boolean;
    props?: any;
}