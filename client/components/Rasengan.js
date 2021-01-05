import React, {Component} from 'react'

class Rasengan extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="rasengan">
        <img
          src="/assets/rasengan.png"
          width="100"
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

export default Rasengan
