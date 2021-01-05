import React, {Component} from 'react'

class Chidori extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="chidori">
        <img
          src="/assets/chidori.png"
          width="300"
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

export default Chidori
