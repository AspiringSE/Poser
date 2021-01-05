import React, {Component} from 'react'

class Flash extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="flash">
        <img
          src="/assets/flash.png"
          width="600"
          height="500"
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

export default Flash
