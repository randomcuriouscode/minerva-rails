import React from 'react';
import JournalEntries from './JournalEntries'
import {getAllJournals, createJournal, searchJournals} from './server'

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
    e.preventDefault();
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
  Journals handles everything related to a journal and logic for showing journal entries
*/
export default class Journals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      newJournal: false, // allow for dynamic swapping of journal creation form
      journals: [], // cache of journals
      journal_query: '', // search query for journal
      showJournalEntries: false, // whether or not to show the entries of a journal
      selectedJournal: -1 // the current selected journal
    }; 
    this.onJournalSubmit = this.onJournalSubmit.bind(this)
    this.onNewJournalClick = this.onNewJournalClick.bind(this)
    this.populateJournals = this.populateJournals.bind(this)
    this.appendJournalState = this.appendJournalState.bind(this)
    this.handleJournalQueryChange = this.handleJournalQueryChange.bind(this)
    this.onJournalSearchSubmit = this.onJournalSearchSubmit.bind(this)
    this.onJournalClicked = this.onJournalClicked.bind(this)
    this.onJournalCloseClick = this.onJournalCloseClick.bind(this)

    getAllJournals((res) => {
      console.log(res)
      this.setState({journals: res})
    });
  }

  /*
    Populate journals by all journals for now.
    TODO: look into how to populate without re-rendering the entire table, possibly
          converting each table entry into a React PureComponent
  */
  populateJournals() {
    var rows = [];
    var journal = undefined;
    for(let i = 0; i < this.state.journals.length; i ++){
      journal = this.state.journals[i]
      // force a deep copy from the state with valueOf(), avoiding closure weirdness
      rows.push(<tr key={journal.id}> 
                  <td><a href="javascript:void(0)" key="" onClick ={
                    (e) => this.onJournalClicked(e, this.state.journals[i].id.valueOf())}>{journal.title}</a></td>
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
    if (!this.state.newJournal)
      this.setState({newJournal: true})
    else
      this.setState({newJournal: false})
  }

  handleJournalQueryChange(e){
    e.preventDefault()
    this.setState({journal_query: e.target.value})
    console.log('Journal query : ' + this.state.journal_query)
  }

  onJournalSearchSubmit(e, query){
    e.preventDefault()
    searchJournals(query, (res) => {
      this.setState({journals: res})
    });
  }

  onJournalCloseClick(e)
  {
    e.preventDefault()
    this.setState({selectedJournal: -1, showJournalEntries: false})
  }

  onJournalClicked(e, id)
  {
    e.preventDefault()
    console.log("onJournalClicked::rendering journal id: " + id)

    // render the JournalEntries component, it can do the heavy lifting related to entries
    this.setState({selectedJournal: id, showJournalEntries: true}, () =>{
      this.scrollToBottom()
    });
  }

scrollToBottom() {
  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
}

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="body-container">
          <form>
            <div className="form-group">
              <label htmlFor="tb_journalSearch">Search Journal by Title</label>
              <input type="text" className="form-control" id="tb_journalSearch" aria-describedby="journalSearchHelp" onChange={this.handleJournalQueryChange} placeholder="Enter Title Query" />
              <small id="journalSearchHelp" className="form-text text-muted">Search by partial match, empty will output all journals. Orders in descending date of creation</small>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => this.onJournalSearchSubmit(e, this.state.journal_query)}>Search</button>
          </form>
          <button type="button" className="btn btn-primary" onClick={(e) => this.onNewJournalClick(e)}>New Journal</button>
          {(this.state.newJournal) ? 
            <NewJournalForm onJournalSubmit={this.onJournalSubmit}/> : ''}
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
            {(this.state.showJournalEntries) ?
              <JournalEntries journal_id={this.state.selectedJournal} onJournalCloseClick={this.onJournalCloseClick} /> : ''}
        

          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      </div>
      );
  }
}
