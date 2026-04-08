import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import users from './users.js';
import products from './data/products.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';


dotenv.config();


const importData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();

        // Extract unique categories from product data
        const uniqueCategories = [...new Set(products.map((p) => p.category))];

        const categoryImages = {
            'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
            'Mobile': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
            'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
            'Home & Kitchen': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop',
            'Computers': 'https://images.unsplash.com/photo-1531297172866-d05ce3d62271?w=600&h=400&fit=crop',
            'Shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop',
            'Groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop'
        };

        const categoryMap = {};
        for (const catName of uniqueCategories) {
            const category = await Category.create({
                name: catName,
                image: categoryImages[catName] || `https://images.unsplash.com/photo-1472851294608-062e24fabb01?w=600&h=400&fit=crop`,
            });
            categoryMap[catName] = category._id;
        }

        const sampleProducts = products.map((product) => {
            return { ...product, category: categoryMap[product.category] };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};


const runSeeder = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
};

runSeeder();

