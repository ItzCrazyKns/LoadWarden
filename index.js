"use strict"

console.log(`
██╗      ██████╗  █████╗ ██████╗  ██╗    ██╗ █████╗ ██████╗ ██████╗ ███████╗███╗   ██╗™️
██║     ██╔═══██╗██╔══██╗██╔══██╗ ██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝████╗  ██║
██║     ██║   ██║███████║██║  ██║ ██║ █╗ ██║███████║██████╔╝██║  ██║█████╗  ██╔██╗ ██║
██║     ██║   ██║██╔══██║██║  ██║ ██║███╗██║██╔══██║██╔══██╗██║  ██║██╔══╝  ██║╚██╗██║
███████╗╚██████╔╝██║  ██║██████╔╝ ╚███╔███╔╝██║  ██║██║  ██║██████╔╝███████╗██║ ╚████║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═══╝
`)
console.log("Loading dependecies this might take a while.")
import os from "node:os"
import settings from "./settings.js"
/* import Emailer from "./services/email/emailer.js" */
import Webhook from "./services/webhook/webhook.js"
import bytesToHuman from "./helpers/bytesToHuman.js"
console.log("Loaded Dependencies")

const cpuThreshold = settings.cpuThreshold
const memoryThreshold = settings.memoryThreshold

// Will be added in the future versions.
/* const emailer = new Emailer(settings.emailer.host, settings.emailer.port, settings.emailer.auth) */
const webhook = new Webhook(settings.webhook.link)

class ServerMonitor {
  constructor(interval) {
    this.interval = setInterval(() => {
      this.checkServerStatus()
    }, interval)
  }

  checkServerStatus() {
    const cpuUsage = this.getCPUUsage()
    const memoryUsage = (1 - os.freemem() / os.totalmem()) * 100
    const memoryUsageRaw = os.totalmem() - os.freemem()
    console.log(memoryUsage, cpuUsage)

    if (this.cpuwebhooksent && cpuUsage < cpuThreshold) {
      this.cpuwebhooksent = false
      this.changeIntervalTime(settings.interval)
      webhook.send({
        title: "System back to normal",
        color: 5763719,
        message: "The system's CPU usage has returned to normal levels i.e " + `${Math.floor(cpuUsage)}%` + ". No further action is required at this time. We have decreased the heartbeat check time back to normal levels i.e " + settings.interval + "ms."
      })
    }
    if (cpuUsage > cpuThreshold) {
      console.log(`CPU usage is ${cpuUsage}%, which is above the threshold of ${cpuThreshold}%`)
      if (!this.cpuwebhooksent) {
        webhook.send({
          author: "Warning!",
          author_avator: "https://images-ext-1.discordapp.net/external/0UGT44lJm2PYV1ds1_T5NEpXDtv92P9LbwmAApvY0vU/https/png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-alert-icon-png-image_1025805.jpg",
          title: "System overload detected",
          color: 15548997,
          message: `The system's CPU usage has exceeded the threshold of ${cpuThreshold}%, and is currently at ${Math.floor(cpuUsage)}%. Please take immediate action to prevent node crashes. We have increased the heartbeat check time 15 seconds to prevent crashes.`,
          fields: [{
            "name": "Specs",
            "value": `Ram: ${bytesToHuman(os.totalmem())}\nCPU: 100%`,
            "inline": true
          },
          {
            "name": "Current Usage",
            "value": `Ram: ${bytesToHuman(memoryUsageRaw)}\nCPU: ${this.getCPUUsage() === 0 ? 0 : Math.floor(cpuUsage)}%`,
            "inline": true
          }]
        })
        this.cpuwebhooksent = true
      }
      this.changeIntervalTime(15000)
    }

    if (this.memorywebhooksent && memoryUsage < memoryThreshold) {
      this.memorywebhooksent = false
      this.changeIntervalTime(settings.interval)
      webhook.send({
        title: "System back to normal",
        color: 5763719,
        message: "The system's memory usage has returned to normal levels i.e " + `${Math.floor(memoryUsage)}%` + ". No further action is required at this time. We have decreased the heartbeat check time back to normal levels i.e " + settings.interval + "ms."
      })
    }

    if (memoryUsage > memoryThreshold) {
      console.log(`Memory usage is ${Math.floor(memoryUsage)}%, which is above the threshold of ${memoryThreshold}%`)
      if (!this.memorywebhooksent) {
        webhook.send({
          author: "Warning!",
          author_avator: "https://images-ext-1.discordapp.net/external/0UGT44lJm2PYV1ds1_T5NEpXDtv92P9LbwmAApvY0vU/https/png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-alert-icon-png-image_1025805.jpg", 
          title: "System overload detected",
          color: 15548997,
          message: `The system's memory usage has exceeded the threshold of ${memoryThreshold}%, and is currently at ${Math.floor(memoryUsage)}%. Please take immediate action to prevent node crashes. We have increased the heartbeat check time 15 seconds to prevent crashes.`,
          fields: [{
            "name": "Specs",
            "value": `Ram: ${bytesToHuman(os.totalmem())}\nCPU: 100%`,
            "inline": true
          },
          {
            "name": "Current Usage",
            "value": `Ram: ${bytesToHuman(memoryUsageRaw)}\nCPU: ${cpuUsage === 0 ? 0 : Math.floor(cpuUsage)}%`,
            "inline": true
          }]
        })
        this.memorywebhooksent = true
      }
      this.changeIntervalTime(15000)
    }
  }

  getCPUUsage() {
    // Might not correctly work on windows.
    if (os.platform() === 'win32') {
      const cpus = os.cpus()
      const numCPUs = cpus.length

      let totalIdle = 0
      let totalTick = 0
      for (let i = 0; i < numCPUs; i++) {
        const cpu = cpus[i]
        for (let type in cpu.times) {
          totalTick += cpu.times[type]
        }
        totalIdle += cpu.times.idle
      }

      if (this.previousCPUInfo) {
        const idleDifference = totalIdle - this.previousCPUInfo.totalIdle
        const tickDifference = totalTick - this.previousCPUInfo.totalTick
        const totalDifference = tickDifference * numCPUs
        const cpuUsage = (1 - idleDifference / totalDifference) * 100
        const clampedCPUUsage = Math.max(0, Math.min(100, cpuUsage))
        this.previousCPUInfo = { totalIdle, totalTick }
        return clampedCPUUsage
      } else {
        this.previousCPUInfo = { totalIdle, totalTick }
        return 0
      }
    } else {
      const load = os.loadavg()[0]
      const numCPUs = os.cpus().length
      const totalLoad = (load / numCPUs) * 100
      const clampedTotalLoad = Math.max(0, Math.min(100, totalLoad))
      return clampedTotalLoad
    }
  }

  changeIntervalTime(newInterval) {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.checkServerStatus()
    }, newInterval)
  }

  getServerStatus() {
    const cpuUsage = this.getCPUUsage()
    const memoryUsage = (1 - os.freemem() / os.totalmem()) * 100
    return { cpuUsage, memoryUsage }
  }
}

new ServerMonitor(settings.interval)