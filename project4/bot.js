require("dotenv").config()

const m = require("masto")

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN 
})

async function getPoem(){
    let response = await fetch("https://poetrydb.org/random")
    let jsonResponse = await response.json()
    
    return jsonResponse.length > 0 ? jsonResponse[0] : null
}

async function formatPoem(poem){
    if (poem) {
        let title = poem.title
        let author = poem.author
        let lines = poem.lines.slice(0, 5).join("\n")

        return `📜 *${title}* by ${author}\n\n${lines}...`
    }
    return null
}

async function postPoem(){
    let poem = await getPoem()
    let poemText = await formatPoem(poem)

    if (poemText) {
        const status = await masto.v1.statuses.create({
            status: poemText,
            visibility: "public"
        })
        console.log("Posted:", status.url)
    }
}

setInterval(postPoem, 60 * 60 * 1000)
postPoem()
