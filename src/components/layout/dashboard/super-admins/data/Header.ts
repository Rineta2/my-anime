import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill } from "react-icons/ri";

import { GrArticle, GrTransaction } from "react-icons/gr";

import { IoPricetagsOutline } from "react-icons/io5";

import { FaHistory } from "react-icons/fa";

import { BsBookmarksFill } from "react-icons/bs";

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
        label: "Return",
        href: "/dashboard/super-admins/transaction/return",
      },

      {
        label: "Dibatalkan",
        href: "/dashboard/super-admins/transaction/cancelled",
      },
    ],
  },

  {
    icon: FaHistory,
    label: "History",
    href: "/dashboard/super-admins/history",
  },

  {
    icon: BsBookmarksFill,
    label: "Bookmarks",
    href: "/dashboard/super-admins/bookmarks",
  },

  {
    icon: IoPricetagsOutline,
    label: "Price List",
    href: "/dashboard/super-admins/price",
    subItems: [
      { label: "Price List", href: "/dashboard/super-admins/price" },
      { label: "Card", href: "/dashboard/super-admins/price/card" },
    ],
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
