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

const Footer = () => {
  return (
    // The background uses a very soft cream color to match your hero section
    <footer className="bg-[#FFFDF9] border-t border-orange-100 text-[#334155]">
      
      {/* Main Footer Content */}
      <div className="footer p-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Brand Section */}
        <aside className="max-w-sm">
          <Logo width={160} />
          <p className="text-sm leading-relaxed mb-4">
            দেশের সবচেয়ে তাজা ফলমূল পৌঁছে যায় নিরাপদ ও বিশ্বস্ত উপায়ে। বাগান থেকে সরাসরি বাছাই করা ফল আপনার দরজায়।
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-orange-50 text-[#f97316] border border-orange-100 flex items-center justify-center hover:bg-[#f97316] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-orange-50 text-[#f97316] border border-orange-100 flex items-center justify-center hover:bg-[#f97316] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-orange-50 text-[#f97316] border border-orange-100 flex items-center justify-center hover:bg-[#f97316] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaInstagram size={16} />
            </a>
          </div>
        </aside>

        {/* Quick Links */}
        <nav className="flex flex-col gap-2">
          <header className="footer-title text-(--orange-mid) opacity-100 text-lg mb-2">Quick Links</header>
          <a href="#" className="link link-hover hover:text-(--orange-mid) transition-colors">Home</a>
          <a href="#" className="link link-hover hover:text-(--orange-mid) transition-colors">Shop</a>
          <a href="#" className="link link-hover hover:text-(--orange-mid) transition-colors">Reviews</a>
          <a href="#" className="link link-hover hover:text-(--orange-mid) transition-colors">Track Order</a>
        </nav>

        {/* Categories */}
        <nav className="flex flex-col gap-2">
          <header className="footer-title text-(--green-deep) opacity-100 text-lg mb-2">Categories</header>
          <a href="#" className="link link-hover hover:text-(--green-deep) transition-colors">রাজশাহীর আম (Mango)</a>
          <a href="#" className="link link-hover hover:text-(--green-deep) transition-colors">তাজা আপেল (Apple)</a>
          <a href="#" className="link link-hover hover:text-(--green-deep) transition-colors">আনারস (Pineapple)</a>
          <a href="#" className="link link-hover hover:text-(--green-deep) transition-colors">আঙ্গুর (Grapes)</a>
        </nav>

        {/* Contact Info */}
        <nav className="flex flex-col gap-3">
          <header className="footer-title text-(--orange-mid) opacity-100 text-lg mb-1">Contact Us</header>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 text-(--green-deep) text-lg shrink-0" />
            <p className="text-sm">Folmondi Head Office,<br />Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-(--green-deep) shrink-0" />
            <p className="text-sm">+880 1234 567 890</p>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-(--green-deep) shrink-0" />
            <p className="text-sm">support@folmondi.com</p>
          </div>
        </nav>
      </div>

      {/* Bottom Footer / Copyright Bar */}
      <div className="bg-[#FFF8F0] border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-10 py-5 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Folmondi.com. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-(--orange-mid) transition-colors font-medium">Terms & Conditions</a>
            <a href="#" className="hover:text-(--orange-mid) transition-colors font-medium">Privacy Policy</a>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;