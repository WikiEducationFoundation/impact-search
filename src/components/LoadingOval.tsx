import { Oval } from "react-loader-spinner";
import "./LoadingOval.scss";

export default function LoadingOval({ visible }: { visible: boolean }) {
  return (
    <div className="oval-container">
      <Oval
        visible={visible}
        height="120"
        width="120"
        color="#007BFF"
        secondaryColor="#007BFF"
      />
    </div>
  );
}
