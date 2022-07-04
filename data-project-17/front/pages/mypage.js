import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import * as Api from "../lib/api";
import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./hook/PrivateRoute";
// import './style/css/index.css';
import sample from "../public/img/sample_profile.jpg";
import edit from "../public/img/edit_icon.png";
import arrowRight from "../public/img/arrow_right.png";
import Header from "../components/Header";
import Nav from "../components/Nav";
import styles from "../styles/mypage.module.css";
import { useUserState } from "../lib/userContext";

export default function MyPage() {
  const [state, setState] = useState(true);
  const text = state ? "" : "수정하기";
  const [me, setMe] = useState();
  const [newDescription, setNewDescription] = useState("안녕하세요. 당신을 소개해주세요.");
  const [file, setFile] = useState();
  const [isViewingPostings, setIsViewingPostings] = useState(true);
  const [articles, setArticles] = useState([]);
  const [likeArticles, setLikeArticles] = useState([]);
  const articleIsLoading = useRef(false);
  const lastId = useRef(undefined);
  const [newProfileImageUrl, setNewProfileImageUrl] = useState();

  const updateUser = useCallback(() => {
    Api.get("/me").then((res) => {
      setMe(res.data);
      setNewProfileImageUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return undefined;
      });
    });
  }, []);

  const editHandler = () => {
    if (state === false) {
      Promise.all([
        ...(file
          ? [
              (() => {
                const fd = new FormData();
                fd.append("image", file);
                setFile(undefined);
                return Api.post("/profile", fd);
              })(),
            ]
          : []),
        ...(newDescription !== me?.description
          ? [Api.put("/description", { description: newDescription })]
          : []),
      ]).then(updateUser);
    }
    setState(!state);
  };

  const loadArticles = useCallback(() => {
    if (lastId.current === null) return;
    if (articleIsLoading.current) return;
    if (!me) return;
    articleIsLoading.current = true;
    Promise.all([
      Api.get(`/postings/${me.id}/postings`).then((res) => {
        setArticles(res.data);
        lastId.current = res.data.length < 10 ? null : res.data.reverse()[0].id;
      }),
      Api.get(`/postings/${me.id}/like_postings`).then((res) => {
        setLikeArticles(res.data.map((data) => data.Posting));
      }),
    ]).then(() => (articleIsLoading.current = false));
  }, [me]);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  useEffect(() => {
    if (!me) return;
    loadArticles();
    setNewDescription(me.description);
  }, [loadArticles, me]);

  useEffect(() => {
    // 무한스크롤
    const onScrollHandler = () => {
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight) loadArticles();
    };
    window.addEventListener("scroll", onScrollHandler);
    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, [loadArticles]);

  const onChangeImageHandler = (event) => {
    setFile(event.target.files[0]);
    setNewProfileImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <div className={styles.layout}>
        <div className={styles.mypage_layout}>
          {/* <h3 className={styles.titleA}>My Page</h3> */}
          <div className={state ? `${styles.profile}` : `${styles.profile} ${styles.edit}`}>
            <p className={styles.titleB}>{/*Profile*/}</p>
            <div className={styles.profile_img}>
              <Image src={newProfileImageUrl || me?.profile_url || sample} alt="" layout="fill" />
              <div className={styles.img_add}>
                <input className={styles.upload_name} />
                <label htmlFor="file">이미지수정</label>
                <input type="file" id="file" onChange={onChangeImageHandler} />
              </div>
            </div>
            <div className={styles.profile_info}>
              <div className={styles.top}>
                <p className={styles.nickname}>{me?.nickname ?? "I am Vegan"}</p>

                {/*vegan 일경우 vegan 클래스, nonvegan 일경우 nonvegan 클래스*/}
                <p className={`${styles.grade} ${me?.is_vegan ? styles.vegan : styles.nonvegan}`}>
                  {me?.is_vegan ? "" : "non"}vegan
                </p>
                {/* <p className={`${styles.grade} ${styles.nonvegan}`}>nonvegan</p> */}

                <span className={styles.edit_icon} onClick={editHandler}>
                  <Image src={edit} alt="" />
                  {text}
                </span>
              </div>
              <div className={styles.text}>
                <p>{me?.description ?? "안녕하세요. 당신을 소개해주세요."}</p>
                <textarea
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className={styles.posting_bar}>
            <p className={styles.titleB}>{/*Posting Bar*/}</p>
            <div className={styles.bar_wrap}>
              <button
                onClick={() => setIsViewingPostings(true)}
                className={isViewingPostings ? styles.active : undefined}
              >
                내 게시물
              </button>
              <button
                onClick={() => setIsViewingPostings(false)}
                className={isViewingPostings ? undefined : styles.active}
              >
                좋아요
              </button>
            </div>
          </div>

          <div className={styles.postings}>
            <p className={styles.titleB}>{/*postings*/}</p>
            <ul>
              {(isViewingPostings ? articles : likeArticles).map((article) => (
                <li className={styles.box} key={article.id}>
                  <div>
                    {article.file_url && (
                      <Image src={article.file_url} layout="fill" alt="article" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <MemoizedCalendar />
      </div>
    </div>
  );
}

function Calendar() {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(true);
  const { user } = useUserState();
  const now = dayjs();
  const firstOfMonth = now.startOf("month");

  useEffect(() => {
    if (!user) return;
    Api.get(`/records/${user.userId}`).then((res) => setRecords(res.data));
  }, [user]);

  const seedingHandler = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? `${styles.seeding}` : `${styles.seeding} ${styles.show}`}>
      <p className={styles.titleB}>My Vegan Calendar</p>
      <div className={styles.calendar}>
        {/*깃헙잔디잔디*/}
        <div className={styles.calendar_inner}>
          <div className={styles.week}>
            <p>Mon</p>
            <p>Wed</p>
            <p>Fri</p>
          </div>

          <div className={styles.month}>
            {[...Array(5 * 5)].map((_, outIndex) => {
              const firstDateOfWeek = now.subtract(outIndex, "w").startOf("w");
              return (
                <div className={styles.month_box} key={outIndex}>
                  {(outIndex == 24 || firstDateOfWeek.date() < 7) && (
                    <p>{firstDateOfWeek.format("MMM")}</p>
                  )}
                  <div className={styles.check}>
                    <div>
                      {[...Array(Math.min(now.diff(firstDateOfWeek, "d") + 1, 7))].map(
                        (_, index) => {
                          const date = firstDateOfWeek.add(index, "d");
                          return (
                            <span
                              data-date={date.format()}
                              key={index}
                              className={`${styles.step} ${
                                styles[
                                  `step0${Math.min(
                                    records[firstDateOfWeek.dayOfYear() - 1 + index],
                                    5,
                                  )}`
                                ]
                              }`}
                            ></span>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.annotation}>
          {/*일정단계안내 className으로 구분 총 5단계*/}
          <p>Less</p>
          <span className={`${styles.step} ${styles.step01}`}></span>
          <span className={`${styles.step} ${styles.step02}`}></span>
          <span className={`${styles.step} ${styles.step03}`}></span>
          <span className={`${styles.step} ${styles.step04}`}></span>
          <span className={`${styles.step} ${styles.step05}`}></span>
          <p>More</p>
        </div>
      </div>
      <p className={styles.now}>
        이번 달은{" "}
        <em>
          {
            records
              .slice(firstOfMonth.dayOfYear() - 1, firstOfMonth.add(1, "month").dayOfYear())
              .filter(Boolean).length
          }
          일
        </em>
        동안 Vegan!
      </p>
      <span className={styles.btn} onClick={seedingHandler}>
        <Image src={arrowRight} alt="" />
        CALENDAR
      </span>
    </div>
  );
}

const MemoizedCalendar = React.memo(Calendar);
