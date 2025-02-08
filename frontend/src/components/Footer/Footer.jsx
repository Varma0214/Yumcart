import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    
        <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src="https://res.cloudinary.com/duccim6pz/image/upload/v1738751056/Yumcart_ehdwpl.png" alt = ''/>
                <p>Food supplies vital nutrients such as carbohydrates, proteins, fats, vitamins, and minerals, which support the body's growth, repair, and overall well-being.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+919784559874</li>
                    <li>contact@yumcart.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2025 © yumcart.com - All Right Reserved.</p>
    </div>




    
  )
}

export default Footer