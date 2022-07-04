import { useRef } from "react";
import Image from "next/image";

import styled from "styled-components";
import { FullPage, Slide } from "react-full-page";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faCarrot,
  faBacon,
  faDrumstickBite,
  faFish,
  faEgg,
  faGlassWater,
} from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header";
import Nav from "../components/Nav";
// import Layout from "../components/Layout";

const InfoIndexText = styled.div`
  width: 25%;
  margin-left: 10%;
  h1 {
    color: #207868;
  }
  h1 > span {
    margin-left: 10px;
  }
  p {
    line-height: 2;
  }
`;

const InfoIndexSelecting = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const VegeTypesBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const IconsBox = styled.div`
  cursor: auto;
  .food-icon {
    font-size: 28px;
    margin-left: 20px;
    color: rgba(0, 0, 0, 0.7);
  }
  .food-icon:first-child {
    color: #207868;
  }
  .food-icon:nth-child(2):not(.VEGAN):not(.OVO) {
    color: #24b1cd;
  }
  .food-icon:nth-child(3):not(.VEGAN):not(.LACTO) {
    color: #ffcaba;
  }
  .food-icon:nth-child(4):not(.VEGAN):not(.LACTO-OVO):not(.LACTO):not(.OVO) {
    color: #157ac3;
  }
  .food-icon:nth-child(5):not(.VEGAN):not(.LACTO-OVO):not(.LACTO):not(.OVO):not(.PESCO) {
    color: #7b4a00;
  }
  .food-icon:last-child:not(.VEGAN):not(.LACTO-OVO):not(.LACTO):not(.OVO):not(.PESCO):not(.POLLO) {
    color: #aa083a;
  }
`;

const ContentSlide = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 100px;
`;

const ContentText = styled.div`
  margin-left: 50px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  height: 500px;
  width: 480px;
  p {
    margin-top: 50px;
    line-height: 2;
  }
