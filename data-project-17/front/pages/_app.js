// ? 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트
// 페이지에 적용할 공통 레이아웃의 역할
// 모든 컴포넌트에 공통으로 적용할 속성 관리
import "../styles/globals.css";
import "../styles/infoStyles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-quill/dist/quill.snow.css";
// config.autoAddCss = false;
import { UserProvider } from "../lib/userContext";

import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(dayOfYear);

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
