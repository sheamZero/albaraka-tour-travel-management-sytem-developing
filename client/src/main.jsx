import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000, // ⏱️ default toast time (3s)
            style: {
              background: "#0f172a", 
              color: "#fff",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#16a34a", 
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626", 
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#dc2626",
              },
            },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
