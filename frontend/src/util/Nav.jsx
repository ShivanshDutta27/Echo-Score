import FlyingContent from "./FlyoutContent";
import FlyoutLink from "./Flyout";
import logo from "../assets/logo.png";

const Nav = () => {
  return (
    <div className="flex items-center justify-between min-h-48 bg-white px-16 py-6 ">
      {/* Logo */}
      <button className="h-12">
        <img src={logo} alt="Brand Logo" className="h-full w-auto" />
      </button>

      {/* Menu */}
      <div className="px-24 text-lg">
      <FlyoutLink href="#" flyoutContent={FlyingContent}>
        Menu
      </FlyoutLink>
      </div>
    </div>
  );
};

export default Nav;
