import { useState } from "react";
import styles from "../styles/login.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { useUserRole } from "../components/UserContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();
  const [userRole, setUserRole] = useUserRole();

  const moderatorPassword = "abc123"; // Replace with your real password
  const analystPassword = "abc123"; // Replace with your real password

  const handleLogin = () => {
    if (role === "Moderator" && password === moderatorPassword) {
      console.log("Logged in as Moderator");
      setUserRole("Moderator");
      router.push("/moderator");
      // Navigate to moderator page or set up some session state
    } else if (role === "Analyst" && password === analystPassword) {
      console.log("Logged in as Analyst");
      setUserRole("Analyst");

      // Navigate to analyst page or set up some session state
      router.push("/analyst/evidence");
    } else {
      console.log("Incorrect password or role selection");
    }
  };

  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  console.log(selectedRole);
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setIsOpen(false);
            router.back();
          }}
        >
          <AiOutlineClose size={30} />
        </button>
        <h1>Login</h1>
        <div className={styles.buttonContainer}>
          <button
            className={selectedRole === "Moderator" ? styles.selected : ""}
            onClick={() => {
              setSelectedRole("Moderator");
              setRole("Moderator");
            }}
          >
            Moderator
          </button>
          <button
            className={selectedRole === "Analyst" ? styles.selected : ""}
            onClick={() => {
              setSelectedRole("Analyst");
              setRole("Analyst");
            }}
          >
            Analyst
          </button>
        </div>
        <div className={styles.inputContainer}>
          <label>Password: abc123</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.loginButton}>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
