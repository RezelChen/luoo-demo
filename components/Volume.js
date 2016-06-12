import React, { Component, PropTypes } from 'react'

class Volume extends Component {

  render() {
    const { data, onChange, songId, isPlaying } = this.props
    
    return (
      <div>
        <pre>
          title: {data.title}
        </pre>
        <ul style={{ width: "300px"}}>
          {data.items.map((item, i) =>  {
            if (songId===i) {
              return (<li style={{ backgroundColor: "#eee" }} key={i}
                         onClick={(e) => onChange(i)}>{item.title} 点击{(isPlaying? '暂停': '播放')}</li>)
            } else {
              return (<li key={i}
                         onClick={(e) => onChange(i)}>{item.title}</li>)
            }
          }
            
          )}
        </ul>      
      </div>
      
    )
  }
}

Volume.propTypes = {
  data: PropTypes.shape({
  	title: PropTypes.string.isRequired,
  	items: PropTypes.array.isRequired
  }).isRequired,
}

export default Volume
