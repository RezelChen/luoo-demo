import React, { Component, PropTypes } from 'react'
import Progress from '../components/Progress'

class Audio extends Component {
  constructor(props) {
    super(props)
    this.state = { duration: 0 , currentTime: 0}
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.changeCurrentTime = this.changeCurrentTime.bind(this)
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

  changeCurrentTime() {
    const song = this.refs.myAudio
    var time = song.currentTime+10
    song.currentTime = time
  }

  _renderEachTime() {
    const song = this.refs.myAudio

    song.onended = e => {
      this.next()
    }

    song.oncanplay = e => {
      this.setState({
        duration: song.duration
      })
    }

    setInterval(() => {
      this.setState({ currentTime: song.currentTime })
    }, 500)
  }

  componentDidMount() {
    this._renderEachTime()
  }

  componentWillReceiveProps(nextProps) {
    const song = this.refs.myAudio

    if (nextProps.songId == this.props.songId) {
      (nextProps.isPlaying)? song.play() : song.pause()
    }

    this._renderEachTime()
  }

  render() {
    const { song, isPlaying, onChange, onToggle } = this.props

    return (
      <div>
        <audio ref="myAudio" autoPlay src={song.mp3}>您的浏览器不支持 audio 标签。</audio>
        <span onClick={onToggle}>{isPlaying? '暂停' : '播放'}</span>
        {" "}
        <span onClick={this.prev}>prev</span>
        {" "}
        <span onClick={this.next}>next</span>
        <div>{song.title}</div>
        <div>{this.state.duration} / {this.state.currentTime}</div>
        <div onClick={this.changeCurrentTime}>changeCurrentTime</div>
      </div>
      
    )
  }
}

Audio.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  song: PropTypes.shape({
    mp3: PropTypes.string.isRequired
  }).isRequired
}

export default Audio
