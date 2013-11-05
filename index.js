var fs = require('fs-extra')
  , spawn = require('child_process').spawn
  , argv = require('optimist').argv
  , through = require('through')

if (!argv._.length) {
	console.log('no command')
}

var command = argv._.shift()

console.log(command + ' time!')

if (command === 'all') {
  preprocess()
  build()
  upload()
} else if (command === 'preprocess') {
  preprocess()
} else if (command === 'build') {
  build()
} else if (command === 'upload') {
  upload()
} else if (command === 'init') {
  init()
}

function preprocess() {
  var processed_file = spawn('dotc', ['pre', 'lib/main.cpp'])
    , destination = fs.createWriteStream('src/main.cpp', {'flags': 'w'})
  processed_file.stdout.pipe(destination)
}

function build() {
  var ino = spawn('ino', ['build'])
  ino.stdout.pipe(process.stdout)
  ino.stderr.pipe(process.stderr)
}

function upload() {
  var ino = spawn('ino', ['upload'])
  ino.stdout.pipe(process.stdout)
  ino.stderr.pipe(process.stderr)
}

function init() {
  fs.copy(__dirname + '/template', './')

}