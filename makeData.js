const fs = require('fs');

const products = [];
const categories = ['smartphone', 'laptop', 'fashion', 'accessory', 'shoes', 'book'];

for (let i = 1; i <= 100; i++) {
    products.push({
        id: i.toString(),
        title: `Sản phẩm xịn xò số ${i}`,
        price: Math.floor(Math.random() * 2000) + 50, // Random giá từ 50 đến 2050$
        description: `Đây là mô tả chi tiết cho sản phẩm số ${i}. Hàng chính hãng, bảo hành 12 tháng, bao đổi trả.`,
        category: categories[Math.floor(Math.random() * categories.length)], // Random ngẫu nhiên 1 trong các danh mục trên
        image: `https://picsum.photos/id/${i + 20}/400/400`, // Lấy ảnh tự động từ id 21 trở đi
    });
}

const users = [];
for (let i = 1; i <= 300; i++) {
    users.push({
        id: i.toString(),
        username: `khachhang_${i}`,
        full_name: `Người Dùng Số ${i}`,
        email: `khachhang${i}@gmail.com`,
        password: '123',
        avatar: `https://i.pravatar.cc/150?u=${i}`, // Tự động tạo ảnh đại diện khác nhau
    });
}

// Gom tất cả lại thành 1 cục Database
const database = {
    products: products,
    users: users,
    orders: [],
};

// Lệnh ghi tất cả vào file db.json
fs.writeFileSync('db.json', JSON.stringify(database, null, 2));

console.log(' Xong! Đã tạo thành công file db.json với 100 sản phẩm và 300 users.');
