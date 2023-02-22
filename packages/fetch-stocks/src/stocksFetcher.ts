import { curly } from "node-libcurl"
import * as fsp from "fs/promises"
import * as utils from "utils"

// const baseUrl = "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25&offset=0&download=true"
const baseUrl = "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25&offset=0&download=true"

// const curl = new Curl()

/* async function fetcher(url: string) {
    console.log("kezdek")
    let res : Record<string, string> = {}
    curl.setOpt('URL', url)
    curl.setOpt(Curl.option.HTTPHEADER, ['user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'])
    
    curl.on('end', function (statusCode, data, headers) {
        console.info(statusCode);
        console.info('---');
        const obj = JSON.parse(JSON.parse(JSON.stringify(data)).toString())
        // console.info(obj.data.rows)
        fsp.writeFile('./test.txt', JSON.stringify(obj.data))
        res = obj.data.rows
        console.info('---');
        // console.info();
        
        this.close();
      });
    curl.on('error', curl.close.bind(curl));
    curl.perform()
    // const res = await fetch('https://github.com/')
        // const txt = await res.json()
    console.log("vanitt? ", res)
    return res
}
 */

async function fetcher(url: string): Promise<Record<string, any>[]> {
    console.log("kezdek")
    // let res : Record<string, string> = {}
    const httpHeader = ['user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36']

    const res = await curly.get(url, {HTTPHEADER: httpHeader})
    console.log("vanitt? ", res.data.data.rows[0])
    return res.data.data.rows
}


// for testing
async function selfFetcher() : Promise<Record<string, any>[]> {
    const res: Record<string, string>[] = await fetcher(baseUrl)
    const resSet = new Set<string>()
    // console.log(res.data.rows)
    res.forEach((el: Record<string, string>) => {
        // console.log(el)
        resSet.add(el.symbol)
    })
    // console.log(resSet)
    const nami = utils.Screener.screenIt(resSet, res)
    console.log('evva: ', nami)
    return nami
}

export { fetcher, selfFetcher }

