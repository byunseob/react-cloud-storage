import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Card, CardActions, CardMedia, Container, Grid} from "@material-ui/core";
import ContextMenuWrapper from "../component/ContextMenuWrapper";
import DragAndDropWrapper from "../component/DragAndDropWrapper";
import CopyToClipboard from 'react-copy-to-clipboard';
import toastStore, {ToastPosition, ToastType} from "../store/ToastStore";


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const DashBoard: React.FC = () => {
    const classes = useStyles();
    const mainRef = useRef<any>(null);

    const onClickCopy = () => {
        toastStore.open({
            type: ToastType.SUCCESS,
            message: "COPY",
            position: ToastPosition.BOTTOM_RIGHT,
            delay: 3000
        });
    };

    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <main ref={mainRef}>
                <ContextMenuWrapper>
                    <DragAndDropWrapper>
                        <Container className={classes.cardGrid} maxWidth="md">
                            <Grid container spacing={4}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(card => (
                                    <Grid item key={card} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://source.unsplash.com/random"
                                                title="Image title"
                                            />
                                            <CardActions>
                                                {/*<Button size="small" color="primary">*/}
                                                {/*    View*/}
                                                {/*</Button>*/}
                                                <Grid container
                                                      direction="row"
                                                      justify="flex-end"
                                                      alignItems="center">
                                                    <CopyToClipboard text={"https://source.unsplash.com/random"}
                                                                     onCopy={onClickCopy}>
                                                        <Button size="small" color="primary">
                                                            copy
                                                        </Button>
                                                    </CopyToClipboard>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </DragAndDropWrapper>
                </ContextMenuWrapper>
            </main>
        </div>
    );
};

export default DashBoard;
