import React, { useState } from 'react';
import axios from 'axios';

const Supervisor = () => {
    const [password, setPassword] = useState('');
    const [productId, setProductId] = useState('');
    const [qty, setQty] = useState(0);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Untuk menampilkan form input password

    const handlePasswordSubmit = async (action) => {
        try {
            if (action === 'reduce') {
                const response = await axios.post('/api/products/reduceQty', { productId, qty, password });
                alert(response.data.message);
            } else if (action === 'delete') {
                const response = await axios.delete(`/api/products/deleteProduct/${productId}`, { data: { password } });
                alert(response.data.message);
            }
            // Reset form setelah aksi
            setProductId('');
            setQty(0);
            setPassword('');
            setIsPasswordVisible(false);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Supervisor Management</h2>
            <input 
                type="text" 
                placeholder="Product ID" 
                value={productId}
                onChange={(e) => setProductId(e.target.value)} 
            />
            {isPasswordVisible && (
                <>
                    <input 
                        type="number" 
                        placeholder="Qty" 
                        value={qty}
                        onChange={(e) => setQty(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Supervisor Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button onClick={() => handlePasswordSubmit('reduce')}>Reduce Qty</button>
                    <button onClick={() => handlePasswordSubmit('delete')}>Delete Product</button>
                </>
            )}
            {!isPasswordVisible && (
                <button onClick={() => setIsPasswordVisible(true)}>Masukkan Password</button>
            )}
        </div>
    );
};

export default Supervisor;
