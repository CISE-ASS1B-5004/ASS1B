import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavItem from "./nav/NavItem";
import styles from "./PopulatedNavBar.module.scss";
import { useUserRole } from "@/components/UserContext";
import { useRouter } from "next/router";

const PopulatedNavBar = () => {
  const [userRole, setUserRole] = useUserRole();
  const router = useRouter();

  const handleLogout = () => {
    setUserRole(null);
    router.push("/"); // Redirect to home page or wherever you want after logout
  };

  const handleRoleClick = () => {
    switch (userRole) {
      case "Admin":
        router.push("/admin");
        break;
      case "Analyst":
        router.push("/analyst");
        break;
      case "Moderator":
        router.push("/moderator");
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>SPEED</div>{" "}
      {/* Moved SPEED above the NavBar */}
      <div className={styles.nav}>
        <NavBar>
          <div className={styles.leftNav}>
            <NavItem route="/">Home</NavItem>
            <NavItem route="/articles/new">Submit New</NavItem>
            <NavItem route="/articles/search">Search</NavItem>
            
          </div>
          <div className={styles.user}>
            {" "}
            {userRole ? (
              <>
                <div className={styles.role} onClick={handleRoleClick}>
                  {userRole} Page
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <NavItem end route="/login">
                Login
              </NavItem>
            )}
          </div>
        </NavBar>
      </div>
    </div>
  );
};

export default PopulatedNavBar;
