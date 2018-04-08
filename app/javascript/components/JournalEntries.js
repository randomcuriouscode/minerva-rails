import React from 'react';
import {getEntries, updateEntry, getFullEntry, postEntry} from './server';

class JournalEntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_body: '',
      entry_title: '',
      entry_id: ''
    };

    this.onEntryEditClicked = props.onEntryEditClicked
    this.handleEntryTitleChange = this.handleEntryTitleChange.bind(this)
    this.handleEntryBodyChange = this.handleEntryBodyChange.bind(this)

    getFullEntry(props.entry_id, (res) =>{
      this.setState({entry_body: res.body, entry_title: res.title, entry_id: res.id})
    });
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  handleEntryBodyChange (e) {
    e.preventDefault();
    this.setState({entry_body: e.target.value}, () => console.log(this.state.entry_body))
    
  }
  handleEntryTitleChange (e) {
    e.preventDefault();
    this.setState({entry_title: e.target.value}, () => console.log(this.state.entry_title))
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <h4>Edit Entry</h4>
          <label htmlFor="tb_entryName">Entry Title</label>
          <input type="text" className="form-control" id="tb_entryName" aria-describedby="entryHelp" 
          onChange={this.handleEntryTitleChange} value={this.state.entry_title} />
          <small id="entryHelp" className="form-text text-muted">Entry Title must not be empty or only whitespace</small>
          <label htmlFor="tb_entryContents">Entry Contents</label>
          <textarea className="form-control" id="tb_entryContents" 
              rows="3" value={this.state.entry_body} onChange={this.handleEntryBodyChange}/>

        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => 
            this.onEntryEditClicked(e, this.state.entry_title, this.state.entry_body)}>
          Edit Entry</button>
      </form>
      );
  }
}

/**
  This is essentially the same thing as JournalEntryEditor, but for entry creation.
  TODO: DRY this up by merging functionality with the editor
*/
class JournalEntryCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_body: '',
      entry_title: ''
    };

    this.onEntrySubmitClicked = props.onEntrySubmitClicked
    this.handleEntryTitleChange = this.handleEntryTitleChange.bind(this)
    this.handleEntryBodyChange = this.handleEntryBodyChange.bind(this)
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  handleEntryBodyChange (e) {
    e.preventDefault();
    this.setState({entry_body: e.target.value}, () => console.log(this.state.entry_body))
    
  }
  handleEntryTitleChange (e) {
    e.preventDefault();
    this.setState({entry_title: e.target.value}, () => console.log(this.state.entry_title))
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <h4>Create Entry</h4>
          <label htmlFor="tb_entryName">Entry Title</label>
          <input type="text" className="form-control" id="tb_entryName" aria-describedby="entryHelp" 
          onChange={this.handleEntryTitleChange} value={this.state.entry_title} />
          <small id="entryHelp" className="form-text text-muted">Entry Title must not be empty or only whitespace</small>
          <label htmlFor="tb_entryContents">Entry Contents</label>
          <textarea className="form-control" id="tb_entryContents" 
              rows="3" value={this.state.entry_body} onChange={this.handleEntryBodyChange}/>

        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => 
            this.onEntrySubmitClicked(e, this.state.entry_title, this.state.entry_body)}>
          Create Entry</button>
      </form>
      );
  }
}

