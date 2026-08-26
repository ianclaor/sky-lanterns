import { useEffect, useState } from "react";
// import { getApproved } from "../services/wishService";
import { subscribeApproved } from "../services/wishService";
import "../styles/display.css";

export default function Display() {
    //   const [wishes, setWishes] = useState([]);

    //   useEffect(() => {
    //     const loadData = async () => {
    //       const data = await getApproved();
    //       setWishes(data);
    //     };

    //     loadData();

    //     const timer = setInterval(loadData, 11000);

    //     return () => clearInterval(timer);
    //   }, []);

    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        const unsubscribe = subscribeApproved(
            (data) => {
                setWishes(data);
            }
        );

        return () => unsubscribe();
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
                        onAnimationEnd={() => {
                            setWishes((prev) =>
                                prev.filter(
                                    (item) => item.id !== wish.id
                                )
                            );
                        }}
                        style={{
                            left: `${((index * 22) % 80) + 5}%`,
                            animation: "floatSky1 25s linear forwards",
                            animationDelay: `${index * 0.8}s`,
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