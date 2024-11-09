'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  EnvelopeIcon,
  BellIcon, // Added for notifications
  CalendarIcon, // Added for events
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Updated map of links for side navigation with new routes.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: UserGroupIcon,
  },
  {
    name: 'Devices',
    href: '/dashboard/devices',
    icon:  DevicePhoneMobileIcon,
  },
  {
    name: 'Sensor Data',
    href: '/dashboard/sensordata',
    icon: ChartBarIcon,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: EnvelopeIcon,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Events',
    href: '/dashboard/notifications',
    icon: BellIcon,
  },
  {
    name: 'Notifications',
    href: '/dashboard/events',
    icon: CalendarIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

