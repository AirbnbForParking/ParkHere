# ParkHere
A parking app that matches Users looking for a short-term or long-term parking spot, with people renting their parking spots.

## Team

  - __Product Owner__: Artem Bakalov
  - __Scrum Master__: Boshika Tara
  - __Development Team Members__: Max Yazhbin, Mike Hsieh, Boshika Tara, Artem Bakalov

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)


## Requirements

- node: "0.10.x"
- postgres : "^3.6.3",
- ionic: "driftyco/ionic-bower#1.1.0"
- Cordova Plugins- 

## Development

### Installing Dependencies

All the dependencies are listed in the package.json file, in the client and server folder.
To install from within the root directory:

```sh
sudo npm install -g bower
sudo npm install -g cordova ionic
ionic lib update && bower update
npm install
bower install
ionic platform ios android
```
Ionic Link: http://ionicframework.com/docs/cli/install.html
Note: Testing the Ionic Frontend happens in one terminal winow, while backend in another.
For testing Ionic Frontend
```sh
cd client && ionic serve
```
For Testing Ionic Backend
```sh
cd server && ionic serve
```

How to install PostgreSQL locally: To get the postgres working on the local machine,go to http://www.postgresql.org/download/, you will also need to install pg modules in NodeJs, you can do this by addding pg to the package.json, and running npm install pg --save.. 
Befor you can connect to the database to the application, you need to run the postgres server, you can start it from the commnand line, follow instructions listed here:http://www.postgresql.org/docs/9.1/static/server-start.html


### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

# Open Issues

  https://github.com/AirbnbForParking/AirbnbForParking/issues


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and git workflow.
