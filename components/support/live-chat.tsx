"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const quickReplies = [
    "Cara mengikuti lelang?",
    "Proses deposit saldo?", 
    "Status verifikasi KYC?",
    "Jadwal lelang hari ini?"
  ]

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-success hover:bg-success/90 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      <div className={cn(
        "fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-40 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="bg-navy text-white p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Customer Support</h3>
              <p className="text-sm opacity-90">Online - Siap membantu Anda</p>
            </div>
          </div>
        </div>

        <div className="h-64 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">Customer Support</p>
              <p className="text-sm">Halo! Selamat datang di LelangMobil. Ada yang bisa kami bantu?</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Pertanyaan umum:</p>
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(reply)}
                  className="block w-full text-left p-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
            <Button size="sm" className="bg-navy hover:bg-navy/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <a 
              href="https://wa.me/6281234567890"
              className="flex-1 flex items-center justify-center gap-2 p-2 text-xs bg-success text-white rounded hover:bg-success/90 transition-colors"
            >
              <Phone className="h-3 w-3" />
              WhatsApp
            </a>
            <a 
              href="mailto:support@lelangmobil.com"
              className="flex-1 flex items-center justify-center gap-2 p-2 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <Mail className="h-3 w-3" />
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  )
}