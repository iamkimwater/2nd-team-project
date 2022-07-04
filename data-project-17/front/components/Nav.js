import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { useUserState } from "../lib/userContext";

export default function Nav() {
  const { user } = useUserState();

  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="#about">
            <a>
              {/* 데이터 시각화 자료 */}
              <span>ABOUT</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a>
              {/* 비건 관련 정보 소개 페이지 */}
              <span>INFORMATION</span>
            </a>
          </Link>
        </li>
        {user ? (
          <li>
            <Link href="/postings">
              <a>
                <span>COMMUNITY</span>
              </a>
            </Link>
          </li>
        ) : null}
      </ul>
      <style jsx>
        {`
          li {
            margin-bottom: 7px;
          }

          span {
            display: inline-block;
            padding-bottom: 2px;
            background-image: linear-gradient(#58d4ba, #58d4ba);
            background-position: right -100% bottom 0;
            background-size: 200% 2px;
            background-repeat: no-repeat;
          }

          span:hover {
            background-position: left -100% bottom 0;
            transition: background-position 0.9s;
          }
        `}
      </style>
    </nav>
  );
}
