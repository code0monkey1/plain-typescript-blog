


export const objectIdToString = (objectId: any): string => objectId.toString();

export const mapDocument = (document: any): any => {
  return  {
                  id:objectIdToString(document._id),
                  content:document.content,
                  userId:objectIdToString(document.userId.toString()),
                  createdAt:document.createdAt,
                  updatedAt:document.updatedAt
            }
};


export const mapCollection = (collection: any[]): any[] => {
  return collection.map((document) => mapDocument(document));
};
