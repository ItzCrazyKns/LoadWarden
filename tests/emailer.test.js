import Emailer from "../services/email/emailer"
import settings from "../settings"
import { expect, jest } from '@jest/globals'

describe("Emailer", () => {
  const emailer = new Emailer(settings.emailer.host, settings.emailer.port, settings.emailer.auth)

  it("should send an email", async () => {
    const recipient = settings.admin.email
    const from = settings.emailer.from
    const subject = "Test"
    const body = "This is a test message from LoadWarden."

    const sendMock = jest.spyOn(emailer, "send")

    await emailer.send(recipient, subject, body, from)

    expect(sendMock).toHaveBeenCalledWith(recipient, subject, body, from)
  })
})