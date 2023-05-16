import pm2 from 'pm2'

pm2.list((err, data) => {
    if (err) throw new Error(err)
    const lwproc = data.filter(proc => proc.name === "LoadWarden")[0]
    if (!lwproc || lwproc.pid === 0) {
        console.log("LoadWarden is not running. In order to stop it, it must be running.")
        process.exit()
    } else {
        pm2.stop(lwproc.pm_id, (err, data) => {
            if (err) throw new Error("An error as been occured while trying to stop LoadWarden, " + err)
            console.log("LoadWarden has been successfuly stopped.")
            process.exit()
        })
    }
})