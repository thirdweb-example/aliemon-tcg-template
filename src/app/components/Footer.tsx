import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-6 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/img/footer.png"
              alt="Logo"
              width={150}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Thirdweb. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Terms
            </Link>
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
