import React, {Component} from 'react'

class Poop extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="poop">
        <img
          src="/assets/poopemoji.png"
          width="150"
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

export default Poop
