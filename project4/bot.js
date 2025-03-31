require("dotenv").config()
const m = require("masto")

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN
})

async function getRandomPoem() {
    try {
        let response = await fetch("https://poetrydb.org/random")
        let jsonResponse = await response.json()

        if (jsonResponse.length > 0) {
            let poem = jsonResponse[0]
            let title = poem.title
            let author = poem.author
            let lines = poem.lines.slice(0, 5).join("\n")

            return `📜 *${title}* by ${author}\n\n${lines}...`
        }
    } catch (err) {
        console.error("Error fetching poem:", err)
        return null
    }
}

async function postPoemToMastodon() {
    let poemText = await getRandomPoem()

    if (poemText) {
        const status = await masto.v1.statuses.create({
            status: poemText,
            visibility: "public"
        })

        console.log("Posted:", status.url)
    }
}

// Run every 1hr
setInterval(postPoemToMastodon, 60 * 60 * 1000)

// Initial post on start
postPoemToMastodon()
