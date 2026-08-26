import { useEffect, useState } from "react";
import { getApproved } from "../services/wishService";
import "../styles/display.css";

export default function Display() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getApproved();
      setWishes(data);
    };

    loadData();

    const timer = setInterval(loadData, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="top-header">
        <div className="header-title">
          Lanterns of Wishes
        </div>

        <div className="wishes-counter">
          <span>{wishes.length}</span> wishes
        </div>
      </header>

      <div className="lantern-viewport">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
        <div className="stars-bright"></div>
        <div className="stars-shimmer"></div>

        {wishes.map((wish, index) => (
          <div
            key={wish.id}
            className="lantern-wrapper"
            style={{
              left: `${((index * 22) % 80) + 5}%`,
              animation: `floatSky1 ${
                34 + (index % 5) * 3
              }s linear infinite`,
              animationDelay: `${(index * 1.4) % 10}s`,
            }}
          >
            <div className="lantern-body">
              <div className="lantern-name">
                {wish.name}
              </div>

              <div className="lantern-message">
                {wish.message}
              </div>
            </div>

            <div className="lantern-base-collar"></div>

            <div className="lantern-bottom-glow"></div>
          </div>
        ))}
      </div>

      {wishes.length > 0 && (
        <div className="latest-wish-banner">
          <span className="latest-wish-label">
            ✨ Latest Wish:
          </span>

          <span className="latest-wish-message">
            {wishes[wishes.length - 1].message}
          </span>
        </div>
      )}
    </>
  );
}