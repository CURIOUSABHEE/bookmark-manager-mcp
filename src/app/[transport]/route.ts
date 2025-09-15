import { verifyClerkToken } from '@clerk/mcp-tools/next'
import { createMcpHandler, experimental_withMcpAuth as withMcpAuth } from '@vercel/mcp-adapter'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getUserBookmarks, createBookmark, deleteBookmark } from '@/lib/bookmark-utils'
import { CreateBookmarkData } from '@/types/bookmark'
import { z } from 'zod'


const handler = createMcpHandler((server) => {
  server.tool(
    'get-user-bookmarks',
    'Get all bookmarks for a user',
    {},
    async (_, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId! as string

        const bookmarks = await getUserBookmarks(userId)
        return {
            content: [{type: 'text', text: JSON.stringify(bookmarks)}]
        }
      } catch (error) {
        console.error('Error getting user bookmarks', error)
        return {
            content: [{type: 'text', text: 'Error getting user bookmarks'}]
        }
      }
    }
  ),
  server.tool(
    'create-bookmark',
    'Create a new bookmark',
    {
      url: z.string().describe('The URL of the bookmark'),
      title: z.string().describe('The title of the bookmark'),
      notes: z.string().optional().describe('The notes of the bookmark'),
    },
    async (args, { authInfo}) => {
        try {
            const userId = authInfo!.extra!.userId! as string
            const bookmarkData : CreateBookmarkData = { url: args.url, title: args.title, notes: args.notes ?? '' }

            const newBookmark = await createBookmark(userId, bookmarkData)
            return {
                content: [{type: 'text', text: JSON.stringify(newBookmark)}]
            }
        } catch (error) {
            console.error('Error creating bookmark', error)
            return {
                content: [{type: 'text', text: 'Error creating bookmark'}]
            }
        }
    }
  ),
  server.tool(
    'delete-bookmark',
    'Delete a bookmark',
    {
      id: z.string().describe('The ID of the bookmark'),
    },
    async (args, { authInfo}) => {
        try {
            const userId = authInfo!.extra!.userId! as string
            const { id } = args
            await deleteBookmark(userId, id)
            return {
                content: [{type: 'text', text: 'Bookmark deleted successfully'}]
            }
        } catch (error) {
            console.error('Error deleting bookmark', error)
            return {
                content: [{type: 'text', text: 'Error deleting bookmark'}]
            }
        }
    }
)

})
const authHandler = withMcpAuth(
    handler,
    async (_, token) => {
      const clerkAuth = await auth({ acceptsToken: 'oauth_token' })
      return verifyClerkToken(clerkAuth, token)
    },
    {
      required: true,
      resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp',
    },
  )
  
  export { authHandler as GET, authHandler as POST }

