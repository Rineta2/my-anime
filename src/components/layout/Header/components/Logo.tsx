import Link from "next/link"

import { motion } from 'framer-motion'

import { profile } from "@/components/layout/Header/data/header"

export default function Logo() {
    return (
        <motion.div
            className="profile"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link href={profile.href} className="text-xl font-bold">
                {profile.name}
            </Link>
        </motion.div>
    )
} 