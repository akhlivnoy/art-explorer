/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as authRouteImport } from './routes/(auth)/route'
import { Route as IndexImport } from './routes/index'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as AuthPostsRouteImport } from './routes/_auth/posts/route'
import { Route as AuthPostsIndexImport } from './routes/_auth/posts/index'
import { Route as AuthPostsPostIdImport } from './routes/_auth/posts/$postId'

// Create/Update Routes

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const authRouteRoute = authRouteImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authRouteRoute,
} as any)

const AuthPostsRouteRoute = AuthPostsRouteImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthPostsIndexRoute = AuthPostsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthPostsRouteRoute,
} as any)

const AuthPostsPostIdRoute = AuthPostsPostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => AuthPostsRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/posts': {
      id: '/_auth/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthPostsRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/(auth)/login': {
      id: '/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof authRouteImport
    }
    '/_auth/posts/$postId': {
      id: '/_auth/posts/$postId'
      path: '/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof AuthPostsPostIdImport
      parentRoute: typeof AuthPostsRouteImport
    }
    '/_auth/posts/': {
      id: '/_auth/posts/'
      path: '/'
      fullPath: '/posts/'
      preLoaderRoute: typeof AuthPostsIndexImport
      parentRoute: typeof AuthPostsRouteImport
    }
  }
}

// Create and export the route tree

interface authRouteRouteChildren {
  authLoginRoute: typeof authLoginRoute
}

const authRouteRouteChildren: authRouteRouteChildren = {
  authLoginRoute: authLoginRoute,
}

const authRouteRouteWithChildren = authRouteRoute._addFileChildren(
  authRouteRouteChildren,
)

interface AuthPostsRouteRouteChildren {
  AuthPostsPostIdRoute: typeof AuthPostsPostIdRoute
  AuthPostsIndexRoute: typeof AuthPostsIndexRoute
}

const AuthPostsRouteRouteChildren: AuthPostsRouteRouteChildren = {
  AuthPostsPostIdRoute: AuthPostsPostIdRoute,
  AuthPostsIndexRoute: AuthPostsIndexRoute,
}

const AuthPostsRouteRouteWithChildren = AuthPostsRouteRoute._addFileChildren(
  AuthPostsRouteRouteChildren,
)

interface AuthRouteRouteChildren {
  AuthPostsRouteRoute: typeof AuthPostsRouteRouteWithChildren
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthPostsRouteRoute: AuthPostsRouteRouteWithChildren,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof authRouteRouteWithChildren
  '': typeof AuthRouteRouteWithChildren
  '/posts': typeof AuthPostsRouteRouteWithChildren
  '/login': typeof authLoginRoute
  '/posts/$postId': typeof AuthPostsPostIdRoute
  '/posts/': typeof AuthPostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof authRouteRouteWithChildren
  '': typeof AuthRouteRouteWithChildren
  '/login': typeof authLoginRoute
  '/posts/$postId': typeof AuthPostsPostIdRoute
  '/posts': typeof AuthPostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(auth)': typeof authRouteRouteWithChildren
  '/_auth': typeof AuthRouteRouteWithChildren
  '/_auth/posts': typeof AuthPostsRouteRouteWithChildren
  '/(auth)/login': typeof authLoginRoute
  '/_auth/posts/$postId': typeof AuthPostsPostIdRoute
  '/_auth/posts/': typeof AuthPostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/posts' | '/login' | '/posts/$postId' | '/posts/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/login' | '/posts/$postId' | '/posts'
  id:
    | '__root__'
    | '/'
    | '/(auth)'
    | '/_auth'
    | '/_auth/posts'
    | '/(auth)/login'
    | '/_auth/posts/$postId'
    | '/_auth/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  authRouteRoute: typeof authRouteRouteWithChildren
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  authRouteRoute: authRouteRouteWithChildren,
  AuthRouteRoute: AuthRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(auth)",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(auth)": {
      "filePath": "(auth)/route.tsx",
      "children": [
        "/(auth)/login"
      ]
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/posts"
      ]
    },
    "/_auth/posts": {
      "filePath": "_auth/posts/route.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/posts/$postId",
        "/_auth/posts/"
      ]
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.tsx",
      "parent": "/(auth)"
    },
    "/_auth/posts/$postId": {
      "filePath": "_auth/posts/$postId.tsx",
      "parent": "/_auth/posts"
    },
    "/_auth/posts/": {
      "filePath": "_auth/posts/index.tsx",
      "parent": "/_auth/posts"
    }
  }
}
ROUTE_MANIFEST_END */
