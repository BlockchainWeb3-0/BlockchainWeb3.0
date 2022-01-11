const packagejson: string = JSON.parse(fs.readFileSync("package.json", "utf8"))
    console.log(packagejson);