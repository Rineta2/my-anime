import Link from "next/link"

import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'

import { NavLinks } from "@/components/layout/Header/data/header"

export default function DesktopNav() {
    const pathname = usePathname();
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <ul className="hidden md:flex items-center gap-8">
            {NavLinks.map((item, index) => (
                <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                    <Link
                        href={item.href}
                        className={`px-3 py-1.5 transition-all duration-300 font-medium relative ${isActive(item.href)
                            ? 'text-primary font-semibold scale-105 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full'
                            : 'text-text/80 hover:text-primary hover:scale-105 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                            }`}
                    >
                        {item.name}
                    </Link>
                </motion.li>
            ))}
        </ul>
    )
} 