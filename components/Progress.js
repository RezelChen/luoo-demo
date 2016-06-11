import React, { Component, PropTypes } from 'react'

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = { duration: 0 , currentTime: 0}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { duration, changeCurrentTime } = this.props
    const target = this.refs.wraper
    const x = e.pageX-target.offsetLeft,
          percent = x/target.clientWidth,
          newCurrentTime = duration*percent

    changeCurrentTime(newCurrentTime)
  }

  render() {
    const { duration, currentTime } = this.props
    const percent = currentTime/duration,
          percentWidth = percent*100+"%"

    return (
      <div ref="wraper" onClick={this.handleClick} style={{ width: "100px", backgroundColor: "#eee"}}>
        <div style={{ width: percentWidth, backgroundColor: "#444", height: "10px" }}></div>
      </div>
      
    )
  }
}

Progress.propTypes = {
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  changeCurrentTime: PropTypes.func.isRequired
}

export default Progress
