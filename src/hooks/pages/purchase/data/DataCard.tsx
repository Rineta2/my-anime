import { RiMovie2AiLine } from "react-icons/ri";

import { MdNotificationsActive, MdOutlineHd, MdDevices } from "react-icons/md";

import { FaDownload } from "react-icons/fa6";

import { LiaAdSolid } from "react-icons/lia";

import { CardData } from '../types/price'

export const dataCard: CardData[] = [
  {
    id: 1,
    name: "Konten Premium",
    icons: <RiMovie2AiLine className="text-2xl" />,
  },

  {
    id: 2,
    name: "Mendapatkan Notification",
    icons: <MdNotificationsActive className='text-2xl' />
  },

  {
    id: 3,
    name: "Resolusi HD",
    icons: <MdOutlineHd className='text-2xl' />
  },

  {
    id: 4,
    name: "Multi perangkat",
    icons: <MdDevices className='text-2xl' />
  },

  {
    id: 5,
    name: "Gratis unduh",
    icons: <FaDownload className='text-2xl' />
  },

  {
    id: 6,
    name: "Lewati iklan",
    icons: <LiaAdSolid className='text-2xl' />
  }
];