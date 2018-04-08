Minerva Rails
================

Minerva is a Ruby on Rails + Bootstrap + CSS + React.JS journaling application

The primary features supported are:

- Creation of journals with a title
- Viewing a list of journals
- Viewing a particular journal
- Viewing journal entries of a journal, ordered by date, with indicator for edit status
- Adding a specific journal entry to a journal
- Searching a collection of journal entries by title (does a partial match)
- Creation of new journal entries under a particular journal
- Editing journal entries

Features for future consideration:

- Error handling for badly formed requests on the back end
	- currently just returns the default rails 500 interal server error.
- Unit tests using `factory_girl_rails` and `faker` for random data
- More search options: different query ids, complex queries, whole string match
- User-Defined column ordering on journal entry listview
- More CSS for pretty UI


Ruby on Rails
-------------

This application requires:

- Ruby 2.4.1
- Rails 5.1.6
- Node.js 7.1.2 for react rendering and webpack

Getting Started
---------------
Installing rails dependencies:

```
$ bundle install
```


To setup `React-Rails`, execute:

```
$ rails webpacker:install
$ rails webpacker:install:react
```

[You may also require yarn for Node](https://yarnpkg.com/lang/en/docs/install/)

If `React-Rails` gives an error related to Yarn packages, Yarn packages may need updating:

```
$ yarn install
```

If issues are encountered with the `responders` gem, execute:

```
$ bundle install
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
1. If the database is modified from an external source (ex. a second client), the page must be reloaded, there is no polling for new data.

Similar Projects
----------------

Contributing
------------

Credits
-------
This application was generated with the [rails_apps_composer](https://github.com/RailsApps/rails_apps_composer) gem
provided by the [RailsApps Project](http://railsapps.github.io/).

License
-------
GPL