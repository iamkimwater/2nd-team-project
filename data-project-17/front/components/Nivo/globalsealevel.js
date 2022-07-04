import { ResponsiveFunnel } from "@nivo/funnel";

const theme = {
  textColor: "#064635",
  fontSize: 10,
  axis: {
    legend: {
      text: {
        fontSize: 12,
        fill: "#777777",
      },
    },
    ticks: {
      line: {
        stroke: "#F4EEA9",
        strokeWidth: 1,
      },
      text: {
        fontSize: 15,
        fill: "#519259",
      },
    },
  },
  grid: {
    line: {
      stroke: "",
      strokeWidth: 0.5,
    },
  },
};

const MyResponsiveFunnel = ({ data }) => (
  <ResponsiveFunnel
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    direction="horizontal"
    valueFormat=">-.4s"
    theme={theme}
    colors={{ scheme: "blues" }}
    borderWidth={20}
    borderColor={{ theme: "background" }}
    beforeSeparatorLength={0}
    beforeSeparatorOffset={0}
    afterSeparatorLength={0}
    afterSeparatorOffset={0}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="wobbly"
  />
);

export default MyResponsiveFunnel;
