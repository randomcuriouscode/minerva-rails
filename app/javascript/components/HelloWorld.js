import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.name}
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  name: PropTypes.string
};
export default HelloWorld
