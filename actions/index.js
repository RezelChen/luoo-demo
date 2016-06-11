import fetch from 'isomorphic-fetch'

export const REQUEST_INFO = 'REQUEST_INFO'
export const RECEIVE_INFO = 'RECEIVE_INFO'
export const SELECT_VOL = 'SELECT_VOL'

export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SELECT_SONG = 'SELECT_SONG'

export function togglePlay() {
	return {
		type: TOGGLE_PLAY
	}
}

function realSelectSong(songId) {
	return {
		type: SELECT_SONG,
		songId
	}
}

export function selectSong(songId) {
	return (dispatch, getState) => {
		const state = getState()
		if (state.selectedAudio.current === songId) {
			dispatch(togglePlay())
		} else {
			dispatch(realSelectSong(songId))
		}
	}
}

export function requestInfo(volId) {
	return {
		type: REQUEST_INFO,
		volId
	}
}

export function receiveInfo(volId, data) {
	return {
		type: RECEIVE_INFO,
		volId,
		data,
		receivedAt: Date.now()
	}
}

function realSelectVol(volId) {
	return {
		type: SELECT_VOL,
		volId
	}
}

export function selectVol(volId) {
	return dispatch => {
		dispatch(realSelectVol(volId))
		dispatch(selectSong(0))
	}
	
}

function fetchVol(volId) {
	return dispatch => {
		dispatch(requestInfo(volId))
		return fetch(`/info/${volId}`)
			.then(response => {
				if (response.status === 404) throw 'file can not find'
				return response.json()
			})
			.then(json => dispatch(receiveInfo(volId, json)))
	}
}

function shouldFetchVol(state, volId) {
	const vol = state.volList[volId]
	if (!vol) {
		return true
	} else {
		return false
	}
}

export function fetchVolIfNeed(volId) {
	return (dispatch, getState) => {
		if (shouldFetchVol(getState(), volId)) {
			return dispatch(fetchVol(volId))
		}
	}
}