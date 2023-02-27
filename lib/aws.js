require('dotenv').config()
const AWS = require('aws-sdk')
const { CreateInvalidationCommand, CloudFrontClient } = require('@aws-sdk/client-cloudfront')


const cloudFront = new AWS.CloudFront({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION
})

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
  })






module.exports = { s3, cloudFront }