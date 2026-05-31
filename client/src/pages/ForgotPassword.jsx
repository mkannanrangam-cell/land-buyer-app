import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { verifyIdentity, resetPassword } from '../services/api';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleVerify = async (e) => {
    e.preventDefault(); setError(''); setInfo(''); setLoading(true);
    try {
      const res = await verifyIdentity(username, phone);
      setResetToken(res.data.resetToken);
      setInfo('Identity verified. Choose a new password.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not verify your details');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault(); setError('');
    if (newPassword !== confirm) { setError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await resetPassword(resetToken, newPassword);
      setInfo('Password updated! Redirecting to login...');
      setTimeout(() => history.push('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container auth-card">
      <h2>Reset Password</h2>
      <div className="steps">Step {step} of 2</div>
      {error && <p className="error">{error}</p>}
      {info && <p className="info">{info}</p>}

      {step === 1 && (
        <form onSubmit={handleVerify}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Registered Mobile Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +15551234567"
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleReset}>
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <label>Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</button>
        </form>
      )}

      <p className="auth-foot"><Link to="/">Back to login</Link></p>
    </div>
  );
};

export default ForgotPassword;
