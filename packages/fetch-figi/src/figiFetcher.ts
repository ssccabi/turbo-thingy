import fetch from "node-fetch"
import { request } from 'http'
import { curly } from "node-libcurl"

const baseUrl = 'https://api.openfigi.com/v3/search'

async function figiFetcher1(ticker: string, exch: string) {

    const initFigi = {
        method: 'POST',
        
        /* body: JSON.stringify([
            {
                'idType': 'ID_WERTPAPIER',
                'idValue': '851399',
                'exchCode': 'US'
            }
        ]), */
        data: JSON.stringify({
            "query": ticker,
            // "idType":"ID_EXCH_SYMBOL",
            // "idValue": ticker,
            "exchCode": exch
        }),
        headers: {
            'Content-Type': 'application/json'
            }
    }
        
    console.log('bennvok, ticker: ', ticker, 'exch: ', exch)

    // const res1 = request()
    const res = await fetch(baseUrl, initFigi)
    // const js = await res.json()
    console.log('ezjön: ', res)
    return res
}

async function figiFetcher(ticker: string, exch: string) {

    const initFigi = {
        // method: 'POST',
        
        /* body: JSON.stringify([
            {
                'idType': 'ID_WERTPAPIER',
                'idValue': '851399',
                'exchCode': 'US'
            }
        ]), */
        /* POSTFIELDS: JSON.stringify({
            query: ticker,
            // "idType":"ID_EXCH_SYMBOL",
            // "idValue": ticker,
            exchCode: exch
        }), */
        POSTFIELDS: [{"query": "IBM"}],
        HTTPHEADER: ['Content-Type: application/json']
            
    }
        
    console.log('bennvok: ', initFigi)

    // const res1 = request()
    const { data } = await curly.post(baseUrl, {POSTFIELDS: JSON.stringify({"query": 'IBM', "exchCode": "US"}), HTTPHEADER: ['Content-Type: application/json']})
    // const js = await res.json()
    console.log('ezjön: ', data)
    return data
}


export { figiFetcher }

