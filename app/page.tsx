"use client";
import { Dashboard } from '@/components/dashboard';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function Home() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
