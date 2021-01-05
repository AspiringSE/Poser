import React, {Component} from 'react'

class Kamehameha extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="kamehameha">
        <img
          src="/assets/kamehameha.png"
          width="600"
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

export default Kamehameha
