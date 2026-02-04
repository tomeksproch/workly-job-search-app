import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { MongoClient } from 'mongodb'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { initializeUserBoard } from '../models/init-user-board'

declare global {
  var _mongoClient: MongoClient | undefined
}

const uri = process.env.MONGODB_URI!

if (!uri) {
  throw new Error('Brak zmiennej MONGODB_URI w pliku .env')
}

let client: MongoClient

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri)
  }
  client = global._mongoClient
} else {
  client = new MongoClient(uri)
}

const db = client.db()

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id)
          }
        },
      },
    },
  },
})

export async function getSession(requestHeaders?: Headers) {
  const result = await auth.api.getSession({
    headers: requestHeaders || (await headers()),
  })
  return result
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  })

  if (result.success) {
    redirect('/sign-in')
  }
}
