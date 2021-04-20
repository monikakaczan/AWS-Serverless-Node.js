'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.handler = async (event) => {

    try {
        const productsResponse = await fetch('https://assignment.dwbt.tech/products');
        
        if (productsResponse.ok) {
            const jsonProductResponse = await productsResponse.json();

            const imagesResponse = await fetch('https://assignment.dwbt.tech/images');
            
            if(imagesResponse.ok) {
                const jsonImagesResponse = await imagesResponse.json();

                const mergedData = jsonProductResponse.products.map(product => {
                    
                    return { 
                        ...product,
                        images: jsonImagesResponse.images[product.sku]

                    }
                })

                for (const singleDataSet of mergedData) {
                    
                    const params = {
                        Bucket: 'dwbucket-sku',
                        Key: singleDataSet.sku,
                        Body: JSON.stringify(singleDataSet)
                    }

                    const result = await s3.upload(params).promise();
                        
                    }
                }
            }
            
            console.log("Uploaded successfully.")
        
        } catch (err) {
            console.log(err);
        }
};

