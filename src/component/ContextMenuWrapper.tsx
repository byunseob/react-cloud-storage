import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const useStyles = makeStyles(theme => ({
    menuItem: {
        zIndex: 9999,
        cursor: 'pointer',
        height: '20px',
        width: '200px',
        backgroundColor: 'white',
        boxSizing: 'border-box'
    },
}));

const ContextMenuWrapper: React.FC = ({children}) => {
    const classes = useStyles();

    const  handleClick = (e: any, data: any)  => {
        console.log(data.foo);
    };

    return (
        <>
            <ContextMenuTrigger id="some_unique_identifier"> {/* NOTICE: id must be unique for EVERY instance */}
                <ContextMenu id="some_unique_identifier" >
                    <MenuItem data={{foo: 'bar'}} onClick={handleClick} className={classes.menuItem}>
                        ContextMenu Item 1
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={handleClick} className={classes.menuItem}>
                        ContextMenu Item 2
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={handleClick} className={classes.menuItem}>
                        ContextMenu Item 3
                    </MenuItem>
                </ContextMenu>
            {children}
            </ContextMenuTrigger>
        </>
    );
};

export default ContextMenuWrapper;
