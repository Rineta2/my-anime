import Link from "next/link"

import { usePathname } from 'next/navigation'

import { motion, AnimatePresence } from 'framer-motion'

import { NavLinks } from "@/components/layout/Header/data/header"

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path;
        }
        return pathname === path;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden mt-7 bg-[var(--header-menu-bg)] backdrop-blur-md rounded-2xl shadow-xl p-6 border border-[var(--header-border)] overflow-hidden"
                >
                    <motion.ul
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {NavLinks.map((item, index) => (
                            <motion.li
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`block text-[var(--text)] hover:text-primary transition-all duration-300 py-2.5 font-medium hover:bg-[var(--hover-bg)] rounded-lg px-4 ${isActive(item.href) ? 'text-primary bg-[var(--hover-bg)]' : ''}`}
                                    onClick={onClose}
                                >
                                    {item.name}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 