import Ain0 from "../Ain0/Ain0";
import Ain1 from "../Ain1/Ain1";
import Ain2 from "../Ain2/Ain2";
import Ain3 from "../Ain3/Ain3";
import Din0 from "../Din0/Din0";
import Din1 from "../Din1/Din1";
import Din2 from "../Din2/Din2";
import Din3 from "../Din3/Din3";
import Out0 from "../Out0/Out0";
import Out1 from "../Out1/Out1";
import Out2 from "../Out2/Out2";
import Out3 from "../Out3/Out3";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="parte"><Din0/></div>
      <div className="parte"><Din1/></div>
      <div className="parte"><Din2/></div>
      <div className="parte"><Din3/></div>
      <div className="parte"><Ain0/></div>
      <div className="parte"><Ain1/></div>
      <div className="parte"><Ain2/></div>
      <div className="parte"><Ain3/></div>
      <div className="parte"><Out0/></div>
      <div className="parte"><Out1/></div>
      <div className="parte"><Out2/></div>
      <div className="parte"><Out3/></div>
    </div>
  );
};

export default Dashboard;
