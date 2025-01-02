import { useIsAuthorized } from "@/apis/useIsAuthenticated";
import { HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right }: HeaderProps) => (
  <nav className="z-10 flex items-center justify-between w-full h-16 px-4 bg-white shadow-md">
    {left || <HeaderBlank />}
    {center || <HeaderBlank />}
    {right || <HeaderBlank />}
  </nav>
);

const HeaderBlank = () => <div className="w-6" />;

export const HeaderHome = () => (
  <Link to="/">
    <HomeIcon size={24} />
  </Link>
);

const ProfileLogin = () => (
  <Link to="/logout">
    <LogOutIcon size={24} />
  </Link>
);

const ProfileLogout = () => (
  <Link to="/signin">
    <LogInIcon size={24} />
  </Link>
);

export const HeaderProfile = () => {
  const isAuthorized = useIsAuthorized();

  return isAuthorized ? <ProfileLogin /> : <ProfileLogout />;
};
export default Header;
