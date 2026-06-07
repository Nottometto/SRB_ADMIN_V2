import AdminDashboard from '@/components/admin-dashboard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full">
      <AdminDashboard />

      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
      
    </div>
  )
}