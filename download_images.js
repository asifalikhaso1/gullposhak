const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrls = [
    'https://source.unsplash.com/800x1000/?hoodie',
    'https://source.unsplash.com/800x1000/?tshirt',
    'https://source.unsplash.com/800x1000/?shorts',
    'https://source.unsplash.com/800x1000/?pants',
    'https://source.unsplash.com/800x1000/?jacket',
    'https://source.unsplash.com/800x1000/?dress'
];

const imageNames = [
    'product1.jpg',
    'product2.jpg',
    'bestseller1.jpg',
    'bestseller2.jpg',
    'bestseller3.jpg',
    'bestseller4.jpg'
];

if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

imageUrls.forEach((url, index) => {
    https.get(url, (response) => {
        const filePath = path.join('images', imageNames[index]);
        const writeStream = fs.createWriteStream(filePath);
        response.pipe(writeStream);
        
        writeStream.on('finish', () => {
            console.log(`Downloaded: ${imageNames[index]}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${imageNames[index]}: ${err.message}`);
    });
}); 