import Image from "next/image";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Nav />
      <div>
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}
