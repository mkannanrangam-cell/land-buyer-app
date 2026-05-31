import React from 'react';

const BuyerCard = ({ buyer, onEdit, onDelete }) => {
    return (
        <div className="buyer-card">
            <h3>{buyer.name}</h3>
            <p>Phone: {buyer.phone}</p>
            <p>Land Size: {buyer.sqft} sqft</p>
            <p>City: {buyer.city}</p>
            <p>Area: {buyer.area}</p>
            <p>Pincode: {buyer.pincode}</p>
            <p>Cost: ${buyer.cost}</p>
            <button onClick={() => onEdit(buyer.id)}>Edit</button>
            <button onClick={() => onDelete(buyer.id)}>Delete</button>
        </div>
    );
};

export default BuyerCard;