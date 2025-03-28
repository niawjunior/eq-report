const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8 py-4 text-center text-sm text-gray-500">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <p>&copy; {new Date().getFullYear()} Earthquake Damage Report</p>
        <span className="hidden md:inline">|</span>
        <a
          href="https://www.facebook.com/pasupol.b"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Contact Me
        </a>
      </div>
    </footer>
  );
};

export default Footer;
