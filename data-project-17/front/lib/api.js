import axios from "axios";

const BACK_PORT = "5001";
const SERVER_URL = `http://${process.env.HOST}:${BACK_PORT}`;
// const SERVER_URL = `http://${window.location.hostname}:${BACK_PORT}/`;

// * 데이터 조회 (GET)
async function get(endPoint, params = "") {
  const uri = `${SERVER_URL}${endPoint}/${params}`;

  console.log(`%cGET 요청 ${uri}`, "color: #a25cd1;");

  return axios.get(uri, {
    withCredentials: true,
  });
}

// * 데이터 생성 (POST)
async function post(endPoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  const uri = SERVER_URL + endPoint;

  console.log(`%cPOST 요청: ${uri}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  // data 처리를 axios에 위임합니다.
  return axios.post(uri, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

// * 데이터 수정 (PUT)
async function put(endPoint, data) {
  const bodyData = JSON.stringify(data);
  const uri = SERVER_URL + endPoint;

  console.log(`%cPUT 요청: ${uri}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(uri, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

// * 데이터 삭제 (DELETE)
// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함
async function del(endPoint, params = "") {
  const uri = `${SERVER_URL}${endPoint}/${params}`;

  console.log(`DELETE 요청 ${uri}`);

  return axios.delete(uri, {
    withCredentials: true,
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete };
