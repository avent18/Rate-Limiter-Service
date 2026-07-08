import prisma from '../config/prisma.js';

export const getBucketByClientConfigId = async(clientConfigId) => {
  return await prisma.bucketState.findUnique({
    where: {
      clientConfigId
    }
  });
}


export const createBucket = async(data)=>{
  return await prisma.bucketState.create({
    data
  })
}

export const updateBucket = async(clientConfigId, data)=>{
  return await prisma.bucketState.update({
    where: {
      clientConfigId
    },
    data
  })
}

export const resetBucket = async(clientConfigId, data)=>{
  return await prisma.bucketState.update({
    where: {
      clientConfigId
    },
    data
  })
}