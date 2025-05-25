export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#1A1A1A] text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold">⚽ LiveFootball</h1>
      <nav className="space-x-6 text-sm font-medium">
        <a href="#" className="hover:text-gray-400">News</a>
        <a href="#" className="hover:text-gray-400">Transfers</a>
        <a href="#" className="hover:text-gray-400">About</a>
      </nav>
    </header>
  );
}
