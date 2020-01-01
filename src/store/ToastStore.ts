import {action, observable} from 'mobx';
import {toast} from 'react-toastify';

export enum ToastType {
    PRIMARY = 'primary',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger',
    DEFAULT = 'default'
}

export enum ToastPosition {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    TOP_CENTER = 'top-center',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    BOTTOM_CENTER = 'bottom-center'
}

interface ToastParams {
    type: ToastType;
    position: ToastPosition;
    delay: number;
    message: string;
}

class ToastStore {
    @observable position: ToastPosition = ToastPosition.BOTTOM_RIGHT;
    @observable delay: number = 2000;
    @observable message: string = '';


    @action
    open = (params: ToastParams) => {
        this.position = params.position;
        this.delay = params.delay;
        this.message = params.message;

        switch (params.type) {
            case ToastType.DEFAULT:
                toast(params.message);
                break;
            case ToastType.INFO:
                toast.info(params.message);
                break;
            case ToastType.WARNING:
                toast.warn(params.message);
                break;
            case ToastType.DANGER:
                toast.error(params.message);
                break;
            case ToastType.SUCCESS:
                toast.success(params.message);
                break;
        }
    };
}

const store = new ToastStore();

export default store;