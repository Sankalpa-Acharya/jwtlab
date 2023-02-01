import Head from "next/head";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Please Login!!!" />
      </Head>
      <Login />
    </div>
  );
}
