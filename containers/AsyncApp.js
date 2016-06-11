import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { selectVol, fetchVolIfNeed, selectSong, togglePlay } from '../actions'
import Picker from '../components/Picker'
import Volume from '../components/Volume'
import Song from '../components/Song'

class AsyncApp extends Component {
	constructor(props) {
  		super(props)
  		this.handleChange = this.handleChange.bind(this)
  		this.handleSongChange = this.handleSongChange.bind(this)
  		this.handleTogglePlay = this.handleTogglePlay.bind(this)
	}

	componentDidMount() {
		const { dispatch, selectedVol } = this.props
		dispatch(fetchVolIfNeed(selectedVol))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedVol !== this.props.selectedVol) {
			const { dispatch, selectedVol } = nextProps
			dispatch(fetchVolIfNeed(selectedVol))
		}
	}

	handleChange(nextVolId) {
		this.props.dispatch(selectVol(nextVolId))
	}

	handleSongChange(songId) {
		this.props.dispatch(selectSong(songId))
	}

	handleTogglePlay() {
		this.props.dispatch(togglePlay())
	}

	render() {
		const { selectedVol, selectedAudio, isFetching, items, volInfo} = this.props
		const currentSong = selectedAudio.current

		return (
		<div>
			<Picker value={selectedVol}
					onChange={this.handleChange}
					options={[101, 102, 103, 104, 105, 106, 107, 108, 109, 110]} />
			{items.length > 0 &&
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
					<Volume data={volInfo}
							onChange={this.handleSongChange}
							songId={currentSong}
							isPlaying={selectedAudio.isPlaying} />

					<Song song={items[currentSong]}
						   songId={currentSong}
						   songsLength={items.length}
					       isPlaying={selectedAudio.isPlaying}
					       onChange={this.handleSongChange}
					       onToggle={this.handleTogglePlay} />
				</div>
			}
		</div>
		)
		
	}
}

function mapStateToProps(state) {
	const { selectedVol, selectedAudio, volList } = state
	const volInfo = volList[selectedVol] || { isFetching: true, items: [] }
	const { isFetching, items } = volInfo

  return {
    selectedVol,
    selectedAudio,
    isFetching,
    items,
    volInfo
  }
}

export default connect(mapStateToProps)(AsyncApp)