export default function ScreenSize() {
  return (
    <div className="fixed top-1/2 right-0 p-2 border-2 border-black rounded-lg">
      <p className="block sm:hidden">xs</p>
      <p className="hidden sm:block">sm</p>
      <p className="hidden md:block">md</p>
      <p className="hidden lg:block">lg</p>
    </div>
  );
}
