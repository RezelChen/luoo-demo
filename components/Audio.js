import React, { Component, PropTypes } from 'react'
import Progress from '../components/Progress'

class Audio extends Component {
  constructor(props) {
    super(props)
    this.state = { duration: 0 , currentTime: 0}
    this.changeCurrentTime = this.changeCurrentTime.bind(this)
  }

  _format(time) {
    time = parseInt(time)
    let second = time%60
    let minute = (time-second)/60

    second = (second>9)? second : ('0'+second)
    minute = (minute>9)? minute : ('0'+minute)

    return minute+':'+second
  }

  _renderEachTime() {
    this.state.interval && clearInterval(this.state.interval)

    const { onEnd } = this.props
    const myAudio = this.refs.myAudio

    myAudio.onended = e => {
      onEnd()
    }

    myAudio.oncanplay = e => {
      this.setState({
        duration: myAudio.duration
      })
    }

    const interval = setInterval(() => {
      this.setState({ currentTime: myAudio.currentTime })
    }, 1000)

    this.setState({ interval })
  }

  changeCurrentTime(newCurrentTime) {
    const myAudio = this.refs.myAudio
    myAudio.currentTime = newCurrentTime
    this.setState({currentTime: newCurrentTime})
  }

  componentDidMount() {
    this._renderEachTime()
  }

  componentWillReceiveProps(nextProps) {
    const myAudio = this.refs.myAudio

    this._renderEachTime()

    if (nextProps.src === this.props.src) {
      (nextProps.isPlaying)? myAudio.play() : myAudio.pause()
    } else {
      this.setState({ duration: 0,
                        currentTime: 0 })
    }
  }

  componentWillUnmount() {
    this.state.interval && clearInterval(this.state.interval)
  }

  render() {
    const { src } = this.props

    const { duration, currentTime } = this.state

    return (
      <div>
        <audio ref="myAudio" autoPlay src={src}>您的浏览器不支持 audio 标签。</audio>
        <div>{this._format(duration)} / {this._format(currentTime)}</div>

        <Progress duration={duration}
                  currentTime={currentTime}
                  changeCurrentTime={this.changeCurrentTime}/>
      </div>
      
    )
  }
}

Audio.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired
}

export default Audio
