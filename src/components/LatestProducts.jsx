import React from 'react';

const products = [
    { name: "Soja & Co. Eucalyptus", date: "Oct 11, 2024" },
    { name: "Necessaire Body Lotion", date: "Oct 11, 2024" },
    { name: "Ritual of Sakura", date: "Oct 11, 2024" },
    { name: "Lancome Rouge", date: "Oct 11, 2024" },
    { name: "Erbology Aloe Vera", date: "Oct 11, 2024" }
];

function LatestProducts() {
    return (
        <div style={{ padding: '20px', background: '#f4f6f8', borderRadius: '10px', flex: 1 }}>
            <h3>Latest Products</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map((product, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                        <span>{product.name}</span>
                        <span>{product.date}</span>
                    </li>
                ))}
            </ul>
            <a href="#">View all</a>
        </div>
    );
}

export default LatestProducts;
