
import redis from "../config/redis.js";

const BUCKET_TTL = Number(process.env.BUCKET_TTL);
const getBucketKey = (clientId) => `bucket:${clientId}`;   
//helper fn for production for key making
//better than making key `bucket:${clientId}`
export const getBucket = async (clientId) => {
  const value = await redis.get(getBucketKey(clientId));
  if (!value) return null;
  const bucket = JSON.parse(value);
  bucket.lastRefill = new Date(bucket.lastRefill);
  return bucket;
};


export const createBucket = async(clientId, bucket)=>{
 //redis only stores string, doesn't understand object
  await redis.set(getBucketKey(clientId), JSON.stringify(bucket), "EX", BUCKET_TTL);
  return bucket;
}


export const updateBucket = async(clientId, bucket)=>{
  await redis.set(getBucketKey(clientId), JSON.stringify(bucket), "EX", BUCKET_TTL);  //returns object
  return bucket;
}


export const deleteBucket = async(clientId)=>{
  return await redis.del(getBucketKey(clientId));  //returns 0 or 1;
}
