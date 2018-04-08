import React from 'react';
import JournalEntries from './JournalEntries'
import {getAllJournals, createJournal, searchJournals} from './server'

class NewJournalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      journal_title: ''
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
          <small id="journalHelp" className="form-text text-muted">Journal Title must not be empty or only whitespace</small>
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
      selectedJournal: -1, // the current selected journal
      selectedJournal_Title: '' // title of the current selected journal
    }; 
    this.onJournalSubmit = this.onJournalSubmit.bind(this)
    this.onNewJournalClick = this.onNewJournalClick.bind(this)
    this.populateJournals = this.populateJournals.bind(this)
    this.appendJournalState = this.appendJournalState.bind(this)
    this.handleJournalQueryChange = this.handleJournalQueryChange.bind(this)
    this.onJournalSearchSubmit = this.onJournalSearchSubmit.bind(this)
    this.onJournalClicked = this.onJournalClicked.bind(this)
    this.onJournalCloseClick = this.onJournalCloseClick.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.handleSearchEnterKey = this.handleSearchEnterKey.bind(this)

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
                    (e) => this.setState({showJournalEntries: false},
                          ()=> this.onJournalClicked(e, this.state.journals[i].title.valueOf(), this.state.journals[i].id.valueOf()))}>{journal.title}</a></td>
                  <td>{journal.created_at}</td> 
                  <td>{journal.updated_at}</td>
                </tr>); // TODO set state is a hack to swap entry while there is currently an entry displayed
    }
    console.log('populateJournals: populating ' + rows.length + ' rows');
    return rows;
  } 

  appendJournalState(newEntry)
  {
    var newState = this.state.journals.concat([newEntry]); 
    this.setState({journals: newState});
  }

  onJournalSubmit(e, title) { // handle creating a new journal from NewJournalForm
    e.preventDefault()
    if (title.trim().length === 0) // basic validation for invalid input
    {
      alert("Journal title cannot be empty, please try again.");
      return;
    }

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
    this.setState({journal_query: e.target.value}, () => console.debug('Journal query : ' + this.state.journal_query))
    
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
    this.setState({selectedJournal: -1, selectedJournal_Title: '', showJournalEntries: false})
  }

  onJournalClicked(e, title, id)
  {
    e.preventDefault()
    console.log("onJournalClicked::rendering journal id: " + id)

    // render the JournalEntries component, it can do the heavy lifting related to entries
    this.setState({selectedJournal: id, selectedJournal_Title: title, showJournalEntries: true}, () =>{
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

  handleSearchEnterKey(e) {
    if (e.key === 'Enter') {
      console.debug('got enter key press');
      this.onJournalSearchSubmit(e, this.state.journal_query);
    }
  }

  render() {
    return (
      <div>
        <div className="body-container">
          <div className="form-group">
            <label htmlFor="tb_journalSearch">Search Journal by Title</label>
            <input type="text" className="form-control" id="tb_journalSearch" aria-describedby="journalSearchHelp" 
            onChange={this.handleJournalQueryChange} onKeyPress={this.handleSearchEnterKey} placeholder="Enter Title Query" />
            <small id="journalSearchHelp" className="form-text text-muted">Search by partial match, empty will output all journals. Orders in descending date of creation</small>
          </div>
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-primary" 
                onClick={(e) => this.onJournalSearchSubmit(e, this.state.journal_query)}>
              Search
            </button>
            <button type="button" className="btn btn-primary" 
                onClick={(e) => this.onNewJournalClick(e)}>
              {(this.state.newJournal) ? "Cancel Creating Journal" : "New Journal"}
            </button>
          </div>
          
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
            <JournalEntries journal_id={this.state.selectedJournal} 
                journal_title={this.state.selectedJournal_Title}
                onJournalCloseClick={this.onJournalCloseClick} 
                scrollToBottom={this.scrollToBottom}/> : ''}
        
          <div style={{ float:"left", clear: "both" }} // this should always be at bottom
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      </div>
      );
  }
}
