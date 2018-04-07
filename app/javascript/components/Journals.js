import React from 'react';
import JournalEntries from './JournalEntries'

class NewJournalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      journal_title: ""
    };

    this.onJournalSubmit = props.onJournalSubmit
    this.handleJournalTitleChange = this.handleJournalTitleChange.bind(this)
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  handleJournalTitleChange (e) {
    this.setState({journal_title: e.target.value})
    console.log(this.state.journal_title)
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="tb_journal">Journal Title</label>
          <input type="text" className="form-control" id="tb_journal" aria-describedby="journalHelp" onChange={this.handleJournalTitleChange} placeholder="Enter Journal Title" />
          <small id="journalHelp" className="form-text text-muted">Journal Title can be anything!</small>
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => this.onJournalSubmit(e, this.state.journal_title)}>Submit</button>
      </form>
      );
  }
}

/*
  Journals handles everything related to a journal itself
*/
export default class Journals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      newJournal: false
    };
    this.handleJournalClick = props.onJournalClicked // send journal click event upstream to show entries
    this.onJournalSubmit = this.onJournalSubmit.bind(this)
    this.onNewJournalClick = this.onNewJournalClick.bind(this)
  }

  onJournalSubmit(e, title) { // handle new journal submit from NewJournalForm
    e.preventDefault()
    this.setState({newJournal: false})
    console.log("Got a journal!" + title) 
    // TODO contact backend, write journal, render new entry in journal table
  }

  onNewJournalClick(e) { // show the new journal form on btn click
    e.preventDefault()
    this.setState({newJournal: true})
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="body-container">
          <div className="col-md-2">
          <button type="button" className="btn btn-primary" onClick={(e) => this.onNewJournalClick(e)}>New Journal</button>
          </div>
          {(this.state.newJournal) ? 
            <NewJournalForm onJournalSubmit={this.onJournalSubmit}/> : ''}
          <div className="col-md-8 text-center">
            <div className="panel panel-default">
              <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Journal Title</th>
                        <th>Created</th>
                        <th>Modified</th>
                    </tr>
                </thead>

                <tbody data-link="row" className="rowlink">
                  <tr>
                    <td><a href="javascript:void(0)" key="" onClick ={(e) => this.handleJournalClick(e, 0)}>Tony's Secret Journal</a></td>
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
