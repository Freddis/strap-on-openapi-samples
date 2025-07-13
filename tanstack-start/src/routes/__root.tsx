/// <reference types="vite/client" />
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { ReactNode } from 'react'

export const Route = createRootRoute({
  shellComponent: Layout,
  notFoundComponent: () => <div>Page not found</div>
})
const queryClient = new QueryClient();
function Layout(props: {children: ReactNode}) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}