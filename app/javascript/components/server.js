/**
* Server.js contains all of the REST integration with the rails backend
**/

/**
* Properly configure+send an XMLHttpRequest with error handling,
* authorization token, and other needed properties.
* From CS326.
*/
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  //xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      console.error('Could not ' + verb + " " + resource + ": Received " +
      statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    console.error('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    console.error('Could not ' + verb + " " + resource +
    ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
    // No body to send.
    xhr.send();
    break;
    case 'string':
    // Tell the server we are sending text.

    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(body);
    break;
    case 'object':
    // Tell the server we are sending JSON.
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Convert body into a JSON string.
    xhr.send(JSON.stringify(body));
    break;
    default:
    throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function createJournal(title, cb){
  sendXHR('POST', '/journals', {'title' : title}, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
}

export function getAllJournals(cb){
  sendXHR('GET', '/journals/all', undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
}

export function searchJournals(query, cb){
  sendXHR('POST', '/journals/search', {'title' : query}, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
}

export function postEntry(journal_id, title, body, cb){
  sendXHR('POST', '/journals/' + journal_id + '/entry', 
        {'title' : title, 'body' : body}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
  });
}

export function getEntries(journal_id, cb){
  sendXHR('GET', '/entries/' + journal_id, 
        undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
  });
}

export function updateEntry(entry_id, title, body, cb){
  sendXHR('PUT', '/entry/' + entry_id, 
        {'title' : title, 'body' : body}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
  });
}

export function getFullEntry(entry_id, cb){
  sendXHR('GET', '/entry/' + entry_id, 
        undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
  });
}
