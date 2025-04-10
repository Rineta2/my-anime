"use client";

import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import Sidebar from "@/components/layout/Sidebar/Sidebar";

import { Toaster } from "react-hot-toast";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);
            if (isMobileView) {
                setIsCollapsed(true);
                setIsSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSidebarToggle = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const handleSidebarClose = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const isAdminRoute = pathname?.includes("/signin")
        || pathname?.includes("/signup")
        || pathname?.includes("/dashboard")
        || false;

    return (
        <div className='relative min-h-screen bg-[var(--background)]'>
            {!isAdminRoute && (
                <Sidebar
                    isCollapsed={isCollapsed}
                    onCollapse={setIsCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleSidebarClose}
                />
            )}
            <div
                className={`
                    flex flex-col min-h-screen 
                    ${!isAdminRoute ? (
                        isMobile
                            ? 'ml-0'
                            : isCollapsed
                                ? 'ml-16 transition-[margin] duration-300 ease-in-out'
                                : 'ml-60 transition-[margin] duration-300 ease-in-out'
                    ) : ''}
                `}
            >
                {!isAdminRoute && (
                    <Header
                        isCollapsed={isCollapsed}
                        isMobile={isMobile}
                        onToggleSidebar={handleSidebarToggle}
                        isSidebarOpen={isSidebarOpen}
                    />
                )}
                <main className='flex-1'>
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 3000,
                            className: 'shadow-lg',
                            style: {
                                background: 'var(--header-bg)',
                                color: 'var(--text)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid var(--header-border)',
                            },
                            success: {
                                style: {
                                    background: 'var(--success)',
                                    color: '#fff',
                                    border: 'none',
                                },
                                iconTheme: {
                                    primary: '#fff',
                                    secondary: 'var(--success)',
                                },
                            },
                            error: {
                                style: {
                                    background: 'var(--error)',
                                    color: '#fff',
                                    border: 'none',
                                },
                                iconTheme: {
                                    primary: '#fff',
                                    secondary: 'var(--error)',
                                },
                            },
                        }}
                    />
                    {children}
                </main>
                {!isAdminRoute && <Footer />}
            </div>
        </div>
    );
};

export default Pathname;