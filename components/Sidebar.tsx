import React from 'react'
import Image from 'next/image'
import { assets } from "@/assets/assets"
import { useClerk, UserButton } from "@clerk/nextjs"
import { useAppContext } from '@/context/AppContext'
import ChatLabel from './ChatLabel'
import { useState } from 'react'

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk()
  const { user } = useAppContext()
  const [openMenu, setOpenMenu] = useState({id:0, open: false})

  return (
    <div className={`
      flex flex-col justify-between transition-all z-50 max-md:absolute max-md:h-screen
      ${expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"}
      bg-black/60 backdrop-blur-md border-r border-green-400/10
      shadow-[0_0_15px_rgba(0,255,0,0.05)] hover:shadow-[0_0_25px_rgba(0,255,0,0.2)]
      rounded-r-2xl h-full sidebar-glow
    `}>
      {/* Top Section */}
      <div className={`flex flex-col items-start ${expand ? "gap-8" : "gap-4"} p-2`}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image className={expand ? "w-36" : "w-10"} src={expand ? assets.logo_text : assets.logo_icon} alt="DeepSeek Logo" />
        </div>

        {/* Sidebar Toggle */}
        <div
          onClick={() => setExpand(!expand)}
          className={`group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300
            h-9 w-9 aspect-square rounded-lg cursor-pointer`}>
          <Image src={assets.menu_icon} alt="Menu Icon" className="md:hidden text-green-500" />
          <Image
            src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
            alt="Sidebar Toggle"
            className="hidden md:block w-7 text-green-500" />
          <div className={`absolute inset-0 rounded-full border-2 border-transparent group-hover:border-green-500
            group-hover:ring-2 group-hover:ring-green-500 group-hover:ring-opacity-60 transition-all`} />
          <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"} opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
            {expand ? "Close sidebar" : "Open sidebar"}
            <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? "left-1/2 -top-1.5 -translate-x-1/2" : "left-4 -bottom-1.5"}`}></div>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="flex flex-col gap-1">
          {expand ? (
            <>
              <button className="flex items-center justify-center cursor-pointer bg-[#49ba35] hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max">
                <Image className="w-6" src={assets.chat_icon} alt="New Chat" />
                <p className="text-black font-medium">New Chat</p>
              </button>

              {/* ✅ Recent section in its own div */}
              <div className="mt-2">
                <p className="text-white/70 text-sm px-1">Recent</p>
                <ChatLabel openMenu ={openMenu} setOpenMenu={setOpenMenu}/>
              </div>
            </>
          ) : (
            <>
              <button className="group relative flex items-center justify-center cursor-pointer mx-auto hover:bg-gray-500/30 rounded-lg h-9 w-9">
                <Image className="w-7" src={assets.chat_icon_dull} alt="New Chat" />
                <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
                  New Chat
                  <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
                </div>
              </button>

              {/* ✅ Recent section in its own div (collapsed) */}
              <div className="mt-1">
                <p className="text-white/50 text-[10px] text-center">Recent</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-6 px-2 pb-4">
        {/* QR Code Section */}
        <div className="flex flex-col items-center text-white/70 text-sm gap-2">
          <div className="relative group cursor-pointer text-center">
            <Image className="w-6" src={expand ? assets.phone_icon : assets.phone_icon_dull} alt="Phone Icon" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition">
              <div className="bg-black p-3 rounded-lg shadow-lg text-white text-xs">
                <Image src={assets.qrcode} alt="QR Code" className="w-44 mb-1" />
                <p>Scan to get HELION App</p>
              </div>
            </div>
          </div>
          {expand && (
            <div className="flex items-center gap-2">
              <span>Get App</span>
              <Image alt="Get App" src={assets.new_icon} />
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div onClick={user ? null : openSignIn} className="flex items-center gap-3 px-2 pt-2 border-t border-white/10">
          {user ? (
            <UserButton />
          ) : (
            <Image
              src={assets.profile_icon}
              width={expand ? 36 : 32}
              height={expand ? 36 : 32}
              className="rounded-full object-cover"
              alt="Profile"
            />
          )}
          {expand && <p className="text-white font-medium text-sm"></p>}
        </div>
      </div>

      {/* Glow Animation */}
      <style jsx>{`
        .sidebar-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.05);
          }
          50% {
            box-shadow: 0 0 25px rgba(0, 255, 0, 0.2);
          }
        }
      `}</style>
    </div>
  )
}

export default Sidebar
