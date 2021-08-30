import { extendBaseModel } from 'base/baseModel';
import m from 'mithril';
import { socket } from 'socket/socket-main';
import { GameSettingsAttrs, GameSettingsState } from "./types";
import { pluck, distinctUntilChanged, tap } from "rxjs/operators"
import { bindTo } from 'base/operators';

interface GameWaitingModel {
    handleComponentInit: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>) => void;
    handleComponentRemove: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>) => void;
    handleResultsSliderOnInput: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>, e: any) => void;
    handleTimeSliderOnInput: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>, e: any) => void;
    handleGuessSliderOnInput: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>, e: any) => void;
}

export const model: GameWaitingModel = extendBaseModel({
    handleComponentInit: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>) => {
        vnode.state.subscriptions = [];
        const {store$} = vnode.attrs;

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CapitalProData", "resultsToChooseFrom"),
                distinctUntilChanged(),
                bindTo("resultsToChooseFrom", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CapitalProData", "maxCountdown"),
                distinctUntilChanged(),
                bindTo("maxCountdown", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("CapitalProData", "guessLimit"),
                distinctUntilChanged(),
                bindTo("guessLimit", vnode)
            ).subscribe()
        )

        vnode.state.subscriptions.push(
            store$.pipe(
                pluck("GameData", "roomId"),
                distinctUntilChanged(),
                bindTo("roomId", vnode)
            ).subscribe()
        )
    },
    handleResultsSliderOnInput: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>, e: any) => {
        const { roomId } = vnode.state;
        const num = +e.target.value;
        socket.emit("update-num-of-top-results", roomId, num)
    },
    handleTimeSliderOnInput: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>, e: any) => {
        const { roomId } = vnode.state;
        const num = +e.target.value;
        socket.emit("update-max-countdown", roomId, num)
    },
    handleGuessSliderOnInput: (vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>, e: any) => {
        const { roomId } = vnode.state;
        const num = +e.target.value;
        socket.emit("update-guess-limit", roomId, num)
    }
})