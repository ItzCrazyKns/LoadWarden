import pm2 from 'pm2'

pm2.list((err, data) => {
    if (err) throw new Error(err)
    const lwproc = data.filter(proc => proc.name === "LoadWarden")[0]
    if (!lwproc || lwproc.pid === 0) {
        pm2.start({ name: "LoadWarden", script: "index.js" }, (err, data) => {
            if (err) throw new Error("An error has occured file trying to start LoadWarden, " + err)
            console.log("LoadWarden has been successfuly started.")
            console.log('Enjoying LoadWarden? Give us a star on Github!')
            return process.exit()
        })
    } else {
        console.log("LoadWarden is already running.")
        process.exit()
    }
})