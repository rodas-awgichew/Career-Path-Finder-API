// /// <reference types="vite/client" />

// // safe access to VITE env (works in dev/prod and avoids TS/runtime errors)
// let _VITE_API: string | undefined;
// try {
//   // import.meta can cause TS/compile errors in some environments — ignore the check here
//   // @ts-ignore
//   _VITE_API = (import.meta as any)?.env?.VITE_API_BASE_URL;
// } catch {
//   _VITE_API = undefined;
// }
// // allow an optional global fallback (useful for tests/SSR) and ensure no trailing slash
// const API_BASE = ((_VITE_API || (globalThis as any).__VITE_API_BASE_URL__) || '/api').replace(/\/$/, '');

// type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// async function request<T = any>(path: string, method: HTTPMethod = 'GET', data?: unknown): Promise<T> {
//   const url = `${API_BASE}${path}`;
//   const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
//   const headers: Record<string, string> = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   };
//   if (token) headers['Authorization'] = `Bearer ${token}`;

//   const res = await fetch(url, {
//     method,
//     headers,
//     body: data && method !== 'GET' ? JSON.stringify(data) : undefined,
//   });

//   if (res.status === 204) return null as unknown as T;

//   const text = await res.text();
//   const payload = text ? JSON.parse(text) : null;

//   if (!res.ok) {
//     const message = (payload && (payload.detail || payload.message)) || res.statusText || 'API error';
//     throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
//   }

//   return payload as T;
// }

// // API helpers
// export async function fetchJobs() {
//   return request<any[]>('/jobs/', 'GET');
// }

// export async function fetchJob(id: number | string) {
//   return request<any>(`/jobs/${id}/`, 'GET');
// }

// export async function postContact(payload: Record<string, unknown>) {
//   return request<any>('/contact/', 'POST', payload);
// }

// export async function createJob(payload: Record<string, unknown>) {
//   return request<any>('/jobs/', 'POST', payload);
// }

// export async function updateJob(id: number | string, payload: Record<string, unknown>) {
//   return request<any>(`/jobs/${id}/`, 'PATCH', payload);
// }

// export async function deleteJob(id: number | string) {
//   return request<void>(`/jobs/${id}/`, 'DELETE');
// }
