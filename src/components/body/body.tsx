import Featured from "./featured/Featured";
import WhatsNew from "./whatsNew/whatsNew";
import ComingSoon from "./coming/coming";
import TopAuthor from "./topAuthor/top author";
import "../../styles/body/body.scss";
import Layout from "../Layout/Default layout/layout";

const Home = () => {
  return (
    <Layout>
      <Featured />
      <WhatsNew />
      <ComingSoon />
      <TopAuthor />
    </Layout>
  );
};
export default Home;
