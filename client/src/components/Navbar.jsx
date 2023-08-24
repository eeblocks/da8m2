import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <Link className="link" to="/">
          AntiPaste
        </Link>
      </h1>
    </nav>
  );
}

export default Navbar;
