"use client"

import type React from "react"

import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, Gift, Gavel, Wallet, Check, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNotificationStore } from "@/lib/store"
import { dummyNotifications } from "@/lib/dummy-data"
import { formatDateTime } from "@/lib/utils/format"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  KYC_APPROVED: CheckCircle,
  KYC_REJECTED: AlertCircle,
  DEPOSIT_APPROVED: Wallet,
  DEPOSIT_REJECTED: AlertCircle,
  WITHDRAW_COMPLETED: Wallet,
  OUTBID: Gavel,
  AUCTION_WON: Gift,
  AUCTION_STARTED: Bell,
  BONUS_RECEIVED: Gift,
}

const colorMap: Record<string, string> = {
  KYC_APPROVED: "text-success",
  KYC_REJECTED: "text-destructive",
  DEPOSIT_APPROVED: "text-success",
  DEPOSIT_REJECTED: "text-destructive",
  WITHDRAW_COMPLETED: "text-success",
  OUTBID: "text-warning",
  AUCTION_WON: "text-gold",
  AUCTION_STARTED: "text-navy",
  BONUS_RECEIVED: "text-gold",
}

export default function NotifikasiPage() {
  const [notifications, setNotifications] = useState(dummyNotifications)
  const { markAsRead, markAllAsRead } = useNotificationStore()

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    markAsRead(id)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
    markAllAsRead()
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0 divide-y">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium">Tidak ada notifikasi</p>
              <p className="text-sm text-muted-foreground">Notifikasi baru akan muncul di sini</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = iconMap[notification.type] || Bell
              const iconColor = colorMap[notification.type] || "text-muted-foreground"

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors",
                    !notification.isRead && "bg-navy/5",
                  )}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0",
                      iconColor,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDateTime(notification.createdAt)}</p>
                      </div>
                      {!notification.isRead && <Badge className="shrink-0 bg-navy">Baru</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="Tandai dibaca"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(notification.id)} title="Hapus">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
