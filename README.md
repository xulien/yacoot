# YACOOT

Yet Another Creator and Optimizer Of Thumbnail

Module for resize, crop and optimize pictures for web

## API

#### Installation

`$ npm install yacoot`

#### Usage

```js

var Yacoot = require('yacoot');

Yacoot(string|[string, string, ...]|{multer object with path}|{multer object with buffer}) 
    // global is optional and override default parameters
    .global({
        target: '/defaultTarget/',
        height: 100
    })

    // crop and resize to ./defaultTarget/foo-large.jpg 100x400
    .to({
        height: 400,
        target: '/otherTarget/noname-100x400.jpg'
    })

    // crop and resize to ./foo-large.png 600x100
    .to({
        width: 600,
        name: 'foo-large',
        type: 'png'
    })

    // save to s3 storage instead of local file system
    .to({
      s3: {
        key: 'myapikey',
        secret: 'mysecret',
        bucket: 'mybucket',
        endpoint: 'host'
      }
    })

    // crop and resize to ./bar.jpg 200x133
    .to({
        ratio: 4/3
        name: 'bar'
    })

    ...

    // at last
    .exec(function(err) {

        console.log('all outputs processed');
        res.redirect('/');

    });

    // outputs files are optimized by mozjpeg



```

#### Default output value
    mode: '0755'
    width: 200
    height: 200
    ratio: 1
    target: '/'

## TODO
* improved testing (so much...)
* preserve/save original file
