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

- Error handling for badly formed requests
- Unit tests using `factory_girl_rails` and `faker` for random data
- More search options: different query ids, complex queries, whole string match
- Column ordering on journal entry listview
- More CSS for pretty UI
- TBD


Ruby on Rails
-------------

This application requires:

- Ruby 2.4.1
- Rails 5.1.6

Getting Started
---------------

To setup `React-Rails`, execute:

```
$ rails webpacker:install
$ rails webpacker:install:react
```

If issues are encountered with the `responders` gem, execute:

```
$ bundle install
$ rails g responders:install
```

Documentation and Support
-------------------------

Issues
-------------

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
