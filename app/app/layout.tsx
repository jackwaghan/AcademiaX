import React from 'react';
import Header from './Components/header';
import { Providers } from './Components/providers';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className='antialiased'>
        <Providers>
          <Header>{children}</Header>
        </Providers>
      </body>
    </html>
  );
}
