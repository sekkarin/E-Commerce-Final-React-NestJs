import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './Routes/Router.jsx'
import {RouterProvider} from "react-router-dom";
import "./App.css"
import AuthProvider from './context/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
)
