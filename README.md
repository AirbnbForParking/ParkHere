# ParkHERE
A parking app that matches Users looking for a short-term or long-term parking spot, with people renting their parking spots. Currently, only available for San Francisco.

# Team

  - __Product Owner__: Artem Bakalov
  - __Scrum Master__: Boshika Tara
  - __Development Team Members__: Max Yazhbin, Mike Hsieh, Boshika Tara, Artem Bakalov

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Open issues](#Open Issues)

# Usage
  

# Requirements

- node: "0.10.x"
- postgres
- ionic: "driftyco/ionic-bower#1.1.0"
- Cordova Plugins

# Development

  ### Installing Dependencies

    All the dependencies are listed in the package.json file, in the client and server folder.
    To install from within the root directory:

    ```sh
    sudo npm install -g bower
    npm install
    bower install
    ```
    Note on working with Postgres:
    For working with PostgreSQL locally, get the postgres working on th local machine, to do that go to http://www.postgresql.org/download/, once downloaded, the postgres server need to be running to connect the database to the app. Also pg modules in Node need to be installled, you can do this by addding pg to the package.json, and running npm install pg --save.
      
  # Open Issues

  https://github.com/AirbnbForParking/AirbnbForParking/issues

# Contributing

  See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and git workflow.


