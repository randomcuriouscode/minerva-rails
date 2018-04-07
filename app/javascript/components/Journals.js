import React from 'react';

export default class HomeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  handleJournalClick(e) {
    e.preventDefault()

    if(e.button === 0){
      console.log("Journal was clicked!")
    }
  }

  render() {
    return (
      <div>
        <div className="body-container">
          <div className="col-md-2">
          </div>
          <div className="col-md-8 text-center">
            <div className="panel panel-default">
              <table className="table table-hover table-bordered">
                <caption>Journals</caption>
                <thead>
                    <tr>
                        <th>Journal Title</th>
                        <th>Created</th>
                        <th>Modified</th>
                    </tr>
                </thead>

                <tbody data-link="row" className="rowlink">
                  <tr>
                    <td><a href="javascript:void(0)" key="" onClick ={(e) => this.handleJournalClick(e)}>Tony's Secret Journal</a></td>
                    <td>2018-02-22T01813481341</td>
                    <td>Some time after</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-2">
          </div>
        </div>
      </div>
      );
  }
}