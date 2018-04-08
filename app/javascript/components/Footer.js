import React from 'react';
/*
The component for the footer.
*/
export default class Footer extends React.Component{
  render(){
    return(
      <footer className="footer">
        <p className="float-left">
            Minerva
        </p>
        <p className="float-right">
            2018, Tony Gao 
        </p>
      </footer>
    );
  }
}