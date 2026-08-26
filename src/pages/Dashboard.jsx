import { useEffect, useState } from "react";
import {
  getSubmissions,
  getApproved,
  saveApproved,
} from "../Services/wishService";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [wishes, setWishes] = useState([]);
  const [approved, setApproved] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setWishes(getSubmissions());
    setApproved(getApproved());
  }, []);

  const toggleApprove = (wish) => {
    const exists = approved.find(
      (item) => item.id === wish.id
    );

    let updated = [];

    if (exists) {
      updated = approved.filter(
        (item) => item.id !== wish.id
      );
    } else {
      updated = [...approved, wish];
    }

    saveApproved(updated);
    setApproved(updated);
  };

  const approveAll = () => {
    saveApproved(wishes);
    setApproved(wishes);
  };

  const clearAll = () => {
    localStorage.removeItem("formSubmissions_v1");
    localStorage.removeItem("approvedSubmissions_v1");

    setWishes([]);
    setApproved([]);
  };

  const deleteWish = (id) => {
    const updatedWishes = wishes.filter(
      (w) => w.id !== id
    );

    const updatedApproved = approved.filter(
      (w) => w.id !== id
    );

    localStorage.setItem(
      "formSubmissions_v1",
      JSON.stringify(updatedWishes)
    );

    saveApproved(updatedApproved);

    setWishes(updatedWishes);
    setApproved(updatedApproved);
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
        onChange={(e) => setSearch(e.target.value)}
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

    {filtered.map((wish) => {
      const isApproved = approved.some(
        (item) => item.id === wish.id
      );

      return (
        <div
          key={wish.id}
          className="wish-item"
        >
          <h3>{wish.name}</h3>

          <p>{wish.message}</p>

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
                deleteWish(wish.id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
}