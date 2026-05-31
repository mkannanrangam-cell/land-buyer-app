import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchBuyers, deleteBuyer } from '../services/api';
import BuyerList from '../components/BuyerList';
import '../styles/app.css';

const formatCost = (value) => {
  const n = Number(value);
  return Number.isNaN(n) ? value : `$${n.toLocaleString()}`;
};

const Dashboard = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchBuyers();
        setBuyers(res.data); // axios wraps the array in res.data
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load buyers');
        console.error('Error fetching buyers:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleEdit = (id) => history.push(`/buyer-form/${id}`);

  const handleDelete = async (id) => {
    try {
      await deleteBuyer(id);
      setBuyers(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting buyer:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  // Summary stats derived from the buyer list
  const totalBuyers = buyers.length;
  const totalInvestment = buyers.reduce((sum, b) => sum + (Number(b.cost) || 0), 0);
  const totalLand = buyers.reduce((sum, b) => sum + (Number(b.sqft) || 0), 0);
  const cities = new Set(buyers.map(b => b.city).filter(Boolean)).size;

  return (
    <div className="dashboard-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Land Buyer Dashboard</h1>
          <p>Manage your land buyers, track investments, and grow your portfolio — all in one place.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => history.push('/buyer-form')}>
              + Add New Buyer
            </button>
            <button className="btn-ghost" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </section>

      <div className="dash-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <div className="stat-value">{totalBuyers}</div>
              <div className="stat-label">Total Buyers</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div>
              <div className="stat-value">{formatCost(totalInvestment)}</div>
              <div className="stat-label">Total Investment</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📐</div>
            <div>
              <div className="stat-value">{totalLand.toLocaleString()} sqft</div>
              <div className="stat-label">Total Land</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏙️</div>
            <div>
              <div className="stat-value">{cities}</div>
              <div className="stat-label">Cities</div>
            </div>
          </div>
        </div>

        <BuyerList
          buyers={buyers}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
