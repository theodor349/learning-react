import styles from "./page.module.css";
import AuthCheck from "@/components/AuthCheck";

export default function Home() {
  return (
    <main className={styles.main}>
      <AuthCheck>
        <h1>You are logged in</h1>
      </AuthCheck>
    </main>
  );
}
