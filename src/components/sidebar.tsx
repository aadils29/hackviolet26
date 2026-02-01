"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Wallet,
  Landmark,
  TrendingUp,
  CreditCard,
  Home,
  Star,
  Users,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  {
    href: "/budgeting",
    label: "Budgeting",
    icon: Wallet,
  },
  {
    href: "/retirement",
    label: "Retirement",
    icon: Landmark,
  },
  {
    href: "/investing",
    label: "Investing",
    icon: TrendingUp,
  },
  {
    href: "/credit",
    label: "Credit",
    icon: CreditCard,
  },
  {
    href: "/loans",
    label: "Loans",
    icon: Home,
  },
  {
    href: "/quests",
    label: "Quests",
    icon: Star,
  },
  {
    href: "/friends",
    label: "Friends",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r flex-col z-20">
        {/* Logo */}
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center justify-center">
            <img
              src="/wordandlogo.svg"
              alt="finfeme"
              className="w-full max-w-[220px]"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
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
                    <IconComponent className="w-6 h-6" />
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
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-sm">Learner</p>
              <p className="text-xs text-muted-foreground">Level 1</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all border-2 border-transparent hover:border-red-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-20 safe-area-inset-bottom">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all
                    ${isActive ? "text-primary" : "text-muted-foreground"}
                  `}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all text-muted-foreground hover:text-red-500"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xs font-medium">Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
