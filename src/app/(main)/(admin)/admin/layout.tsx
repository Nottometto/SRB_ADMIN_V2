import AdminDashboard from '@/components/(adminPage)/admin-dashboard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <AdminDashboard />

      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
    </div>
  )
}