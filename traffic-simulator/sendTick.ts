import axios from 'axios'

const INGEST_ENDPOINT = process.env.INGEST_ENDPOINT
if (!INGEST_ENDPOINT) {
    throw new Error('INGEST_ENDPOINT environment variable not set')
}

const SYMBOLS = ['AAPL', 'GOOGL', 'AMZN']

function getRandomPrice(): number {
    return +(Math.random() * 1000 + 100).toFixed(2)
}

async function sendTick() {
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    const price = getRandomPrice()
    const timestamp = Date.now()

    const payload = { symbol, price, timestamp }

    try {
        await axios.post(INGEST_ENDPOINT, payload)
        console.log('Sent to Ingest Lambda')
    } catch (error) {
        console.error('Failed to send tick:', error)
    }
}

setInterval(() => {
    for (let i = 0; i < 50; i++) {
        sendTick()
    }
}, 1000)
