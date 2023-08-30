import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/body/body";
import Error from "../pages/error";
import Comic from "../pages/home/comic/comic";
import ScrollToTop from "../utils/scroll to top/index";
import DetailComic from "../pages/home/detailComic/detail-comic";
import StoryList from "../pages/admin/comic";
import ManagementUsers from "../pages/admin/user";
import ReadComic from "../pages/home/read/readComic";
import Login from "../pages/login";
import DetailManga from "../pages/admin/detailManga";
import Register from "../pages/register";
import Search from "../pages/home/search";
import WhatsNewAll from "../components/body/whatsNew/whatsNewAll";
import ComingALl from "../components/body/coming/comingAll";

const PublicRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<ManagementUsers />} />
        <Route path="/admin/user" element={<ManagementUsers />} />
        <Route path="/admin/comic" element={<StoryList />} />
        <Route path="/admin/comic/:id" element={<DetailManga />} />

        {/* home,login,register */}
        <Route path="/" element={<Home />} />

        <Route path="/comic/login" element={<Login />} />

        <Route path="/comic/register" element={<Register />} />

        {/* comic */}
        <Route path="/comic" element={<Comic />} />
        <Route path="/comic/:id" element={<DetailComic />} />
        <Route path="/comic/:id/:chapterId" element={<ReadComic />} />
        <Route path="/comic/whats-new" element={<WhatsNewAll />} />
        <Route path="/comic/coming-soon" element={<ComingALl />} />

        {/* search */}
        <Route path="/comic/search-results/:searchValue" element={<Search />} />

        {/* error */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};
export default PublicRouter;
