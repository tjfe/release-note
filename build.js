'use strict'

const fs = require('fs')
const path = require('path')

const psargv = require('psargv')
const zmd = require('zmdjs')

const pug = require('pug')
const yaml = require('js-yaml')

const CleanCSS = require('clean-css')
const UglifyJS = require('uglify-js')

const options = psargv(process.argv.slice(2))

const distFolder = 'dist'

if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder)
}

function read(filepath) {
  return fs.readFileSync(path.join('src', filepath), 'utf8').toString()
}

function write(dest, content) {
  const filepath = path.join(distFolder, dest)
  const filedir = path.dirname(filepath)

  if (!fs.existsSync(filedir)) {
    fs.mkdirSync(filedir, {recursive: true})
  }

  fs.writeFile(filepath, content, err => {
    if (err) throw err
    console.log(`${filepath} write successful!`)
  })
}

function loadYML(ymlFilePath) {
  return yaml.safeLoad(read(ymlFilePath))
}

function isDirectory(filepath) {
  try {
    let fileStat = fs.statSync(filepath)
    return fileStat.isDirectory()
  } catch (e) {
    //
    console.error(e)
  }
  return false
}

const config = loadYML('../_config.yml')

// icon
fs.copyFileSync('favicon.png', `${distFolder}/favicon.png`)

const indexCompiler = pug.compile(read('template/index.pug'), {
  filename: 'src/template/index.pug'
})
const listCompiler = pug.compile(read('template/list.pug'), {
  filename: 'src/template/list.pug'
})

// style
const cssData = {

}
function loadCSS(filepath) {
  return read(filepath).replace(/\$\{([^}]+)\}/g, (_, name) => cssData[name] || '')
}

const styleRaw = [
  loadCSS('style/md.css')
].join('\n')

const cleanCssOptions = {}
const styleContent = new CleanCSS(cleanCssOptions).minify(styleRaw).styles

const pugData = {
  config
}

if (config.style) {
  pugData.style = styleContent
} else {
  write('md.css', styleContent)
}

pugData.content = zmd(read('../README.md'))

const indexContent = indexCompiler(pugData)

write('index.html', indexContent)