export default class JournalEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      entries: [],
      journal_id: -1, // this should never be reset
      show_entry_editor: false,
      show_entry_creator: false,
      selected_entry: -1,
      journal_title: ''
    };
    this.onJournalCloseClick = props.onJournalCloseClick; // journal entry close handler
    this.scrollToBottom = props.scrollToBottom; // scrolls to the bottom of journals component
    
    this.populateEntries = this.populateEntries.bind(this);
    this.onEntryClicked = this.onEntryClicked.bind(this);
    this.onEntryEditClicked = this.onEntryEditClicked.bind(this);
    this.onEntryCreateClick = this.onEntryCreateClick.bind(this);
    this.onEntrySubmitClicked = this.onEntrySubmitClicked.bind(this);

    console.log('JournalEntries:: Show entries for journal: ' + props.journal_id)
    getEntries(props.journal_id, (res) =>{
      console.log(res)
      this.setState({journal_title: props.journal_title, journal_id: props.journal_id, entries: res},
        () => this.scrollToBottom());
    });
  }

  onEntryEditClicked(e, title, body){ // edit the current focus entry
    e.preventDefault();

    if (title.trim().length === 0)
    {
      alert("Title is empty or only whitespace, please try again");
      return;
    }

    updateEntry(this.state.selected_entry, title, body, (res) => { 
        // TODO: change this to swap just the changed entry
        this.setState({show_entry_editor: false}, () => {
        this.refresh();
      });
    });
  }

  onEntryClicked(e, entry_id){ // show the entry editor for the clicked entry
    e.preventDefault()

    this.setState({selected_entry: entry_id, show_entry_editor: true}, ()=>{
      this.scrollToBottom();
    });
  }

  onEntryCreateClick(e){ // show the entry creation form
    e.preventDefault()

    this.setState({show_entry_creator: true}, ()=>{
      this.scrollToBottom();
    });
  }

  onEntrySubmitClicked(e, entry_title, entry_body){ // create a new entry when submit is called
    e.preventDefault()

    if (entry_title.trim().length === 0)
    {
      alert("Title is empty or only whitespace, please try again");
      return;
    }

    postEntry(this.state.journal_id, entry_title, entry_body, (res) =>
    {
      this.setState({show_entry_creator: false}, ()=>{
        this.refresh();
      });
    });
  }

  populateEntries() {
    var rows = [];
    var entry = undefined;
    var last_date = '';
    for(let i = 0; i < this.state.entries.length; i ++){
      entry = this.state.entries[i]
      let cur_date = entry.created_at.split('T')[0] // db always tags a date
      let body = entry.body
      if (body.length > 30) // truncate body if too long
      {
        body = body.substring(0, 30);
      }
      if (cur_date != last_date)
      { // just push a row to delimit items with different dates, since entries is already sorted.
        rows.push(<tr key={entry.id + 'delimiter'} className="table-date-sep"> 
                  <td>Entries for {cur_date}</td>
                  <td></td>
                  <td></td> 
                  <td></td>
                </tr>);
      }
      // force a deep copy from the state with valueOf(), avoiding closure weirdness
      rows.push(<tr key={entry.id}> 
                  <td><a href="javascript:void(0)" key="" onClick ={
                    (e) => this.setState({show_entry_editor: false}, () =>
                      this.onEntryClicked(e, this.state.entries[i].id.valueOf()))}>{entry.title}</a></td>
                  <td>{body}</td>
                  <td>{entry.created_at}</td> 
                  <td>{entry.updated_at === entry.created_at ? 'Not Modified' : 'Modified'}</td>
                </tr>);
      last_date = cur_date;
    }
    console.log('populateEntries: populating ' + rows.length + ' rows');

    return rows;
  } 

  refresh() {
    getEntries(this.state.journal_id, (res) =>{
      console.log('JournalEntries::Refresh: ' + res + ' journal id :' + this.state.journal_id)
      this.setState({entries: res})
    });    
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="body-container">
            <div className="panel panel-default">
              <h3>Showing Journal: {this.state.journal_title}</h3>
              <div className="col-xs-12">
                <button type="button" className="btn btn-primary" onClick={(e) => this.onEntryCreateClick(e)}>
                  Create Entry for {this.state.journal_title}
                </button>
                <button type="button" className="btn btn-primary pull-right" onClick={(e) => this.onJournalCloseClick(e)}>
                  <span aria-hidden="true">Close Journal</span>
                </button>
              </div>
              <div className="table-wrapper panel panel-default">
                <table className="table table-hover table-bordered table-scrollable">
                  <thead>
                      <tr>
                          <th>Entry Title (Click for full entry)</th>
                          <th>Short contents</th>
                          <th>Created</th>
                          <th>Modified</th>
                      </tr>
                  </thead>

                  <tbody data-link="row" className="rowlink">
                    {this.populateEntries()}
                  </tbody>
                </table>
              </div>

              {(this.state.show_entry_editor) ? 
                <div>
                <hr className="body-separator" />
                <JournalEntryEditor onEntryEditClicked={this.onEntryEditClicked}
                  entry_id={this.state.selected_entry} /> 
                </div>: ''}

              {(this.state.show_entry_creator) ? 
                <div>
                  <hr className="body-separator" />
                  <JournalEntryCreator onEntrySubmitClicked={this.onEntrySubmitClicked} /> 
                </div> : ''}
            </div>
          </div>
        </div>
      );
  }
}
