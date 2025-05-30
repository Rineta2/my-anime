"use client"

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from 'react-icons/io'

import { motion, useScroll, useTransform } from 'framer-motion'

import banner from '@/base/assets/articles/articles.jpg'

export default function HeroProject() {
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 500], [0, 250]);

    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const titleY = useTransform(scrollY, [0, 300], [0, 100]);

    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{ y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Image
                    src={banner}
                    alt="banner"
                    className='w-full h-[130%] object-cover brightness-[0.85]'
                    priority
                    quality={100}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"
                    style={{ opacity }}
                />
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        opacity,
                        y: titleY,
                        scale,
                    }}
                >
                    <motion.h3
                        variants={itemVariants}
                        className='text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg'
                    >
                        Articles
                    </motion.h3>
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                        <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                            Home
                        </Link>
                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <span className='text-sm md:text-base text-white/80'>Articles</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}