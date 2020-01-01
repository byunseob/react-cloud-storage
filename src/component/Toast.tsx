import React from 'react';
import {observer} from 'mobx-react';
import store from '../store/ToastStore';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC = observer(() => {

    return (
        <>
            <ToastContainer
                position={store.position}
                autoClose={store.delay}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    );
});

export default Toast;