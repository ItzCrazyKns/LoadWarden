import pm2 from 'pm2'

pm2.list((err, data) => {
    if (err) throw new Error(err)
    const lwproc = data.filter(proc => proc.name === "LoadWarden")[0]
    if (lwproc && lwproc.pid !== 0) {
        pm2.restart(lwproc.pm_id)
        console.log("LoadWarden has been restarted.")
        console.log('Enjoying LoadWarden? Give us a star on Github!')
        process.exit()
    } else {
        console.log("LoadWarden is not running. In order to restart it, it must be running.")
        process.exit()
    }
})