import React from "react";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import Menu from "./Menu";

const content = [
    {
        icon: "dripicons-information",
        label: "Annotation",
        to: "/annotation",
    },
    {
        icon: "dripicons-information",
        label: "Inspection",
        to: "/inspection",
    },
    {
        icon: "dripicons-information",
        label: "Distribution",
        to: "/distribution",
    },
    {
        icon: "dripicons-information",
        label: "+Add documents",
        to: "/documentupload",
    },
    {
        icon: "dripicons-information",
        label: "Administer",
        content: [
            {
                icon: "dripicons-information",
                label: "account",
                to: "/accounts",
            },
            {
                icon: "dripicons-information",
                label: "team",
                to: "/teams",
            },
        ]

    },
];

interface MenuRouteProps extends RouteComponentProps {
    path?: string;
    exact?: boolean;
    hasTop?: boolean;
    hasLeft?: boolean;
}

const MenuRoute: React.FC<MenuRouteProps> = ({path, exact, location, hasTop, hasLeft}) => {

        return (
            <Route
                path={path}
                exact={exact}
                render={() => {
                    return (
                        <>
                            {
                                hasTop &&
                                <Menu content={content} path={location.pathname}/>
                            }
                        </>
                    )
                }}
            />
        );
    }
;

export default withRouter(MenuRoute);
