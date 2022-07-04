import consumptionchange from "../../data/consumptionchange";
import dynamic from "next/dynamic";

const MyResponsiveBar = dynamic(() => import("../Nivo/consumptionchange"), {
  ssr: false,
});

const chartstyles = {
  fontFamily: "sans-serif",
  fontSize: "14px",
  textAlign: "center",
};

const Chartconsumptionchange = () => {
  return (
    <div style={chartstyles} className="divStream">
      <MyResponsiveBar data={consumptionchange} />
      <style jsx>{`
        .divStream {
          height: 56vh;
          width: 40vw;
        }
      `}</style>
    </div>
  );
};

export default Chartconsumptionchange;
