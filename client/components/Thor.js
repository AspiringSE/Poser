import React, {Component} from 'react'

class Thor extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="thor">
        <img
          src="/assets/thunder.png"
          width="1000"
          height="300"
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

export default Thor
