import { extendBaseModel } from 'base/baseModel';
import m from 'mithril';
import { socket } from 'socket/socket-main';
import { store } from 'state/store';
import { UpdateMapStyle } from 'state/UserData/actions';
import { MapStylesKey } from 'state/UserData/types';
import { NavigationAttrs, NavigationState } from './types';

interface NavigationModel {
    handleComponentInit: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => void;
    handleMapStyleChange: (mapStyleChange: MapStylesKey) => void;
}

export const model: NavigationModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<NavigationAttrs, NavigationState>) => {
        vnode.state.navShown = false;
        vnode.state.subscriptions = [];
    },
    handleMapStyleChange: (mapStyleChange: MapStylesKey) => {
        store.dispatch(UpdateMapStyle(mapStyleChange));
        socket.emit("message", "nav event")
    }
})