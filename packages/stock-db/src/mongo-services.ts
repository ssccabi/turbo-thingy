/* eslint-disable no-console */
import * as mongoDB from 'mongodb'

const mongoUrl = 'mongodb://localhost:27017'
const DB_NAME = 'stocks'

const dbClient: mongoDB.MongoClient = new mongoDB.MongoClient(mongoUrl)

const collections: { [key: string]: mongoDB.Collection } = {}

// Initialize the DB with a master, copy and iterating collection
async function initDb(
  CSV_REG_COLLECTION: string,
  MASTER_COLLECTION: string,
  MASTER_COLLECTION_INDEX: string,
  COPY_COLLECTION: string,
  COPY_COLLECTION_INDEX: string
) {
  try {
    await dbClient.connect()
    const db: mongoDB.Db = dbClient.db(DB_NAME)
    const existingCollections = (
      await db.listCollections({}, { nameOnly: true }).toArray()
    ).map((item: mongoDB.Document) => item.name)

    console.log(existingCollections)

    if (existingCollections.includes(COPY_COLLECTION)) {
      console.log('CopyColl already exists')
    } else {
      collections[COPY_COLLECTION] = await db.createCollection(COPY_COLLECTION)
      const indexCopy: { [key: string]: number } = COPY_COLLECTION_INDEX.split(
        ', '
      ).reduce((acc: { [key: string]: number }, index) => {
        acc[index] = 1
        return acc
      }, {})
      console.log(indexCopy)
      await collections[COPY_COLLECTION!].createIndex(indexCopy, {
        unique: true
      })
    }
    if (existingCollections.includes(MASTER_COLLECTION)) {
      console.log('MasterColl already exists')
    } else {
      collections[MASTER_COLLECTION!] = await db.createCollection(
        MASTER_COLLECTION
      )
      const indexMaster: { [key: string]: number } =
        MASTER_COLLECTION_INDEX.split(', ').reduce(
          (acc: { [key: string]: number }, index) => {
            acc[index] = 1
            return acc
          },
          {}
        )
      console.log(indexMaster)
      await collections[MASTER_COLLECTION].createIndex(indexMaster, {
        unique: true
      })
    }

  } catch (error) {
    console.log(error)
  }
}

async function connectCollection(
  collName: string
): Promise<mongoDB.Collection | null> {
  try {
    await dbClient.connect()
    const db: mongoDB.Db = dbClient.db(DB_NAME)
    return db.collection(collName)
  } catch (error) {
    console.log(error)
    return null
  }
}

async function writeDb(
  docs: { [key: string]: any }[],
  collName: string,
  isMaster: boolean,
  index: string, // index of master collection - e.g. 'ludocid'
  timeStamp?: number
) {
  try {
    const coll = await connectCollection(collName)
    if (isMaster) {
      // const filters: { [key: string]: string | number }[] = docs.map((doc) => {
      //   const filter: { [key: string]: string | number } = {}
      //   filter[index] = doc[index]
      //   return filter
      // })
      await Promise.allSettled(
        docs.map(async (doc) => {
          const tmDoc: { [key: string]: string | number } = { ...doc }
          if (timeStamp) {
            tmDoc.timeStamp = timeStamp
          }
          const filter: { [key: string]: string | number } = {}
          filter[index] = doc[index]
          await coll?.updateOne(filter, { $set: tmDoc }, { upsert: true })
        })
      )
    } else if (timeStamp) {
      const tmDocs = docs.map((doc) => {
        const tmDoc: { [key: string]: string | number } = { ...doc }
        tmDoc.timeStamp = timeStamp
        return tmDoc
      })
      await coll?.insertMany(tmDocs, { ordered: false })
    } else {
      await coll?.insertMany(docs)
    }
  } catch (error) {
    console.log(error)
  }
}


async function closeMongo() {
  await dbClient.close()
}

export default {
  collections,
  initDb,
  writeDb,
  closeMongo,
  connectCollection
}
