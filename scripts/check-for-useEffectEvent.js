// This is a script to check for any usage of useEffectEvent in the codebase
// You can run this script with Node.js to find any instances of useEffectEvent

const fs = require("fs")
const path = require("path")

function searchFilesForUseEffectEvent(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      searchFilesForUseEffectEvent(filePath, fileList)
    } else if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".jsx") || file.endsWith(".js")) {
      const content = fs.readFileSync(filePath, "utf8")
      if (content.includes("useEffectEvent")) {
        console.log(`Found useEffectEvent in ${filePath}`)
        fileList.push(filePath)
      }
    }
  })

  return fileList
}

// Start the search from the current directory
const filesWithUseEffectEvent = searchFilesForUseEffectEvent(".")
console.log(`Found ${filesWithUseEffectEvent.length} files with useEffectEvent`)
console.log(filesWithUseEffectEvent)
