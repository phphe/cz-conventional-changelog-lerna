
const child_process = require("child_process");
const spawnSync = child_process.spawnSync;
const execSync = child_process.execSync;
const os = require('os')
const path = require('path')

const isWin = os.platform() === 'win32'
const npx = 'npx' + (isWin ? '.cmd' : '')

module.exports = {
  genQuesion() {
    // get packages
    let output = spawnSync(npx, [
      "lerna",
      "list",
      "--json",
      "--all",
    ]).output.toString();
    const m = output.match(/\[.*\]/s);
    const packages = JSON.parse(m[0])
    // e.g.
    /*
    [
      {
        "name": "footer",
        "version": "0.1.0",
        "private": false,
        "location": "your\\packages\\footer"
      },
      {
        "name": "header",
        "version": "0.1.0",
        "private": false,
        "location": "your\\packages\\header"
      },
      {
        "name": "remixapp",
        "version": "0.4.0",
        "private": false,
        "location": "your\\packages\\remixapp"
      },
      {
        "name": "testname",
        "version": "0.4.0",
        "private": false,
        "location": "your\\packages\\test"
      }
    ]
    */
    // get changed files
    let changedFiles = execSync("git diff --cached --name-only")
      .toString()
      .split("\n")
      .filter((v) => v)
      .map(path.normalize);
    // resolve changed packages
    const changedPackages = []
    packages.forEach((package => {
      const packagePathWithSep = path.relative('.', package.location) + path.sep;
      changedFiles.forEach((file) => {
        if (file.indexOf(packagePathWithSep) === 0) {
          if (changedPackages.indexOf(package) === -1) {
            changedPackages.push(package)
          }
        }
      })
    }))
    // 
    const choices = packages.map(v => ({ name: v.name, value: v.name }))
    const selected = changedPackages.map(v => v.name)
    return {
      type: 'checkbox',
      name: 'affects',
      message: "Select affected packages:\n",
      choices: choices,
      default: selected
    }
  }
}
