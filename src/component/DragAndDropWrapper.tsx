import React, {useCallback, useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDropzone} from "react-dropzone";
import {formatBytes} from "../util/fileUtil";
import clsx from "clsx";
import {
    PopperProps,
    Modal,
    Fade,
    Grid,
    Popper,
    CardMedia,
    CardActions,
    Button,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/Folder';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import toastStore, {ToastPosition, ToastType} from "../store/ToastStore";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    menuItem: {
        cursor: 'pointer',
        height: '20px',
        width: '200px',
        backgroundColor: 'white',
        boxSizing: 'border-box'
    },
    dragActive: {
        border: '0.25rem solid khaki',
        backgroundColor: '#839be68a',
        borderColor: '#0606b9d4'
    },
    inputFile: {
        visibility: 'hidden',
        height: '0px'
    },
    paper: {
        bottom: '200px',
        right: '140px',
        width: '100%',
        border: '1px solid',
        padding: theme.spacing(1),
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: 'red',
    },
    card: {
        position: 'absolute',
        bottom: '50px',
        right: '50px',
        minWidth: 300,
    },
    cardHeader: {
        backgroundColor: 'grey'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


const DragAndDropWrapper: React.FC = ({children}) => {
    const classes = useStyles();
    const mainRef = useRef<any>(null);
    const FILE_MAX_SIZE = 20 * 1000 * 1000;
    const [file, setFile] = useState<any>(null);
    const [anchorEl, setAnchorEl] = React.useState<PopperProps['anchorEl']>(null);

    useEffect(() => {
        if (file) {
            const selection = window.getSelection();
            if (!selection) {
                return;
            }

            try {
                const getBoundingClientRect = () => selection.getRangeAt(0).getBoundingClientRect();
                setAnchorEl({
                    clientWidth: getBoundingClientRect().width,
                    clientHeight: getBoundingClientRect().height,
                    getBoundingClientRect,
                });
            } catch (exception) {
                console.log(exception);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            if (rejectedFiles.every((file: any) => file.size > FILE_MAX_SIZE)) {
                toastStore.open({
                    type: ToastType.DANGER,
                    message: "Your file exceeded the maximum size.",
                    position: ToastPosition.BOTTOM_RIGHT,
                    delay: 3000
                });
            } else {
                toastStore.open({
                    type: ToastType.DANGER,
                    message: "The file extension is not supported.",
                    position: ToastPosition.BOTTOM_RIGHT,
                    delay: 3000
                });
            }
            return;
        }
        // store.setSize(acceptedFiles[0].size);
        setFile(acceptedFiles[0]);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        maxSize: FILE_MAX_SIZE,
        multiple: true
    });

    return (
        <div ref={mainRef}>
            <input {...getInputProps()} disabled={!isDragActive} className={classes.inputFile}/>
            <div className={`dropzone dz-clickable ${clsx(isDragActive && classes.dragActive)}`} {...getRootProps()}>
                <div className="dz-message needsclick">
                    {children}
                    {file && (
                        <>
                            <i className="mdi mdi-file-document-outline"/>
                            {file.name} - {formatBytes(file.size)}
                        </>
                    )}
                    <UploadFilePopper open={isDragActive}/>
                </div>
            </div>
        </div>
    );
};


interface UploadFilePopperProp {
    open: boolean
}

const UploadFilePopper: React.FC<UploadFilePopperProp> = ({open}) => {
    const [anchorEl, setAnchorEl] = React.useState<PopperProps['anchorEl']>(null);
    const classes = useStyles();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
        <>
            <Grid container
                  direction="row"
                  justify="flex-end"
                  alignItems="center">
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        action={
                            <IconButton aria-label="settings">
                                <CloseIcon/>
                            </IconButton>
                        }
                        subheader="Files"
                    />
                    <CardContent>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Single-line item"
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end">
                                        <CloudDoneIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default DragAndDropWrapper;
