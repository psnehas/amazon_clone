import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img className='home__image' 
                src="https://www.hwupgrade.it/i/n/WatchPartyAmazon_720.jpg"  alt="background"/>
            
                <div className='home__row'>
                    <Product id="01"
                    title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
                    price={29.99}
                    image="https://388760.smushcdn.com/1732391/wp-content/uploads/2013/01/The-Lean-Startup-Ed-Capaldi-681x1024.jpg?lossy=0&strip=1&webp=1"
                    rating={5}
                    />
                    
                    <Product id = "02" title="Amazon Fire TV Stick Lite with Alexa Voice Remote Lite (no TV controls) | 2020 Release" 
                    price={38.99} 
                    image="https://images-na.ssl-images-amazon.com/images/I/51CgKGfMelL._AC_UL320_SR320,320_.jpg" 
                    rating={4} />

                </div>
                <div className='home__row'>
                <Product id="03"
                    title="Amazon - Echo Dot (3rd Gen) - Smart Speaker with Alexa - Charcoal"
                    price={79.00}
                    image="https://rateit.ridc.org.uk/wp-content/uploads/2018/06/FS-ra-125x85._CB515626475_.png"
                    rating={5}
                    />
                    
                    <Product id = "04" title="Kindle - Now with a Built-in Front Light - Black - Ad-Supported (2019 release, 10th Gen)" 
                    price={127.99} 
                    image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1582063280-amazon-fire-7-tablet-1582063273.jpg?crop=1xw:1xh;center,top&resize=480:*" 
                    rating={4} />
                    
                </div>
                <div className='home__row'>
                <Product id="05"
                    title="Hisense Serie H4 LED Roku Smart TV de 32 pulgadas con compatibilidad Alexa (32H4F, modelo 2020)"
                    price={299.99}
                    image="https://5.imimg.com/data5/RP/XT/ZG/ANDROID-53147528/samsung-smart-tv-32-inches-led-hd-ready-ua32j4003-jpg-500x500.jpg"
                    rating={5}
                    />
                    
                </div>
            </div>
        </div>
    )
}

export default Home
