"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, ShieldCheck, Wallet, Car, Gavel, ChevronRight, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuthStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/kyc", label: "KYC Manager", icon: ShieldCheck },
  { href: "/admin/keuangan", label: "Keuangan", icon: Wallet },
  { href: "/admin/kendaraan", label: "Kendaraan", icon: Car },
  { href: "/admin/lelang", label: "Lelang", icon: Gavel },
  { href: "/admin/pengguna", label: "Pengguna", icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "ADMIN") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-navy font-bold text-lg">
            L
          </div>
          <span className="font-serif text-xl font-bold text-white">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-white text-navy" : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="mb-3 p-3 rounded-lg bg-white/10">
          <p className="font-medium text-white text-sm">{user?.name}</p>
          <p className="text-xs text-white/70">{user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/30 text-navy-dark bg-white hover:bg-white/90"
            >
              Ke Website
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-navy shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-navy h-14 flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-navy font-bold">L</div>
          <span className="font-serif text-lg font-bold text-white">Admin</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-navy border-navy">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:p-8 p-4 pt-18 lg:pt-8">{children}</main>
    </div>
  )
}
