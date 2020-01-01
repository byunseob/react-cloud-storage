import React, { Suspense } from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import {routes} from "./routes";
import MenuRoute from "./component/layout/MenuRoute";
import {makeStyles} from "@material-ui/core";
import Toast from "./component/Toast";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            {
                routes.map((route, index) => (
                    <MenuRoute
                        key={`menu_route_${index}`}
                        path={route.path}
                        exact={route.exact}
                        hasTop={route.hasTop}
                    />
                ))
            }
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    {
                        routes.map((route, index) =>
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        )
                    }
                </Switch>
            </Suspense>
            <Toast/>
        </div>
    );
};

export default withRouter(App);