import { ResponsiveStream } from "@nivo/stream";

const theme = {
  textColor: "#f7fdfa",
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
        fontSize: 9,
        fill: "#F4EEA9",
      },
    },
  },
  grid: {
    line: {
      stroke: "#519259",
      strokeWidth: 0.5,
    },
  },
};

const chartstyles = {
  fontFamily: "sans-serif",
  fontSize: "20px",
  textAlign: "center",
};

const MyResponsiveStream = ({ data }) => (
  <ResponsiveStream
    style={chartstyles}
    data={data}
    keys={[
      "UK",
      "Mexico",
      "Australia",
      "Germany",
      "Japan",
      "Brazil",
      "Russia",
      "India",
      "Others",
      "USA",
      "China",
    ]}
    valueFormat=" >-,"
    theme={theme}
    margin={{ top: 50, right: 120, bottom: 50, left: 70 }}
    axisTop={null}
    axisRight={{
      orient: "right",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 50,
      format: " >-,",
    }}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
      tickValues: 5,
      format: (v) => v + 1993 + v * 5,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
      format: " >-,",
    }}
    enableGridY={false}
    curve="cardinal"
    offsetType="diverging"
    order="ascending"
    colors={{ scheme: "greens" }}
    fillOpacity={0.85}
    borderColor={{ theme: "background" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#2c998f",
        size: 4,
        padding: 2,
        stagger: true,
      },
      {
        id: "squares",
        type: "patternSquares",
        background: "inherit",
        color: "#e4c912",
        size: 6,
        padding: 2,
        stagger: true,
      },
    ]}
    fill={[
      {
        match: {
          id: "India2",
        },
        id: "squares",
      },
      {
        match: {
          id: "China2",
        },
        id: "squares",
      },
    ]}
    dotSize={8}
    dotColor={{ from: "color" }}
    dotBorderWidth={2}
    dotBorderColor={{
      from: "color",
      modifiers: [["darker", 0.7]],
    }}
    motionConfig="molasses"
    // legends={[
    //   {
    //     anchor: "bottom-right",
    //     direction: "column",
    //     translateX: 145,
    //     itemWidth: 80,
    //     itemHeight: 15,
    //     itemTextColor: "#999999",
    //     symbolSize: 6,
    //     symbolShape: "circle",
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemTextColor: "#000000",
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);

export default MyResponsiveStream;
