// 爬取锤子商城的商品基本信息并存入数据库
const puppeteer = require('puppeteer')
const fs = require('fs')
const { conn } = require('../mysql/db')

const saveInfo = ( arr ) => {
    arr.map( async item => {
        conn.query("insert into products set ?", item ,function(err,data){
            if(err){  
                console.log(err)
            }else{
                console.log('数据库保存成功')
            }
        }) 
    })
}

(async () => {
    try{
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://www.smartisan.com/');
        await page.waitFor('.spu-item-normal-box');

        const results = await page.evaluate(() => {
            const dataList = Array.from(
                document.querySelectorAll('.spu-item-normal-box')
            )
            const getText = (e, selector) => {
                return e.querySelector(selector) && e.querySelector(selector).innerText
            }
            const getImg = (e, selector) => {
                return e.querySelector(selector) && e.querySelector(selector).src
            }
            const data = dataList.map(e => {
                const obj = {
                    title: getText(e, 'h3'),
                    price: getText(e, 'span').substring(1),
                    describe: getText(e, 'h5'),
                    img: getImg(e, 'img')
                }
                return obj
            })
            return data
        })

        setTimeout(()=>{
            saveInfo( results )
        },8000)

        await page.waitFor(3000);
        await browser.close();

        
    }catch(err){
        console.log(err)
    }
})()