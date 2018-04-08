import React from 'react';
import HomeItem from './HomeItem'
import HelloWorld from './HelloWorld'
import Journals from './Journals'

/*
The component for the Home page. Contains all the presentation logic for handling showing of children based on child state
*/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

 

  /*
    Refresh should be called after a client event is handled by the server if
    any persistent state needs to be synced
  */
  refresh() {}

  componentDidMount() {
    this.refresh();
  }
//<HelloWorld name={this.props.name}/>
  render() {
    return (
      <div>
        <HomeItem />
        <Journals/>
      </div>
      );
  }
};
export default Home
