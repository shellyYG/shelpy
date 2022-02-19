require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId= process.env.AWS_ACCESS_KEY;
const secreteAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secreteAccessKey
})

// upload a file to s3
function uploadFile(file, folder) {
    const fileStream = fs.createReadStream(file.path);
    const mimeType = file.mimetype;
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        ContentType: mimeType,
        Key: `${folder}/${file.filename}`,
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile;


// download a file from s3 to get url
function getFileStream(fileKey) {
    if (!fileKey || fileKey === 'null') {
      throw Error('error_no_matched_aws_s3_file');
    } else {
      const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
      };
      return s3.getObject(downloadParams);
    }
}
exports.getFileStream = getFileStream;