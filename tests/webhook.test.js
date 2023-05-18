import Webhook from "../services/webhook/webhook"
import settings from "../settings"
import { expect, jest } from '@jest/globals'

describe("Webhook", () => {
    const webhook = new Webhook(settings.webhook.link)

    it("should send a webhook", async () => {
        const options = { title: "Test", message: "This is a test message from LoadWarden." }
        const sendMock = jest.spyOn(webhook, "send")

        await webhook.send(options)
        expect(sendMock).toHaveBeenCalledWith(options)
    })
})