`;

// TODO : Nav 부분 완성 시 추가
export default function Info() {
  const VegeTypes = ["VEGAN", "LACTO-OVO", "LACTO", "OVO", "PESCO", "POLLO", "FLEXITARIAN"];
  const VegeTypesKor = ["비건", "락토오보", "락토", "오보", "페스코", "폴로", "플렉시테리언"];
  const VegeTypesText = [
    "비건 식단을 따르는 사람들은 동물 고기, 달걀, 유제품, 꿀 등 동물 제품을 먹지 않습니다. 모피, 실크, 화장품 등 동물성 부산물과 동물성 식재료를 사용한 비누 사용을 피함으로써 비건 생활을 더욱 강화할 수 있습니다. 이는 완전한 채식, 즉 '동물성 성분'이 들어간 모든 먹거리를 거부할 뿐 아니라, 동물을 착취해 얻는 소비도 지양하는 유형입니다. 충분한 양의 채소로 식이섬유, 비타민, 무기질 등을 섭취할 수 있지만, 과도한 채식 식단은 오히려 건강 문제를 초래할 수 있어 단백질과 탄수화물 섭취 비중에 신경 써야 합니다.",
    "락토 오보 식단을 따르는 사람들은 육류와 어류는 먹지 않되 우유, 치즈, 버터 등의 유제품과 달걀 등의 난류, 꿀처럼 동물에게서 나오는 음식까지만 섭취를 허용합니다. 직접적인 도축, 살생을 통해 생산되는 육류, 생선, 해산물은 배제하는 유형입니다. 전 세계 채식 유형 중 가장 많은 비율을 차지하기도 합니다.",
    "락토 식단을 따르는 사람들은 유제품은 섭취하지만, 달걀 등 난류 섭취를 제외합니다. 힌두교, 불교 등 동양의 많은 종교 신도들이 행하는 채식 유형입니다. 철분 결핍과 빈혈을 경험할 수도 있으므로 식물성 공급원을 통해서도 적절하게 섭취할 필요가 있습니다.",
    "오보 식단을 따르는 사람들은 달걀은 섭취하지만, 유제품은 소비하지 않습니다. 유제품을 생산하지 못하는 수컷 송아지를 지속적으로 도축 폐기하는 산업적 잔혹성을 반대하거나, 또한, 우유 생산을 위해 젖소를 강제적으로 임신시키는 관습을 우려하기도 합니다",
    "이탈리아어의 pesce를 어원으로 하는 페스코(Pesco)는 물고기를 뜻하는 말입니다. 이것처럼, 페스코 식단을 따르는 사람들은 유제품, 달걀 등 난류, 어류는 먹되 가금류, 육류는 먹지 않는 채식 유형입니다. 이는 환경에 도움이 되면서도 건강한 철분의 양을 보장할 수도 있습니다.",
    "스페인어로 닭고기를 뜻하는 폴로(Pollo)에서 유래한 것처럼, 폴로 식단을 따르는 사람들은 붉은 고기 또는 포유류 고기만을 제한하고 가금류 고기 섭취를 허용합니다. 붉은 고기를 제공하는 가축들은 다른 가축들에 비해 더 넓은 생산 환경이 필요하며, 온실 가스 배출율이 높다는 사실을 바탕으로 전반적인 동물성 제품 섭취를 줄여 나가고자 하는 준채식주의 유형입니다.",
    '플렉시테리언 식단은 아직 완전한 채식에 익숙하지 않은 사람들을 위한 유형으로, "고기 없는 월요일"처럼 식단을 따를 수 있습니다.  육류 소비를 줄여 식생활에 더 많은 채식 식단을 습관화하며, 더 건강한 식습관을 통해서 환경과 건강을 위할 수 있습니다.',
  ];

  // 최상단 이동
  const fullPageRef = useRef();
  const dropUpPage = () => {
    fullPageRef.current.scrollToSlide(0);
  };
  // 선택한 슬라이드로 이동
  const handleSelecting = (event) => {
    const slideNumber = event.target.getAttribute("name");
    fullPageRef.current.scrollToSlide(slideNumber);
  };

  // 선택지 & 각 화면 슬라이드
  return (
    <FullPage ref={fullPageRef} duration={50} className="index">
      <Header />
			<Nav/>
      <Slide key="selecting-section" className="section">
        <InfoIndexText>
          <h1>
            <FontAwesomeIcon icon={faLeaf} />
            <span>채식주의자 (Vegetarian)</span>
          </h1>
          <p>
            세계채식연맹(IVU)에서는 채식주의자를{" "}
            <b>육지동물은 물론 바다나 강에 사는 물고기도 먹지 않는 사람</b>이라고 정의합니다. 단,
            우유나 계란은 취향대로 섭취할 수도 있고 하지 않을 수도 있습니다.
          </p>
          <p>
            따라서, 채식의 종류는 육류, 가금류, 생선(해산물), 달걀(알), 우유 및 유제품을
            섭취하는지를 기준으로 구분합니다.
          </p>
          <p>
            채식 식단은 환경 보호뿐만 아니라 동물의 고통을 줄이고, 개인의 건강을 지키는 데도 도움을
            줍니다. 하지만 콩, 두부, 콩고기, 밀고기 등으로 양질의 단백질을 채워 주지 않거나 당류
            중심으로 섭취를 한다면 오히려 건강상 다양한 문제가 발생할 수 있어 주의해야 합니다.
          </p>
        </InfoIndexText>
        <InfoIndexSelecting>
          {VegeTypes.map((el, idx) => (
            <VegeTypesBox key={el} name={idx + 1} onClick={handleSelecting}>
              {el}
              <IconsBox>
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faCarrot} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faGlassWater} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faEgg} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faFish} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faDrumstickBite} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faBacon} />
              </IconsBox>
            </VegeTypesBox>
          ))}
        </InfoIndexSelecting>
      </Slide>

      {VegeTypes.map((el, idx) => (
        <Slide key={el} className="section">
          <ContentSlide>
            <Image alt={`vegan-type-${el}`} src={`/img/${el}.jpg`} width={700} height={500} />
            <ContentText>
              <h1>
                {VegeTypesKor[idx]} ({el})
              </h1>
              <p>{VegeTypesText[idx]}</p>
            </ContentText>
          </ContentSlide>
          <KeyboardDoubleArrowUpIcon onClick={dropUpPage} className="arrow-drop-up-icon" />
        </Slide>
      ))}
    </FullPage>
  );
}
