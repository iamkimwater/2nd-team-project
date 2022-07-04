import greenhousegas from "../../data/greenhousegas";
import dynamic from "next/dynamic";

const MyResponsiveStream = dynamic(() => import("../Nivo/greenhousegas"), {
  ssr: false,
});

const Chartgreenhousegas = () => {
  return (
    <div className="divStream">
      <MyResponsiveStream data={greenhousegas} />
      <style jsx>{`
        .divStream {
          display: flex;
          height: 60vh;
          width: 40vw;
          margin: ;
        }
      `}</style>
    </div>
  );
};

export default Chartgreenhousegas;
