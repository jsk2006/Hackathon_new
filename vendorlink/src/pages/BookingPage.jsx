import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [supplierId, setSupplierId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch suppliers (users with user_type supplier)
  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase.rpc('get_suppliers');
      if (!error) setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  // Fetch products (dummy or from your products table)
  useEffect(() => {
    // Example: fetch from products table if exists
    // For now, use dummy data
    setProducts([
      { id: '1', name: 'Potatoes' },
      { id: '2', name: 'Onions' },
      { id: '3', name: 'Tomatoes' },
    ]);
  }, []);

  // Fetch bookings for this user (vendor or supplier)
  useEffect(() => {
    const fetchBookings = async () => {
      let { data, error } = await supabase
        .from('bookings')
        .select('*')
        .or(`vendor_id.eq.${user?.id},supplier_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });
      if (!error) setBookings(data);
    };
    if (user) fetchBookings();
  }, [user]);

  // Create booking (vendor only)
  const handleBooking = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!supplierId || !productId || !quantity) {
      setError('All fields required');
      return;
    }
    const { error } = await supabase.from('bookings').insert([
      {
        vendor_id: user.id,
        supplier_id: supplierId,
        product_id: productId,
        quantity: Number(quantity),
        status: 'pending',
      },
    ]);
    if (error) setError(error.message);
    else {
      setSuccess('Booking created!');
      setSupplierId(''); setProductId(''); setQuantity(1);
    }
  };

  return (
    <div className="booking-page">
      <h2>Booking System</h2>
      {user?.user_metadata?.user_type === 'vendor' && (
        <form onSubmit={handleBooking}>
          <select value={supplierId} onChange={e => setSupplierId(e.target.value)} required>
            <option value="">Select Supplier</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.email}</option>
            ))}
          </select>
          <select value={productId} onChange={e => setProductId(e.target.value)} required>
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} required />
          <button type="submit">Create Booking</button>
        </form>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <h3>Your Bookings</h3>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            Product: {b.product_id}, Quantity: {b.quantity}, Status: {b.status}, Supplier: {b.supplier_id}, Vendor: {b.vendor_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage; 