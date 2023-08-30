import { Link, useMatch } from "react-router-dom";

function TopDetailComic() {
  const comicMatch = useMatch("/comic");
  const whatsNewMatch = useMatch("/comic/whats-new");
  const comingSoonMatch = useMatch("/comic/coming-soon");
  const topAuthorMatch = useMatch("/comic/top-author");

  return (
    <div className="top-detail">
      <div className="leftTitle-top-detail">
        <Link
          to="/comic"
          className={comicMatch ? "allComic active" : "allComic"}
        >
          All Comic
        </Link>

        <Link
          to="/comic/whats-new"
          className={whatsNewMatch ? "allComic active" : "allComic"}
        >
          What's New
        </Link>

        <Link
          to="/comic/coming-soon"
          className={comingSoonMatch ? "allComic active" : "allComic"}
        >
          Coming Soon
        </Link>

        <Link
          to="/comic/top-author"
          className={topAuthorMatch ? "allComic active" : "allComic"}
        >
          Top Author
        </Link>
      </div>
    </div>
  );
}

export default TopDetailComic;
