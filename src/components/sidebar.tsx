"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Learn",
    icon: "📚",
    activeIcon: "📖",
  },
  {
    href: "/quests",
    label: "Quests",
    icon: "⭐",
    activeIcon: "🌟",
  },
  {
    href: "/friends",
    label: "Friends",
    icon: "👥",
    activeIcon: "👯",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r flex-col z-20">
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="font-bold text-xl text-primary">FinFemme</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                      ${
                        isActive
                          ? "bg-primary/10 text-primary border-2 border-primary/20"
                          : "text-muted-foreground hover:bg-gray-100 border-2 border-transparent"
                      }
                    `}
                  >
                    <span className="text-2xl">
                      {isActive ? item.activeIcon : item.icon}
                    </span>
                    <span className="text-base">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <p className="font-medium text-sm">Learner</p>
              <p className="text-xs text-muted-foreground">Level 1</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-20 safe-area-inset-bottom">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all
                    ${isActive ? "text-primary" : "text-muted-foreground"}
                  `}
                >
                  <span className="text-2xl">
                    {isActive ? item.activeIcon : item.icon}
                  </span>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
