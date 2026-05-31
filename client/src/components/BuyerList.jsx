import React from 'react';

const formatNumber = (value) => {
    const n = Number(value);
    return Number.isNaN(n) ? value : n.toLocaleString();
};

const formatCost = (value) => {
    const n = Number(value);
    return Number.isNaN(n) ? value : `$${n.toLocaleString()}`;
};

const BuyerList = ({ buyers = [], loading, error, onEdit, onDelete }) => {
    if (loading) return <p className="muted">Loading buyers...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="buyer-list card-panel">
            <h2>Land Buyers</h2>
            {buyers.length === 0 ? (
                <p className="muted">No buyers found.</p>
            ) : (
                <div className="table-wrap">
                    <table className="buyer-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Land (sqft)</th>
                                <th>City</th>
                                <th>Area</th>
                                <th>Pincode</th>
                                <th>Cost</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyers.map(buyer => (
                                <tr key={buyer.id}>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.phone}</td>
                                    <td>{formatNumber(buyer.sqft)}</td>
                                    <td>{buyer.city}</td>
                                    <td>{buyer.area}</td>
                                    <td>{buyer.pincode}</td>
                                    <td>{formatCost(buyer.cost)}</td>
                                    <td className="actions">
                                        <button onClick={() => onEdit(buyer.id)}>Edit</button>
                                        <button className="danger" onClick={() => onDelete(buyer.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BuyerList;
