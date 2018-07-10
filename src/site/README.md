# Skitter Front End

## Build Steps
Follow below. Make sure to build distribution instructions before building docker images
### Install

With node installed:
``` bash
# install dependencies
npm install
```

### Running Dev server
To run local dev server. This is not setup to connect to the micro services
```
# serve with hot reload at localhost:8080
npm run dev
```

### Build distribution
This needs to be run before building docker images or pushing to git
```
# build for production with minification
npm run build
```

