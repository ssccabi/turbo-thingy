import * as fsp from 'fs/promises'
import * as cheerio from 'cheerio'

const obj = [{
  symbol: 'ABC',
  name: 'AmerisourceBergen Corporation Common Stock',
  lastsale: '$156.79',
  netchange: '2.30',
  pctchange: '1.489%',
  volume: '1511588',
  marketCap: '31712061297.00',
  country: 'United States',
  ipoyear: '',
  industry: 'Other Pharmaceuticals',
  sector: 'Health Care',
  url: '/market-activity/stocks/abc'
},
{
  symbol: 'ABCB',
  name: 'Ameris Bancorp Common Stock',
  lastsale: '$49.65',
  netchange: '0.72',
  pctchange: '1.471%',
  volume: '272647',
  marketCap: '3444173333.00',
  country: 'United States',
  ipoyear: '1994',
  industry: 'Major Banks',
  sector: 'Finance',
  url: '/market-activity/stocks/abcb'
},
{
  symbol: 'ABCL',
  name: 'AbCellera Biologics Inc. Common Shares',
  lastsale: '$10.81',
  netchange: '-0.16',
  pctchange: '-1.459%',
  volume: '1304003',
  marketCap: '3092745616.00',
  country: 'Canada',
  ipoyear: '2020',
  industry: 'Pharmaceuticals and Biotechnology',
  sector: 'Health Care',
  url: '/market-activity/stocks/abcl'
},
{
  symbol: 'ABCM',
  name: 'Abcam plc American Depositary Shares',
  lastsale: '$15.66',
  netchange: '1.03',
  pctchange: '7.04%',
  volume: '474977',
  marketCap: '3590398064.00',
  country: 'United Kingdom',
  ipoyear: '2020',
  industry: 'Biotechnology: Biological Products (No Diagnostic Substances)',
  sector: 'Health Care',
  url: '/market-activity/stocks/abcm'
},
{
  symbol: 'ABEO',
  name: 'Abeona Therapeutics Inc. Common Stock',
  lastsale: '$2.59',
  netchange: '-0.09',
  pctchange: '-3.358%',
  volume: '194544',
  marketCap: '44485319.00',
  country: 'United States',
  ipoyear: '',
  industry: 'Biotechnology: Pharmaceutical Preparations',
  sector: 'Health Care',
  url: '/market-activity/stocks/abeo'
},
{
  symbol: 'ABEV',
  name: 'Ambev S.A. American Depositary Shares (Each representing 1 Common Share)',
  lastsale: '$2.49',
  netchange: '-0.01',
  pctchange: '-0.40%',
  volume: '32424943',
  marketCap: '39196919381.00',
  country: '',
  ipoyear: '2013',
  industry: 'Beverages (Production/Distribution)',
  sector: 'Consumer Staples',
  url: '/market-activity/stocks/abev'
},
{
  symbol: 'ACP^A',
  name: 'abrdn Income Credit Strategies Fund 5.250% Series A Perpetual Preferred Stock',
  lastsale: '$22.915',
  netchange: '-0.315',
  pctchange: '-1.356%',
  volume: '520',
  marketCap: '',
  country: 'United States',
  ipoyear: '',
  industry: '',
  sector: '',
  url: '/market-activity/stocks/acp^a'
}]

async function getScreenerSet(filename: string) : Promise<Set<string>> {
    const table = await fsp.readFile(filename)
    console.log('fax')
    const screenerSet = new Set<string>()

    const $ = cheerio.load(table)
    
    const hrefs = $('a')
    // console.log(hrefs[12].attribs.href)
    hrefs.each((index, ref) => {
        const symbolLink = ref.attribs.href
        // console.log(symbolLink)
        if (symbolLink.lastIndexOf('/') === -1) return
        const symbol = symbolLink.slice(symbolLink.lastIndexOf('/') + 1)
        const name = ref.attribs['data-original-title']
        // console.log(symbol, name)
        screenerSet.add(symbol)
    })
    // console.log(screenerSet)
    return screenerSet
}

function screenIt(screener: Set<string>, obj: Record<string, any>[]) {
    const res = {...screener}
    const objPrep : { [key: string] : any } = {}
    obj.forEach((element: Record<string, string>) => {
      if (screener.has(element.symbol)) objPrep[element.symbol] = element
    })
    // console.log("elemvok: ", objPrep)  
      
    const screenedArray: Record<string, any>[]= []
    
    return Object.entries(objPrep)
}

async function run () {
    const screener = await getScreenerSet('./src/nasdaq.html')
    const res = screenIt(screener, obj)
    console.log(res)
    // console.log('screener: ', screener)
    // console.log('ezva', screenIt(screener, obj))
}
// run()  
export { getScreenerSet, screenIt }