import React from 'react'
import "../projectStyling/Footer.css"
import logo from "./logo.png"
import facebook from "../icons/facebook_32p.png"
import instagram from "../icons/instagram_32p.png"
import  linkedin from "../icons/linkedin_32p.png"
// import  location from "../icons/pin_24p.png"
import  phone from "../icons/phoneColor.png"
import  mail from "../icons/mailColor.png"
import { Space } from 'antd'


    // A footer is an essential part of a website that often contains important information and links.
 

function Footer() {
  return (
  <footer className='footer'>

        {/* footer child single child below div  */}
      <div className="footer-container">
         
          <div className="footer-logo">  {/* footer-container child div 1*/}
            <img src={logo} alt="my Logo" />
          </div>

          <div className="footer-links">  {/* footer-container child div 2*/}
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about us">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

        <div className="footer-contact">    {/* footer-container child div 3*/}
            <p style={{ textDecoration: "underline" }}>Contact Us:</p>
              
              <div className="contact-info">
              <Space>
                <img src={mail} alt="Email" />
                <span style={{letterSpacing:"0.1rem"}}>ahamedgulzar2001@gmail.com</span>
              </Space>
              </div>

              <div className="contact-info">
              <Space>
                <img src={phone} alt="Phone" />
                <span style={{letterSpacing:"0.1rem"}}>(+91) 9043905539</span>
              </Space>
              </div>
        </div>


        <div className="footer-social">  {/* footer-container child  div 4*/}
            <h4 style={{color:"#fff"}}>Follow Us</h4>
             <a href="www.facebook.com">
             <img src={facebook} alt="Facebook" />
             </a>

            <a href="www.instagram.com">
              <img src={instagram} alt="Instagram" />
            </a>

            <a href="www.linkedin.com">
              <img src={linkedin} alt="LinkedIn" />
            </a>
        </div>
      </div>
  </footer>
  );
}

export default Footer;
