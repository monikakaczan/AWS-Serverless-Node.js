The buzz 📚

AWS Lambda, API Gateway, S3 storage, Node.js, Serverless

The idea and how it works 💡

The scheduled Lambda function kicks off fetching the data from the two provided endpoints (/products, /images) every 30 days (time chosen at random). The function first fetches the data from the endpoints via node-fetch and merges the results. By using the AWS SDK it sends the merged data to the S3 storage. 

I chose the S3 bucket because it's quite easy to set up and interract with. I think it serves a good flexibility and visibility in terms of what it can do/ from what resources it can get the data and where it can send the data to (via permissions). 

To retrieve the data from the bucket I used API Gateway and another Lambda function which if it has the optional parameter /{productId} provided - it fetches the product by it's id(sku), otherwise it will log an error and return 502.

The tools 🔨

AWS SDK - interraction with AWS console/storage 
Node-fetch - easier, more readable promises 

Running the project 

1. Run ./build.sh && ./package.sh && ./deploy.sh 
2. API endpoint available to test in Postman: (GET) https://b4ng89mft5.execute-api.eu-north-1.amazonaws.com/dev/products/{productId}





