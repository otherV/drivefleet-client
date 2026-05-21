import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-base-200 py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-black text-primary">DriveFleet</h2>
                    <p className="text-base-content/70 text-sm">
                        Premium car rentals at your fingertips. Choose from a wide selection of vehicles and hit the road in style.
                    </p>
                    <div className="flex gap-4 text-base-content/70">
                        <a href="#" className="hover:text-primary transition-colors"><FaFacebook size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaXTwitter size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaInstagram size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <h3 className="font-bold uppercase text-sm tracking-widest">Quick Links</h3>
                    <div className="flex flex-col gap-2 text-base-content/70 text-sm">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="/cars" className="hover:text-primary transition-colors">Explore Cars</Link>
                        <Link href="/add-car" className="hover:text-primary transition-colors">Add Car</Link>
                        <Link href="/my-bookings" className="hover:text-primary transition-colors">My Bookings</Link>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <h3 className="font-bold uppercase text-sm tracking-widest">Contact</h3>
                    <div className="flex flex-col gap-2 text-base-content/70 text-sm">
                        <span>123 Fleet Street, Dhaka</span>
                        <span>+880 1234 567890</span>
                        <span>support@drivefleet.com</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-base-300 text-center text-base-content/50 text-sm">
                © {new Date().getFullYear()} DriveFleet. All rights reserved.
            </div>
        </footer>
    );
}