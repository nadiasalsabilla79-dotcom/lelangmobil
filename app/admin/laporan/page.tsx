"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils/format"

const monthlyData = [
  { month: "Jan", revenue: 2500000000, auctions: 45, users: 120 },
  { month: "Feb", revenue: 3200000000, auctions: 52, users: 145 },
  { month: "Mar", revenue: 2800000000, auctions: 48, users: 160 },
  { month: "Apr", revenue: 4100000000, auctions: 65, users: 190 },
  { month: "Mei", revenue: 3800000000, auctions: 58, users: 210 },
  { month: "Jun", revenue: 4500000000, auctions: 72, users: 235 },
]

export default function AdminLaporanPage() {
  const [period, setPeriod] = useState("6months")

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0)
  const totalAuctions = monthlyData.reduce((sum, m) => sum + m.auctions, 0)
  const latestUsers = monthlyData[monthlyData.length - 1].users
  const avgRevenue = totalRevenue / monthlyData.length

  const maxRevenue = Math.max(...monthlyData.map((m) => m.revenue))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Laporan</h1>
          <p className="text-muted-foreground">Analisis performa platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Bulan Terakhir</SelectItem>
              <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
              <SelectItem value="6months">6 Bulan Terakhir</SelectItem>
              <SelectItem value="1year">1 Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
            <p className="text-sm text-success mt-2">+18.2% dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Lelang</p>
                <p className="text-2xl font-bold">{totalAuctions}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-navy/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-navy" />
              </div>
            </div>
            <p className="text-sm text-success mt-2">+12.5% dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pengguna Aktif</p>
                <p className="text-2xl font-bold">{latestUsers}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <p className="text-sm text-success mt-2">+25 pengguna baru bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata Pendapatan</p>
                <p className="text-2xl font-bold">{formatCurrency(avgRevenue)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-warning" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Per bulan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pendapatan Bulanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end justify-between gap-2">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-navy rounded-t-md transition-all hover:bg-navy-light"
                  style={{ height: `${(data.revenue / maxRevenue) * 250}px` }}
                />
                <span className="text-sm text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lelang per Bulan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-10 text-sm text-muted-foreground">{data.month}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: `${(data.auctions / 80) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm font-medium text-right">{data.auctions}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pertumbuhan Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-10 text-sm text-muted-foreground">{data.month}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(data.users / 250) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm font-medium text-right">{data.users}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Performa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Bulan</th>
                  <th className="text-right py-3 px-4 font-medium">Pendapatan</th>
                  <th className="text-right py-3 px-4 font-medium">Lelang</th>
                  <th className="text-right py-3 px-4 font-medium">Pengguna</th>
                  <th className="text-right py-3 px-4 font-medium">Avg/Lelang</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data) => (
                  <tr key={data.month} className="border-b last:border-0">
                    <td className="py-3 px-4">{data.month} 2024</td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(data.revenue)}</td>
                    <td className="py-3 px-4 text-right">{data.auctions}</td>
                    <td className="py-3 px-4 text-right">{data.users}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {formatCurrency(Math.round(data.revenue / data.auctions))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
