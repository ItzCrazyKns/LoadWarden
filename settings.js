export default {
    // The time interval after which the ServerStatus will be run again.
    interval: 5000,
    admin: {
        // All the emails regarding alerts will be sent to this email.
        email: "someone@example.com"
    },
    webhook: {
        // Link of the webhook.
        link: '',
    },
    emailer: {
        // SMTP.
        host: '',
        port: 587,
        auth: { user: '', pass: '' },
        from: "someone@example.com"
    },
    // Dont change this if you dont know what you are doing.
    cpuThreshold: 80,
    memoryThreshold: 90
}