import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <div>
      <div>SPEED</div> {/* Moved SPEED above the NavBar */}
      <NavBar>
        <NavItem route="/">Home</NavItem>
        <NavItem route="/articles">View Articles</NavItem>
        <NavItem route="/articles/new">Submit New</NavItem>
        <NavItem end route="/login">Login</NavItem>
      </NavBar>
    </div>
  );
};

export default PopulatedNavBar;
