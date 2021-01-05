import React, {Component} from 'react'

class SpiritBomb extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="spiritbomb">
        <img
          src="/assets/spiritbomb.png"
          width="400"
          height="400"
          style={{
            position: 'fixed',
            top: this.props.y,
            left: this.props.x
          }}
        />
      </div>
    )
  }
}

export default SpiritBomb
