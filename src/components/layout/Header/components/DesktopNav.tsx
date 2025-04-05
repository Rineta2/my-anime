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
        return pathname === path;
    };

    return (
        <motion.ul
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {NavLinks.map((item, index) => (
                <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                    <Link
                        href={item.href}
                        className={`relative text-text hover:text-primary transition-all duration-300 font-medium group ${isActive(item.href) ? 'text-primary' : ''}`}
                    >
                        {item.name}
                        <motion.span
                            className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-hover transform transition-transform duration-300 ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                            layoutId="nav-underline"
                        />
                    </Link>
                </motion.li>
            ))}
        </motion.ul>
    )
} 