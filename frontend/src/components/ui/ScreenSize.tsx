export default function ScreenSize() {
  return (
    <div className="fixed top-1/2 right-0 p-2 border-2 border-black bg-white rounded-lg">
      <p className="block sm:hidden">xs</p>
      <p className="hidden sm:block md:hidden">sm</p>
      <p className="hidden md:block lg:hidden">md</p>
      <p className="hidden lg:block xl:hidden">lg</p>
    </div>
  );
}
