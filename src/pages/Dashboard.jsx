import { useEffect, useState } from "react";
import {
  getSubmissions,
  getApproved,
  approveWish,
  deleteWish,
} from "../services/wishService";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [wishes, setWishes] = useState([]);
  const [approved, setApproved] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();

    const timer = setInterval(() => {
      loadData();
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    const wishesData = await getSubmissions();
    const approvedData = await getApproved();

    setWishes(wishesData);
    setApproved(approvedData);
  };

  const toggleApprove = async (wish) => {
    const isApproved = approved.some(
      (item) => item.id === wish.id
    );

    await approveWish(wish.id, !isApproved);

    await loadData();
  };

  const approveAll = async () => {
    for (const wish of wishes) {
      await approveWish(wish.id, true);
    }

    await loadData();
  };


  const clearAll = async () => {
    const confirmed = window.confirm(
      "Delete ALL wishes?"
    );

    if (!confirmed) return;

    for (const wish of wishes) {
      await deleteWish(wish.id);
    }

    await loadData();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this wish?"
    );

    if (!confirmed) return;

    await deleteWish(id);

    await loadData();
  };

  const filtered = wishes.filter(
    (wish) =>
      wish.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      wish.message
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Wishes Moderation Dashboard
        </h1>

        <div className="stats">
          <div className="stat-card">
            Total: <span>{wishes.length}</span>
          </div>

          <div className="stat-card">
            Pending:
            <span>
              {wishes.length - approved.length}
            </span>
          </div>

          <div className="stat-card">
            Approved:
            <span>{approved.length}</span>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search wishes or names..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="toolbar-buttons">
          <button
            className="approve-all-btn"
            onClick={approveAll}
          >
            Approve All Pending
          </button>

          <button
            className="clear-btn"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>

      </div>

      <div className="wishes-grid">
        {filtered.map((wish) => {
          const isApproved = approved.some(
            (item) => item.id === wish.id
          );

          return (
            <div
              key={wish.id}
              className="wish-item"
            >
              <div className="wish-content">
                <h3>{wish.name}</h3>
                <p>{wish.message}</p>
              </div>

              <div className="actions">
                <button
                  className="approve-btn"
                  onClick={() => toggleApprove(wish)}
                >
                  {isApproved
                    ? "Unapprove"
                    : "Approve"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(wish.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}