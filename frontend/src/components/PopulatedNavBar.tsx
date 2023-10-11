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

  return (
    <div className={styles.container}>
      <div className={styles.title}>SPEED</div>{" "}
      {/* Moved SPEED above the NavBar */}
      <div className={styles.nav}>
        <NavBar>
          <div className={styles.leftNav}>
            <NavItem route="/">Home</NavItem>
            <NavItem route="/articles">View Articles</NavItem>
            <NavItem route="/articles/new">Submit New</NavItem>
            <NavItem route="/articles/search">Search</NavItem>
            {userRole==="Moderator" ? (
            <NavItem route="/moderator">Moderator Page</NavItem>
            ) : ("") }
            {userRole==="Analyst" ? (
            <NavItem route="/analyst">Analyst Page</NavItem>
            ) : ("") }

          </div>
          <div className={styles.user}>
            {" "}
            {userRole ? (
              <>
                <div className={styles.role}>{userRole}</div>
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
