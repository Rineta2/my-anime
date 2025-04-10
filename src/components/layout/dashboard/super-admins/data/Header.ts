import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill } from "react-icons/ri";

import { GrArticle, GrTransaction } from "react-icons/gr";

import { TbReportAnalytics } from "react-icons/tb";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/super-admins",
  },

  {
    icon: GrArticle,
    label: "Article",
    href: "/dashboard/super-admins/article",
    subItems: [
      { label: "Daftar Article", href: "/dashboard/super-admins/article" },
      { label: "Category", href: "/dashboard/super-admins/article/category" },
    ],
  },

  {
    icon: GrTransaction,
    label: "Transaction",
    href: "/dashboard/super-admins/transaction",
    subItems: [
      {
        label: "Daftar Transaksi",
        href: "/dashboard/super-admins/transaction",
      },

      {
        label: "Belum Dibayar",
        href: "/dashboard/super-admins/transaction/unpaid",
      },

      {
        label: "Sudah Dibayar",
        href: "/dashboard/super-admins/transaction/paid",
      },

      {
        label: "Dibatalkan",
        href: "/dashboard/super-admins/transaction/cancelled",
      },
    ],
  },

  {
    icon: TbReportAnalytics,
    label: "Rekap",
    href: "/dashboard/super-admins/rekap",
  },

  {
    icon: RiAdminFill,
    label: "Accounts",
    href: "/dashboard/super-admins/accounts",
    subItems: [
      { label: "Admins", href: "/dashboard/super-admins/accounts/admins" },
      { label: "User", href: "/dashboard/super-admins/accounts/user" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/super-admins/profile",
    subItems: [
      { label: "Profile", href: "/dashboard/super-admins/profile" },
      { label: "Security", href: "/dashboard/super-admins/profile/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
