import { Logs, Menu, ShoppingCart, Tag, X, LogOut } from "lucide-react";
import { useState } from "react";
export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Category", icon: Tag },
    { name: "Product", icon: ShoppingCart },
    { name: "Orders", icon: Logs },
  ];

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="cursor-pointer rounded-md p-2 hover:scale-101"
      >
        <Menu size={28} />
      </button>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 flex justify-between h-screen w-72 flex-col bg-sidebar shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex h-16 items-center justify-between border-b px-5">
            <h2 className="text-xl font-semibold">Menu</h2>

            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-md p-2 hover:bg-accent"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mt-4 flex flex-col gap-2 ">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-background/30"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-2">
          <button className="h-15 w-full flex justify-center items-center rounded-2xl gap-3 bg-red-600 text-white text-xl font-bold">
            Logout
            <LogOut />
          </button>
        </div>
      </aside>
    </>
  );
}
