'use client';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // ✅ SHADCN Button

const Footer = () => {
  return (
    <footer className="bg-white px-4 py-12 text-gray-700 sm:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand Column */}
        <div className="p-3 lg:p-0">
          <div className="mb-4 flex items-center gap-2">
            <Image
              src="/logo.png" // ← Insert your logo here
              alt="KrishiShakti Logo"
              width={30}
              height={30}
            />
            <span className="text-xl font-bold">KrishiShakti</span>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering agri-innovation across India, from organic to automation
            farms.
          </p>
          <div className="mt-6 flex gap-4">
            <FaFacebookF className="cursor-pointer hover:text-green-700" />
            <FaTwitter className="cursor-pointer hover:text-green-700" />
            <FaInstagram className="cursor-pointer hover:text-green-700" />
            <FaLinkedinIn className="cursor-pointer hover:text-green-700" />
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-3 ml-3.5 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li>
              <Link href="#">
                <Button variant="link">Features</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Pricing</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">About Us</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Contact</Button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Resource */}
        <div>
          <h4 className="mb-3 ml-3.5 font-semibold">Resource</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li>
              <Link href="#">
                <Button variant="link">Blog</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Customer Stories</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Information</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Legal</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Payments</Button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Career */}
        <div>
          <h4 className="mb-3 ml-3.5 font-semibold">Career</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li>
              <Link href="#">
                <Button variant="link">Jobs</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Hiring</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">News</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Tips & Tricks</Button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="mb-3 ml-3.5 font-semibold">Help</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li>
              <Link href="#">
                <Button variant="link">FAQ</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Help Center</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="link">Support</Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
