import production from "../../data/production";
import dynamic from "next/dynamic";

const MyResponsiveStream = dynamic(() => import("../Nivo/production"), {
  ssr: false,
});

const Chartproduction = () => {
  return (
    <div className="divStream">
      <MyResponsiveStream data={production} />
      <style jsx>{`
        .divStream {
          height: 60vh;
          width: 40vw;
        }
      `}</style>
    </div>
  );
};

export default Chartproduction;
