import { combineReducers } from 'redux'
import { 
  REQUEST_INFO, RECEIVE_INFO, 
  SELECT_VOL, SELECT_SONG,
  TOGGLE_PLAY
} from '../actions'

function selectedVol(state = 101, action) {
  switch (action.type) {
    case SELECT_VOL:
      return action.volId
    default:
      return state
  }
}

function selectedAudio(state = { current: 0, isPlaying: true }, action) {
  switch (action.type) {
    case SELECT_SONG:
      return Object.assign({}, state, {
        current: action.songId,
        isPlaying: true
      })
    case TOGGLE_PLAY:
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying
      })
    default:
      return state
  }
}

function posts(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case REQUEST_INFO:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_INFO:
      return Object.assign({}, state, action.data, {
        isFetching: false,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function volList(state = {}, action) {
  switch (action.type) {
    case REQUEST_INFO:
    case RECEIVE_INFO:
      return Object.assign({}, state, {
        [action.volId]: posts(state[action.volId], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  volList,
  selectedVol,
  selectedAudio
})

export default rootReducer