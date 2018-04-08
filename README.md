Minerva Rails
================

Minerva is a Ruby on Rails + Bootstrap + CSS + React.JS journaling application

The purpose of this application is to focus on the core journaling functionality 
related to creating a journal, editing the contents of journal entries, and 
creating journal entries.

The primary features supported are:

- Creation of journals with a title
- Viewing a list of journals
- Viewing a particular journal
- Viewing journal entries of a journal, ordered by date, with indicator for edit status
- Adding a specific journal entry to a journal
- Searching a collection of journal entries by title (does a partial match)
- Creation of new journal entries under a particular journal
- Editing journal entries

Future consideration:

- Error handling for badly formed requests on the back end
	- currently just returns the default rails 500 interal server error.
- Unit tests using `factory_girl_rails` and `faker` for random data
- More search options: different query ids, complex queries, whole string match
- User-Defined column ordering on journal entry listview
- More CSS for pretty UI
- Some reorganizing of the HTML elements, grouping of buttons for more intuitive UI.

Design
-------------
![](https://github.com/rpg711/minerva-rails/blob/master/documentation/high_level_design.png)
![](https://github.com/rpg711/minerva-rails/blob/master/documentation/component_design.png)

Dependencies
-------------

This application requires:

- Ruby 2.4.1
- Rails 5.1.6
- Node.js 7.2.0 for react rendering and webpack

Getting Started
---------------
1. [Install yarn](https://yarnpkg.com/lang/en/docs/install/)

2. Update yarn packages:

```
$ yarn install
```

3. Installing rails dependencies:

```
$ bundle install
```

4. If issues are encountered with the `responders` gem, execute:

```
$ rails g responders:install
```

Running
-------
If this is the first run, the database needs to be created and populated with records:

```
$ rake db:create
$ rake db:migrate
```

To run the server:

```
$ rails s
```

The webpage is located at `http://localhost:3000/`

Resetting database
-------------------------

```
$ rake db:reset
```

Issues
-------------
1. If the database is modified from an external source (ex. a second client), the page must be reloaded, there is no polling for database state.

Credits
-------
This application was generated with the [rails_apps_composer](https://github.com/RailsApps/rails_apps_composer) gem
provided by the [RailsApps Project](http://railsapps.github.io/).

License
-------
GPL