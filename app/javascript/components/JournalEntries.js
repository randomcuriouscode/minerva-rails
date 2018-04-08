import React from 'react';

export default class JournalEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      entries: []
    };
    this.onJournalCloseClick = props.onJournalCloseClick; // journal entry close handler
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="body-container">
            <div className="panel panel-default">
              <button type="button" className="btn btn-primary" onClick={(e) => this.onJournalCloseClick(e)}>Close Journal</button>
              <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Entry Title (Click for full entry)</th>
                        <th>Short contents</th>
                        <th>Created</th>
                        <th>Modified</th>
                    </tr>
                </thead>

                <tbody data-link="row" className="rowlink">
                  <tr>
                    <td><a href="javascript:void(0)" key="" onClick ={(e) => this.handleJournalClick(e, 0)}>
                    Tony's Secret Entry</a></td>
                    <td>SomeContents</td>
                    <td>2018-02-22T01813481341</td>
                    <td>Not Modified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }
}
