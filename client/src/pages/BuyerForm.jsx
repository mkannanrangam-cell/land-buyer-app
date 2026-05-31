// ...existing code...
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { addBuyer, updateBuyer, deleteBuyer, getBuyerById } from '../services/api';

const BuyerForm = ({ buyerId: buyerIdProp }) => {
  const { buyerId: buyerIdParam } = useParams();
  const buyerId = buyerIdProp || buyerIdParam;
  const history = useHistory();

  const [buyerData, setBuyerData] = useState({
    name: '',
    phone: '',
    sqft: '',
    city: '',
    area: '',
    pincode: '',
    cost: ''
  });

  useEffect(() => {
    if (!buyerId) return;
    const load = async () => {
      try {
        const res = await getBuyerById(buyerId);
        if (res?.data) setBuyerData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [buyerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...buyerData,
        sqft: Number(buyerData.sqft),
        cost: Number(buyerData.cost)
      };
      if (buyerId) await updateBuyer(buyerId, payload);
      else await addBuyer(payload);
      history.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!buyerId) return;
    try {
      await deleteBuyer(buyerId);
      history.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{buyerId ? 'Update Buyer' : 'Add Buyer'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={buyerData.name} onChange={handleChange} placeholder="Name" required />
        <input name="phone" value={buyerData.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="sqft" type="number" value={buyerData.sqft} onChange={handleChange} placeholder="Land Sqft" required />
        <input name="city" value={buyerData.city} onChange={handleChange} placeholder="City" required />
        <input name="area" value={buyerData.area} onChange={handleChange} placeholder="Area" required />
        <input name="pincode" value={buyerData.pincode} onChange={handleChange} placeholder="Pincode" required />
        <input name="cost" type="number" value={buyerData.cost} onChange={handleChange} placeholder="Land Cost" required />
        <button type="submit">{buyerId ? 'Update' : 'Add'} Buyer</button>
        {buyerId && <button type="button" onClick={handleDelete}>Delete Buyer</button>}
      </form>
    </div>
  );
};

export default BuyerForm;