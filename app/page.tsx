"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from "@/assets/assets"
import Sidebar from "@/components/Sidebar"
import PromptBox from '@/components/PromptBox'
import Message from '@/components/Message'

const Home = () => {
  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="bg-black h-screen">
      <div className='flex h-full'>
        <Sidebar expand={expand} setExpand={setExpand} />

        <div className="flex-1 flex flex-col px-4 pb-6 pt-8 bg-black text-white relative">

          {/* Mobile Top Icons */}
          <div className='md:hidden absolute top-6 px-4 w-full flex items-center justify-between'>
            <Image
              onClick={() => setExpand(!expand)}
              className="rotate-180 cursor-pointer"
              src={assets.menu_icon}
              alt="Menu"
            />
            <Image
              className="opacity-70"
              src={assets.chat_icon}
              alt="Chat"
            />
          </div>

          {/* Centered welcome + PromptBox */}
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              <Image
                src={assets.logo_icon}
                alt="Logo"
                className='w-16 h-16 object-contain'
              />
              <p className="text-2xl font-medium">Hey, I'm HELION</p>
              <p className='text-sm text-gray-400'>Let’s make today easier – how can I assist?</p>

              {/* Centered PromptBox */}
              <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
          ) : (
            <>
              {/* Chat messages (future use) */}
              <div>
                <Message role="user" content="What is next js "/>
              </div>

              {/* PromptBox at bottom when messages exist */}
              <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
            </>
          )}

          {/* Footer */}
          <p className='text-xs text-gray-500 text-center mt-2'>Unleash the power of Generative AI with Helion-1</p>
        </div>
      </div>
    </div>
  )
}

export default Home
