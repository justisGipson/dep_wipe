/**
 * With this we could update package.json script section
 * to include:
 *
 * "update:packages": "node depWipe.js &&
 *                     rm -rf node_modules &&
 *                     npm update --save-dev &&
 *                     npm update --save"
 *
 * This will wipe package.json, replacing all package versions
 * with an asterisk(*), removes node_modules/ and then updates
 * all deps and devDeps listed
 *
 *                PROCEED AT YOUR OWN RISK!
 *
 *
 * 888888888888888888888888888888888888888888888888888888888888
 * 888888888888888888888888888888888888888888888888888888888888
 * 8888888888888888888888888P""  ""9888888888888888888888888888
 * 8888888888888888P"88888P          988888"9888888888888888888
 * 8888888888888888  "9888            888P"  888888888888888888
 * 888888888888888888bo "9  d8o  o8b  P" od88888888888888888888
 * 888888888888888888888bob 98"  "8P dod88888888888888888888888
 * 888888888888888888888888    db    88888888888888888888888888
 * 88888888888888888888888888      8888888888888888888888888888
 * 88888888888888888888888P"9bo  odP"98888888888888888888888888
 * 88888888888888888888P" od88888888bo "98888888888888888888888
 * 888888888888888888   d88888888888888b   88888888888888888888
 * 8888888888888888888oo8888888888888888oo888888888888888888888
 * 888888888888888888888888888888888888888888888888888888888888
 *
 *
 */

const fs = require('fs')

const depWipe = () => {
  const file  = fs.readFileSync('package.json')
  const content = JSON.parse(file)

  for (let devDep in content.devDependencies) {
    if (content.devDependencies[devDep].match(/\W+\d+.\d+.\d+-?((alpha|beta|rc)?.\d+)?/g)) {
      content.devDependencies[devDep] = '*'
    }
  }

  for (let dep in content.dependencies) {
    if (content.dependencies[dep].match(/\W+\d+.\d+.\d+-?((alpha|beta|rc)?.\d+)?/g)) {
      content.dependencies[dep] = '*'
    }
  }

  fs.writeFileSync('package.json', JSON.stringify(content))
}

if (require.main === module) {
  depWipe()
} else {
  module.exports = depWipe
}
