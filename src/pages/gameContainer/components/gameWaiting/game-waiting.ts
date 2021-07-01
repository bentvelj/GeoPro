import { model } from "./game-waiting-model";
import m from 'mithril';
import { GameWaitingAttrs, GameWaitingState } from './types';
import "./game-waiting.css"

export const gameWaiting: m.Component<GameWaitingAttrs, GameWaitingState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    view: (vnode: m.VnodeDOM<GameWaitingAttrs, GameWaitingState>) => {
        const { playerList } = vnode.state;
        return m(".game-waiting-container", [
            m(".waiting-label-container", [
                m("label.waiting-label", "Waiting for game to start..."),
            ]),
            m(".game-waiting-outer-panel-container", [
                m(".game-waiting-outer-panel", [
                    m(".game-waiting-settings", [
                        m("label.settings-label.sub-heading-label", "Settings"),
                        m(".number-of-guesses", [

                        ]),
                        m(".game-mode", [

                        ]),
                        m(".choose-map", [

                        ])
                    ]),
                    m(".game-waiting-players", [
                        m("label.players-label.sub-heading-label", "Players"),
                        m(".player-list-holder", [
                            playerList && playerList.map(player => {
                                return m(".player-holder", [
                                    m("label.player-name", player.username),
                                    m(".thing", player.userId)
                                ])
                            })
                        ])
                    ]),
                ]),
            ]),
            m(".start-game-container", [
                m("button.start-game.styled-button", {
                    onclick: () => model.handleStartButtonPress(vnode)
                }, "Start Game"),
            ])
            
        ])
    }
}