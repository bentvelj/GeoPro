import { AddPlayerAction, DeletePlayerAction, GameDataActions, GameDataActionTypes, GameDataState, InGameChangeAction, InitGameDataAction, SetLocationHeaderDataAction, UpdateCountdownAction, UpdateRoundNumberAction } from "./types";

const initGameData: GameDataState = {
    admin: "",
    inGame: false,
    roomId: "",
    playerList: [],
    locationHeaderData: {},
    countdown: 0,
    roundNumber: 0,
    maxRound: 10
}

export const GameDataReducer = (state: GameDataState = initGameData, action: GameDataActions) : GameDataState => {
    switch(action.type) {
        case(GameDataActionTypes.INIT_GAME_DATA):
            return InitGameDataReducer(state, action)
        case(GameDataActionTypes.IN_GAME_CHANGE):
            return InGameChangeReducer(state, action)
        case(GameDataActionTypes.ADD_PLAYER):
            return AddPlayerReducer(state, action)
        case(GameDataActionTypes.DELETE_PLAYER):
            return DeletePlayerReducer(state, action)
        case(GameDataActionTypes.SET_LOCATION_HEADER_DATA):
            return SetLocationHeaderDataReducer(state, action)
        case(GameDataActionTypes.UPDATE_ROUND_NUMBER):
            return UpdateRoundNumberReducer(state, action)
        case(GameDataActionTypes.UPDATE_COUNTDOWN):
            return UpdateCountdownReducer(state, action)
        default:
            return state
    }
}

const InitGameDataReducer = (state: GameDataState, action: InitGameDataAction): GameDataState => {
    return({
        ...state,
        ...action.payload.state
    })
}

const InGameChangeReducer = (state: GameDataState, action: InGameChangeAction): GameDataState => {
    return({
        ...state,
        inGame: action.payload.inGame
    })
}

const AddPlayerReducer = (state: GameDataState, action: AddPlayerAction): GameDataState => {
    return({
        ...state,
        playerList: [...state.playerList, action.payload.newPlayer]
    })
}

const DeletePlayerReducer = (state: GameDataState, action: DeletePlayerAction): GameDataState => {
    return({
        ...state,
        playerList: state.playerList.filter(player => player.socketId !== action.payload.socketId)
    })
}

const SetLocationHeaderDataReducer = (state: GameDataState, action: SetLocationHeaderDataAction): GameDataState => {
    return({
        ...state,
        locationHeaderData: action.payload.locationHeaderData,
    })
}

const UpdateRoundNumberReducer = (state: GameDataState, action: UpdateRoundNumberAction) => {
    return({
        ...state,
        roundNumber: action.payload.roundNumber
    })
}

const UpdateCountdownReducer = (state: GameDataState, action: UpdateCountdownAction) => {
    return({
        ...state,
        countdown: action.payload.countdown
    })
}