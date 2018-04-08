import React from 'react';
import JournalEntries from './JournalEntries'
import {getAllJournals, createJournal} from './server'

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
      newJournal: false, // allow for dynamic swapping of journal creation form
      journals: []
    }; // TODO need to define handler in Home.js to show JournalEntries component
    this.handleJournalClick = props.onJournalClicked // send journal click event upstream to show entries
    this.onJournalSubmit = this.onJournalSubmit.bind(this)
    this.onNewJournalClick = this.onNewJournalClick.bind(this)
    this.populateJournals = this.populateJournals.bind(this)
    this.appendJournalState = this.appendJournalState.bind(this)

    getAllJournals((res) => {
      console.log(res)
      this.setState({journals: res})
    });
  }

  /*
    Populate journals by all journals for now.
    TODO: look into how to populate without re-rendering the entire table
  */
  populateJournals() {
    var rows = [];
    var journal = undefined;
    for(let i = 0; i < this.state.journals.length; i ++){
      journal = this.state.journals[i]
      // force a deep copy from the state, avoiding closure weirdness
      rows.push(<tr key={journal.id}> 
                  <td><a href="javascript:void(0)" key="" onClick ={
                    (e) => this.handleJournalClick(e, this.state.journals[i].id.valueOf())}>{journal.title}</a></td>
                  <td>{journal.created_at}</td> 
                  <td>{journal.updated_at}</td>
                </tr>);
    }
    console.log('populateJournals: populating ' + rows.length + ' rows');
    return rows;
  } 

  appendJournalState(newEntry)
  {
    var newState = this.state.journals.concat([newEntry]); 
    this.setState({journals: newState});
  }

  onJournalSubmit(e, title) { // handle new journal submit from NewJournalForm
    e.preventDefault()
    this.setState({newJournal: false})
    console.log("onJournalSubmit: Got a journal!" + title) 
    // contact backend, write journal, render new entry in journal table

    createJournal(title, (res) => {
      console.log('onJournalSubmit: Journal created: ' + JSON.stringify(res))
      this.appendJournalState(res)
    });
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
            <div className="table-wrapper panel panel-default">
              <table className="table table-hover table-bordered table-scrollable">
                <thead>
                    <tr>
                        <th>Journal Title</th>
                        <th>Created</th>
                        <th>Modified</th>
                    </tr>
                </thead>

                <tbody data-link="row" className="rowlink">
                  {this.populateJournals()}
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
