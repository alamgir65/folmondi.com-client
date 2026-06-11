import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope 
} from "react-icons/fa";
import Logo from "../logo/Logo";
import "./Footer.css";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="text-white bg-black">
      
      {/* Main Footer Content */}
      <div className="footer p-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Brand Section */}
        <aside className="max-w-sm">
          {/* Logo — pass a light/white variant if your Logo supports it */}
          <Link to={'/'}><Logo width={160} footer={true} /></Link>
          <p className="text-sm leading-relaxed mb-4">
            দেশের সবচেয়ে তাজা ফলমূল পৌঁছে যায় নিরাপদ ও বিশ্বস্ত উপায়ে। বাগান থেকে সরাসরি বাছাই করা ফল আপনার দরজায়।
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.facebook.com/Folmondifruits"
              target="_blank"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                background: "rgba(255,255,255,0.15)",
                // color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.30)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                background: "rgba(255,255,255,0.15)",
                // color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.30)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                background: "rgba(255,255,255,0.15)",
                // color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.30)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </aside>

        {/* Quick Links */}
        <nav className="flex flex-col gap-2">
          <header className="footer-title text-white opacity-100 text-lg mb-2">Quick Links</header>
          <Link to={'/'} className="link link-hover text-white transition-colors">Home</Link>
          <Link to={'/shop'} className="link link-hover text-white transition-colors">Shop</Link>
          <Link to={'/reviews'} className="link link-hover text-white transition-colors">Reviews</Link>
          <Link to={'/order-track'} className="link link-hover text-white transition-colors">Track Order</Link>
        </nav>

        {/* Information */}
        <nav className="flex flex-col gap-2">
           <header className="footer-title text-white opacity-100 text-lg mb-2">Information</header>
          {/*<a href="#" className="link link-hover text-white transition-colors">রাজশাহীর আম (Mango)</a>
          <a href="#" className="link link-hover text-white transition-colors">তাজা আপেল (Apple)</a>
          <a href="#" className="link link-hover text-white transition-colors">আনারস (Pineapple)</a>
          <a href="#" className="link link-hover text-white transition-colors">আঙ্গুর (Grapes)</a> */}
          <Link to={'/about-us'}>About Us</Link>
          <Link to={'/privacy-policy'}>Privacy Policy</Link>
          <Link to={'/terms-conditions'}>Terms & Conditions</Link>
        </nav>

        {/* Contact Info */}
        <nav className="flex flex-col gap-3">
          <header className="footer-title text-white opacity-100 text-lg mb-1">Contact Us</header>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1  text-lg shrink-0" />
            <p className="text-sm ">Folmondi Head Office,<br />Agrabad, Chittagong</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className=" shrink-0" />
            <p className="text-sm ">+8801629-040900</p>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className=" shrink-0" />
            <p className="text-sm ">pholmondi.comofficial@gmail.com</p>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div style={{ backgroundColor: "rgba(0,0,0,0.15)", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <div className="max-w-7xl mx-auto px-10 py-5 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Pholmondi.com. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link to={'/terms-conditions'} className="text-white transition-colors font-medium">Terms & Conditions</Link>
            <Link to={'/privacy-policy'} className="text-white transition-colors font-medium">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ backgroundColor: "rgba(0,0,0,0.15)", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <div className="max-w-7xl mx-auto px-10 py-3 flex justify-center items-center text-sm">
          <p><span className="font-thin">Developed by</span> : <a className="hover:text-(--orange-hot) font-bold" target="_blank" href={'https://alamgir65.vercel.app/'}>Alamgir Hossain (Software Engineer)</a></p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;