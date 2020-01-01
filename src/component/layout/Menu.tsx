import React, {useEffect, useState} from "react";

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import clsx from 'clsx';

import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

const drawerWidth = 240;

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));

interface Item {
    icon?: string;
    label: string;
    to?: string;
    content?: Item[];
    active?: boolean;
    opened?: boolean;
    authority?: string;
}


interface MenuProps {
    content: Item[];
    path: string;
}

const Menu: React.FC<MenuProps> = ({content, path}) => {
    const [open, setOpen] = React.useState(true);
    const [data, setData] = useState({content: content, path: path});
    const classes = useStyles();

    useEffect(() => {
        init(content, path);
    }, [content, path]);


    const init = (content: Item[], path: string) => {
        if (!(content && content.length > 0)) {
            throw Error("Required is content.");
        }
        if (!path) {
            throw Error("Required is path.");
        }

        const _content = content.map((item: Item) => {
            if (item.content && item.content.length > 0) {
                let active = false;
                const subContent = item.content.map(subItem => {
                    const matched = path === subItem.to || path.indexOf(`${subItem.to}/`) === 0;
                    active = active || matched;
                    return {
                        ...subItem,
                        active: path === subItem.to
                    };
                });

                return {
                    ...item,
                    content: subContent,
                    active: active,
                    opened: active
                };
            }

            return {
                ...item,
                active: item.to === path
            };
        });
        setData({content: _content, path: path});
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (data.content && data.content.length > 0) {
        return (
            <>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItem>
                        </div>
                    </List>
                    <Divider/>
                </Drawer>
            </>
        );
    } else {
        return null;
    }
};
//
// interface MenuItemProps {
//     item: Item;
// }
//
// const MenuItem: React.FC<MenuItemProps> = ({item}) => {
//     const {label, to} = item;
//     return (
//         <NavLink to={to || ""} className="text-white ml-3 nav-link">
//             <span> {label} </span>
//         </NavLink>
//     );
// };

export default Menu;
