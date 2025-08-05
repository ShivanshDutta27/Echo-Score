import { useState } from "react";
import FlyingContent from "./FlyoutContent";

export default function FlyoutLink({children,href,flyoutContent}){
    
    const [isOpen,setIsOpen]=useState(false);
    
    const showFlyout= isOpen && flyoutContent;

    return (
      <div className="h-fit w-fit relative hover:text-pretty py-2 hover:[text-shadow:0_0_10px_rgba(255,255,255,0.2)] transition duration-200 ease-in-out " onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
          <a href={href} className="relative text-black">{children}  
          <span style={{ 
            transform: showFlyout? "scaleX(1)":"scaleX(0)",
           }} className="absolute -bottom-2 -left-1 -right-1 h-1 origin-left rounded-full bg-green-500 transition-transform duration-300 ease-out">

          </span>
          </a>
          
          {showFlyout && (<div className="absolute left-1/2 top-12 -translate-x-1/2 bg-white text-black ">
              <FlyingContent/>
              <div id="dummy " className="absolute  -top-6 left-0 right-0 h-6 bg-transparent"></div>
              <div id="triangle" className="absolute left-1/2 -top-1 h-6 w-6 -translate-x-1/2 rotate-45 bg-white"></div>
            </div>)}
              
      </div>
    )
  }

