import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavItem from "./nav/NavItem";
import styles from "./PopulatedNavBar.module.scss";
import navStyles from "./nav/Nav.module.scss";
import { useUserRole } from "@/components/UserContext";
import { useRouter } from 'next/router';


const PopulatedNavBar = () => {
  const [userRole, setUserRole] = useUserRole(); 
  const router = useRouter();

  const handleLogout = () => {
    setUserRole(null);
    router.push('/'); // Redirect to home page or wherever you want after logout
  };

  function getRoute(){
   let UR = userRole.toLowerCase();
   if(UR === "Analyst") {
    return './pages/articles/analysis';
  }else
      return './pages/articles/moderation';
  
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>SPEED</div> {/* Moved SPEED above the NavBar */}
      <div className={styles.nav}>
      <NavBar>
      <div className={styles.leftNav}>
        <NavItem route="/">Home</NavItem>
        <NavItem route="/articles">View Articles</NavItem>
        <NavItem route="/articles/new">Submit New</NavItem>
        <NavItem route="/articles/search">Search</NavItem>


        </div>
        <div className={styles.user}> {userRole ? (
            <>
              <NavItem route={getRoute()} className={navStyles.role}>{userRole}</NavItem>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <NavItem end route="/login">Login</NavItem>
          )}</div>
       
      </NavBar>
      </div>
    </div>
  );
};

export default PopulatedNavBar;
