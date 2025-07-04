import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

function AuthNav() {
  return (
    <section>
      <nav className="flex justify-between px-2 dark:bg-[#0a0a0a] items-center  py-1 md:px-12 top-0 max-w-screen sticky border-b border-neutral-200 dark:border-neutral-900">
        <Logo />
        <ul className="flex items-center space-x-4">
          <li>
            <ThemeToggle />
          </li>
          <Link href="/login" className="cursor-pointer">
            <li>
              <button className="bg-black font-[600] cursor-pointer dark:bg-white dark:text-black text-white px-4 text-sm py-2 rounded">
                Login
              </button>
            </li>
          </Link>
          {/* <Link to="/register" className="cursor-pointer">
            <li>
              <button className="bg-black font-[600] cursor-pointer  dark:bg-white dark:text-black text-white px-4 text-sm py-2 rounded">
                Signup
              </button>
            </li>
          </Link> */}
        </ul>
      </nav>
    </section>
  );
}

export default AuthNav;
