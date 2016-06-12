import React, { Component, PropTypes } from 'react'
import Audio from '../components/Audio' 

class Song extends Component {
  constructor(props) {
    super(props)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  prev() {
    const { songId, songsLength, onChange } = this.props
    if (songId == 0) {
      onChange(songsLength-1)
    } else {
      onChange(songId-1)
    }
  }

  next() {
    const { songId, songsLength, onChange } = this.props
    if (songId == songsLength-1) {
      onChange(0)
    } else {
      onChange(songId+1)
    }
  }

  render() {
    const { song, isPlaying, onChange, onToggle } = this.props
    
    return (
      <div>
        <span onClick={onToggle}>点击{isPlaying? '暂停' : '播放'}</span>
        {" "}
        <span onClick={this.prev}>prev</span>
        {" "}
        <span onClick={this.next}>next</span>
        <div style={{ position: "absolute", left: "400px", top: "50px" }}>          
          <img src={song.poster} style={{ width: "200px", height: "200px" }}/>
          <p style={{ fontSize: "30px"}}>{song.title}</p>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
        </div>
        <Audio src={song.mp3}
               onEnd={this.next}
               isPlaying={isPlaying} />
      </div>
      
    )
  }
}

Song.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  song: PropTypes.shape({
    mp3: PropTypes.string.isRequired
  }).isRequired
}

export default Song
