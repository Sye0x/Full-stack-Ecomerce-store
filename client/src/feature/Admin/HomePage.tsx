import Sidebar from "../../components/admin/sidebar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-sidebar px-6">
        <Sidebar />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>

      <main className="p-6">{/* Your page content */}</main>
    </div>
  );
}
