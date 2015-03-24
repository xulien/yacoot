# YACOOT

Yet Another Creator and Optimizer Of Thumbnail

Module for resize, crop and optimize pictures for web

## API

#### Installation

`$ npm install yacoot`

#### Usage

```js

    var Yacoot = require('yacoot');

    app.post('/foo/bar', function(req, res) {

        Yacoot(req.files.baz) // single or multiple files

            // global is optional and override default parameters
            .global({
                target: __dirname + '/defaultTarget/',
                height: 100
            })

            // crop and resize to ./defaultTarget/foo-large.jpg 100x400
            .to({
                height: 400,
                target: __dirname + '/otherTarget/[originalName]-100x400.jpg'
            })

            // crop and resize to ./foo-large.png 600x100
            .to({
                width: 600,
                name: 'foo-large',
                type: 'png'
            })

            // crop and resize to ./[originalName]-100x400.jpg 200x200, it's default size.
            .to()

            // crop and resize to ./bar.jpg 200x133
            .to({
                ratio: 4/3
                name: 'bar'
            })

            // another output again...
            .to({
                ...
            })
            ...

            // at last
            .exec(function(err) {

                console.log('all outputs processed');
                res.redirect('/');

            });

            // outputs files are optimized lossless by jpegoptim or optipng

    });

```

#### Default output value
    mode: '0755'
    width: 200
    height: 200
    ratio: 1
    type: 'jpg'
    target: __dirname + '/'

## TODO
* improved testing (so much...)
* add quality factor to jpegoptim and optipng (actually is 100% lossless)
* preserve/save original file