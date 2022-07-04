import { ResponsiveBar } from "@nivo/bar";

const theme = {
  textColor: "#ffffff",
  axis: {
    legend: {
      text: {
        fontSize: 12,
        fill: "#ffffff",
      },
    },
    ticks: {
      line: {
        stroke: "#F4EEA9",
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: "#F4EEA9",
      },
    },
  },
};

const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["Rate of Change(%)"]}
    indexBy="country"
    margin={{ top: 0, right: 140, bottom: 60, left: 170 }}
    padding={0.3}
    groupMode="grouped"
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "set2" }}
    theme={theme}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={200}
    labelTextColor=""
    motionConfig={{
      mass: 314,
      tension: 500,
      friction: 233,
      clamp: true,
      precision: 0.01,
      velocity: 0,
    }}
  />
);

export default MyResponsiveBar;
