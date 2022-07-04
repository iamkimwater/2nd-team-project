import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Layout from "../components/Layout";
import { FullPage, Slide } from "react-full-page";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Chartconsumptionchange from "../components/Charts/consumptionchange";
import Chartconsumptionranking from "../components/Charts/consumptionranking";
import Chartglobalsealevel from "../components/Charts/globalsealevel";
import Chartgreenhousegas from "../components/Charts/greenhousegas";
import Chartproduction from "../components/Charts/production";

const MainNavsection = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainChartsection = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Chartarrange1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ;
  margin-top: 5%;
`;

const Chartarrange2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  margin-left: ;
`;

const Charttext1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: -50px;
  margin-top: 2%;
  h1 {
    color: #f4eea9;
  }
  p {
    color: #f0edcc;
    font-weight: ;
    font-size: 20px;
    line-height: 0px;
  }
`;

const Charttext2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -50px;
  margin-top: 3%;
  p {
    color: #f0edcc;
    font-weight: ;
    font-size: 22px;
    line-height: 0px;
  }
  p > span {
    color: #f0bb62;
    font-size: 24px;
    font-weight: bold;
  }
`;

const Textarrange_col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #f4eea9;
    font-size: 22px;
  }
  p {
    color: #519259;
    font-weight: bold;
    font-size: 20px;
    line-height: 0px;
  }
  span {
    color: #519259;
    font-size: 12px;
  }

  h1 > span {
    color: #f0bb62;
    font-weight: bold;
    font-size: 24px;
  }
`;

const Textarrange_final = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  h1 {
    color: #f4eea9;
    line-height: 10px;
  }
  p {
    font-weight: ;
    font-size: 60px;
    color: #519259;
    line-height: 10px;
  }
  p > span {
    font-weight: bold;
    color: #f4eea9;
  }
  h2 {
    color: #f0bb62;
  }
  span {
    color: #f4eea9;
    line-height: 30px;
  }
  margin-bottom: 10%;
  margin-left: -40%;
`;

export default function Home() {
  return (
    <main>
      <FullPage duration={50}>
        <Layout />
        <Slide>
          <section className={styles.first}>
            <video autoPlay muted loop className={styles.video}>
              <source src="/mainVideo.mp4" type="video/mp4" />
            </video>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2} id="about">
            <MainNavsection></MainNavsection>
            <MainChartsection>
              <Chartarrange1>
                <div className="divchart">
                  <Chartglobalsealevel />
                </div>
                <Charttext1>
                  <h1>1993년 기준, 2021년 지구 평균 해수면 약 90mm 상승</h1>
                  <p>지구온난화 영향으로 전 세계의 빙하가 빠른 속도로 녹고 있습니다.</p>
                  <p>
                    해수면 상승뿐 만 아니라 최근 잦아진 산불도 지구온난화로 인한 기후 변화
                    때문입니다.
                  </p>
                  <p>
                    산불, 홍수, 폭염, 빙하의 붕괴와 같은 이상 현상은 점점 더 예측할 수 없을 정도로
                    심각해지고 있습니다.
                  </p>
                </Charttext1>
              </Chartarrange1>
            </MainChartsection>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2}>
            <MainNavsection></MainNavsection>
            <MainChartsection>
              <Chartarrange2>
                <Textarrange_col>
                  <p>Total Meat Production (tonnes/year)</p>
                  <div className="divStream">
                    <Chartproduction />
                  </div>
                </Textarrange_col>
                <Textarrange_col>
                  <p>Total Greenhouse Gas (MtCo2e)</p>
                  <div className="divStream">
                    <Chartgreenhousegas />
                  </div>
                </Textarrange_col>
              </Chartarrange2>
              <Charttext2>
                <p>
                  전 세계 육류 생산량 <span>2배</span> 가량 증가
                </p>
                <p>
                  축산업이 세계 메탄가스 배출의 <span>30%</span> 차지
                </p>
              </Charttext2>
            </MainChartsection>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2}>
            <MainNavsection></MainNavsection>
            <MainChartsection>
              <Chartarrange2>
                <Textarrange_col>
                  <p>World Meat Consumption per person (kg/year)</p>
                  <div className="divBump">
                    <Chartconsumptionranking />
                  </div>
                  <h1>
                    국내 육류 소비 순위, <span>네 계단</span> 상승
                  </h1>
                </Textarrange_col>
                <Textarrange_col>
                  <p>Meat Consumption Growth(%)</p>
                  <span>[1992년~2016년]</span>
                  <div className="divBump">
                    <Chartconsumptionchange />
                  </div>
                  <h1>
                    국내 육류 소비 증가율, 세계 <span>2위!!</span>
                  </h1>
                </Textarrange_col>
              </Chartarrange2>
            </MainChartsection>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2}>
            <MainNavsection></MainNavsection>
            <MainChartsection>
              <Textarrange_final>
                <p>
                  Let's <span>Begin a Vegan!</span>
                </p>
                <span>우리가 먹는 고기 한 점에 지구는 점점 뜨거워지고 있습니다</span>
                <span>
                  우리가 동물 한 마리의 생명을 살리면 이산화탄소 9.1kg에 달하는 양을 감축시키고
                </span>
                <span>
                  더불어 물 4,200L, 곡식 20.4kg을 절약하고, 숲 2.8제곱미터를 살릴 수 있습니다.
                </span>
              </Textarrange_final>
              <Image src="/img/vegan_save.png" alt="begin a vegan" width={1200} height={200} />
            </MainChartsection>
          </section>
        </Slide>
      </FullPage>
    </main>
  );
}
