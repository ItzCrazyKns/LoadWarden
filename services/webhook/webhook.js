import fetch from 'node-fetch'

export default class Webhook {
  constructor(url) {
    this.url = url
  }

  async send(options) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'LoadWarden',
          avatar_url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d125df43-37f9-4450-a601-50d3aa7fa501/df6yjes-8f982d68-8e36-437e-b1ea-63f0baaa45e1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxMjVkZjQzLTM3ZjktNDQ1MC1hNjAxLTUwZDNhYTdmYTUwMVwvZGY2eWplcy04Zjk4MmQ2OC04ZTM2LTQzN2UtYjFlYS02M2YwYmFhYTQ1ZTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.crIrTgCFoAfzgBUSt1E2tj1nKlzIROKMWwkdLARlGO0',
          embeds: [
            {
              author: {
                name: options.author,
                icon_url: options.author_avator
              },
              color: options.color,
              title: options.title,
              description: options.message,
              fields: options.fields,
              footer: {
                text: 'Powered by LoadWarden™️',
                icon_url:
                  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d125df43-37f9-4450-a601-50d3aa7fa501/df6yjes-8f982d68-8e36-437e-b1ea-63f0baaa45e1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxMjVkZjQzLTM3ZjktNDQ1MC1hNjAxLTUwZDNhYTdmYTUwMVwvZGY2eWplcy04Zjk4MmQ2OC04ZTM2LTQzN2UtYjFlYS02M2YwYmFhYTQ1ZTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.crIrTgCFoAfzgBUSt1E2tj1nKlzIROKMWwkdLARlGO0',
              },
              timestamp: new Date(Date.now())
            },
          ],
        }),
      })
      return (await response.status)
    } catch (error) {
      console.error(`Error sending webhook: ${error}`)
    }
  }
}