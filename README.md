# Joute-Ionic

## Requis

* nodejs: v8.9.4
 
## Installation

```sh
# Install cordava and ionic
npm i -g cordova ionic

# Clone the project
git clone https://github.com/CPNV-ES/Joutes-Ionic.git

## The following commands are to be executed in the project folder
# Install dependencies
npm i

# Build default folder
ionic serve

# Reinstall cordova plugins
ionic cordova prepare

# Configure platforms (add android platform)
ionic cordova platform add android
```

You will need to change the IP/URL address for the API server in the "\src\providers\data-service.ts" file so that it corresponds to the one you are using.

## Run project

```sh
ionic serve --lab
```

You should have dev environment on [http://127.0.0.1:8100/ionic-lab](http://127.0.0.1:8100/ionic-lab)

## API setup

Download and extract the project from the following link : [https://github.com/LogLauncher/Joutes/releases/tag/v1.1](https://github.com/LogLauncher/Joutes/releases/tag/v1.1)

Next just follow the steps in the projects readme to get it up and running. **Do not** clone the menchend git in the installation guide.

## Build solutions

First build ressources

```sh
ionic cordova resources
```

Then build

```sh
ionic cordova build android
# or
ionic cordova build ios
```

Look [official documentation](https://ionicframework.com/docs/cli/cordova/build/) for troubleshooting
