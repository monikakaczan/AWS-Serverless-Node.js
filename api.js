'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();


module.exports.handler = async (event, context, callback) => {

    try { 

        if (typeof event.pathParameters !== 'undefined' && event.pathParameters !== null ){
        
            const productId = event.pathParameters.productId
            
            const params = { 
                Bucket: 'dwbucket-sku',
                Key: `${productId}`
            };
                    
            const data = await s3.getObject(params).promise();
        
            const response = {
                'statusCode': 200,
                'body':  data.Body.toString(),
                'headers': {'Content-type':'application/json'},
                'isBase64Encoded': false
            };

            callback(null, response)
        }  

        } catch (err) {
            console.log(err)
    }
}
