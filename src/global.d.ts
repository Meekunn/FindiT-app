interface IRoutes {
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
    props?: any;
}