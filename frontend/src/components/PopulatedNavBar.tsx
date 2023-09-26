import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavItem from "./nav/NavItem";
import styles from "./PopulatedNavBar.module.scss";

const PopulatedNavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>SPEED</div> {/* Moved SPEED above the NavBar */}
      <div className={styles.nav}>
      <NavBar>
        <NavItem route="/">Home</NavItem>
        <NavItem route="/articles">View Articles</NavItem>
        <NavItem route="/articles/new">Submit New</NavItem>
        <NavItem route="/articles/search">Search</NavItem>
        <NavItem end route="/login">Login</NavItem>
      </NavBar>
      </div>
    </div>
  );
};

export default PopulatedNavBar;
