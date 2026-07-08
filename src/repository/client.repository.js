import prisma from '../config/prisma.js';

export const createClient = async(data)=>{
  const client = await prisma.clientConfig.create({
    data: data
  });
  return client;
}


export const getClientByClientId = async(clientId)=>{
  return prisma.clientConfig.findUnique({
    where:{
      clientId
    }
  });
}

export const updateClientByClientId = async(clientId, data)=>{
  return prisma.clientConfig.update({
    where:{
      clientId
    },
    data
  });
}

export const deleteClientByClientId = async(clientId)=>{
  return prisma.clientConfig.delete({
    where:{
      clientId
    }
  })
}

export const getAllClients = async(skip , limit)=>{
  return prisma.clientConfig.findMany({
    skip,
    take:limit,
    orderBy:{
       createdAt:"desc"
    }
  })
}

export const countAllClients = async()=>{
  return prisma.clientConfig.count();
}