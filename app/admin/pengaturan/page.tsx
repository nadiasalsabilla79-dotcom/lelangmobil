"use client"

import { useState } from "react"
import { Save, Building, CreditCard, Bell, Shield, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AdminPengaturanPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "lelangmobil.com",
    siteDescription: "Platform lelang kendaraan terpercaya di Indonesia",
    contactEmail: "support@lelangmobil.com",
    contactPhone: "021-12345678",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    welcomeBonus: 1000000,
    minimumDeposit: 1000000,
    minimumWithdraw: 100000,
    depositFee: 0,
    withdrawFee: 5000,
    bidHoldPercentage: 10,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    newUserRegistration: true,
  })

  const handleSave = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Perubahan pengaturan berhasil disimpan",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground">Konfigurasi platform lelang</p>
        </div>
        <Button className="bg-navy hover:bg-navy-light" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Simpan Perubahan
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Building className="mr-2 h-4 w-4" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="financial">
            <CreditCard className="mr-2 h-4 w-4" />
            Keuangan
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="customization">
            <Palette className="mr-2 h-4 w-4" />
            Customization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>Informasi dasar platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Situs</Label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Kontak</Label>
                  <Input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Situs</Label>
                <Textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telepon Kontak</Label>
                  <Input
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alamat</Label>
                  <Input
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keuangan</CardTitle>
              <CardDescription>Konfigurasi bonus, deposit, dan withdraw</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bonus Selamat Datang (Rp)</Label>
                  <Input
                    type="number"
                    value={settings.welcomeBonus}
                    onChange={(e) => setSettings({ ...settings, welcomeBonus: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground">Diberikan setelah KYC disetujui</p>
                </div>
                <div className="space-y-2">
                  <Label>Persentase Hold Bid (%)</Label>
                  <Input
                    type="number"
                    value={settings.bidHoldPercentage}
                    onChange={(e) => setSettings({ ...settings, bidHoldPercentage: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground">Saldo yang ditahan saat melakukan bid</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Deposit (Rp)</Label>
                  <Input
                    type="number"
                    value={settings.minimumDeposit}
                    onChange={(e) => setSettings({ ...settings, minimumDeposit: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Biaya Deposit (Rp)</Label>
                  <Input
                    type="number"
                    value={settings.depositFee}
                    onChange={(e) => setSettings({ ...settings, depositFee: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Withdraw (Rp)</Label>
                  <Input
                    type="number"
                    value={settings.minimumWithdraw}
                    onChange={(e) => setSettings({ ...settings, minimumWithdraw: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Biaya Withdraw (Rp)</Label>
                  <Input
                    type="number"
                    value={settings.withdrawFee}
                    onChange={(e) => setSettings({ ...settings, withdrawFee: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Konfigurasi sistem notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifikasi Email</p>
                  <p className="text-sm text-muted-foreground">Kirim notifikasi via email kepada pengguna</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifikasi SMS</p>
                  <p className="text-sm text-muted-foreground">Kirim notifikasi via SMS kepada pengguna</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>Konfigurasi keamanan platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mode Maintenance</p>
                  <p className="text-sm text-muted-foreground">Nonaktifkan akses publik untuk maintenance</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registrasi User Baru</p>
                  <p className="text-sm text-muted-foreground">Izinkan pendaftaran pengguna baru</p>
                </div>
                <Switch
                  checked={settings.newUserRegistration}
                  onCheckedChange={(checked) => setSettings({ ...settings, newUserRegistration: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme & Colors</CardTitle>
                <CardDescription>Kustomisasi warna dan tema website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" value="#1e3a8a" className="w-16 h-10 p-1" />
                      <Input value="#1e3a8a" placeholder="#1e3a8a" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" value="#f59e0b" className="w-16 h-10 p-1" />
                      <Input value="#f59e0b" placeholder="#f59e0b" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Kustomisasi bagian hero homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Hero Title</Label>
                  <Input value="Platform Lelang Mobil Terpercaya" />
                </div>
                <div className="space-y-2">
                  <Label>Hero Subtitle</Label>
                  <Textarea value="Dapatkan mobil impian dengan harga terbaik" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Hero Banner</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Upload banner image" />
                    <Button>Upload</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promo Banner</CardTitle>
                <CardDescription>Banner promosi di bagian atas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Promo Banner</p>
                    <p className="text-sm text-muted-foreground">Tampilkan banner promosi</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Banner Text</Label>
                  <Input value="🎉 Bonus Rp 1.000.000 untuk member baru yang verifikasi KYC!" />
                </div>
                <div className="space-y-2">
                  <Label>Banner Color</Label>
                  <div className="flex gap-2">
                    <Input type="color" value="#10b981" className="w-16 h-10 p-1" />
                    <Input value="#10b981" placeholder="#10b981" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>Upload logo dan atur branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Site Logo</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Upload logo" />
                      <Button>Upload</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input value="LelangMobil" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
