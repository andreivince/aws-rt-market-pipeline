import axios from 'axios' // Clean, better than Fetch to be honest

const SYMBOLS = ['AAPL', 'GOOGL', 'AMZN'];

function getRandomPrice(): number {
    return +(Math.random() * 1000 + 100).toFixed(2);
}

async function sendTick() {
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    const price = getRandomPrice()
    const timestamp = Date.now()

    const payload = {
        symbol,
        price,
        timestamp
    }

    try {
        const response = await axios.post('https://a1624qsyva.execute-api.us-east-1.amazonaws.com/prod/ingest', payload)
        console.log("Sent to Ingest Lambda")
    } catch (error) {
        console.error('Failed to send tick:', error)
    }
}

// setInterval(sendTick, 1000); // every 1 second

setInterval(() => {
    for (let i = 0; i < 50; i++) {
        sendTick()
    }
}, 1000)