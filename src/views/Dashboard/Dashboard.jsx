import Ain0 from "../../Components/Ain0/Ain0";
import Ain1 from "../../Components/Ain1/Ain1";
import Ain2 from "../../Components/Ain2/Ain2";
import Ain3 from "../../Components/Ain3/Ain3";
import Din0 from "../../Components/Din0/Din0";
import Din1 from "../../Components/Din1/Din1";
import Din2 from "../../Components/Din2/Din2";
import Din3 from "../../Components/Din3/Din3";
import Out0 from "../../Components/Out0/Out0";
import Out1 from "../../Components/Out1/Out1";
import Out2 from "../../Components/Out2/Out2";
import Out3 from "../../Components/Out3/Out3";

import style from "./Dashboard.module.css";

const Dashboard = ({ topic, host }) => {
  return (
    <div className={style.container}>

      <section className={style.Ain}>
        <Ain0 topic={topic} host={host} />
        <Ain1 topic={topic} host={host} />
        <Ain2 topic={topic} host={host} />
        <Ain3 topic={topic} host={host} />
      </section>
      <section className={style.Din}>
        <Din0 topic={topic} host={host}/>
        <Din1 topic={topic} host={host}/>
        <Din2 topic={topic} host={host}/>
        <Din3 topic={topic} host={host}/>
      </section>
      <section className={style.Out}>
        <Out0 topic={topic} host={host}/>
        <Out1 topic={topic} host={host}/>
        <Out2 topic={topic} host={host}/>
        <Out3 topic={topic} host={host}/>
      </section>
    </div>
  );
};

export default Dashboard;
