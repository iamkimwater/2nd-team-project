import consumptionranking from "../../data/consumptionranking";
import dynamic from "next/dynamic";

const MyResponsiveBump = dynamic(() => import("../Nivo/consumptionranking"), {
  ssr: false,
});

const Chartconsumptionranking = () => {
  return (
    <div className="divBump">
      <MyResponsiveBump data={consumptionranking} />
      <style jsx>{`
        .divBump {
          height: 60vh;
          width: 40vw;
        }
      `}</style>
    </div>
  );
};

export default Chartconsumptionranking;
