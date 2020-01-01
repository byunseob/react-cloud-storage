// @ts-ignore
import * as views from "./view";

export const routes = [
    {
        path: "/",
        exact: true,
        component: views.DashBoard,
        hasTop: true,
        hasLeft: true,
    },
];
