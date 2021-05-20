import Head from 'next/head';
import { Fragment, ReactNode } from "react";

import Navbar from './Navbar'
import Body from './Body';
import Footer from './Footer';
import { AuthProvider } from '../../libs/contexts/auth';
import { AuthenticationData } from '../../libs/props/auth';
import { CategoryData } from '../../libs/props/category';
import { CategoryProvider } from 'src/libs/contexts/category';


interface LayoutProps {
  children: ReactNode,
  authenticationData: AuthenticationData,
  categoryData: CategoryData,
  title?: string,
}

export default function Layout({ children, authenticationData, categoryData, title }: LayoutProps) {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {title && <title>{`essayb | ${title}`}</title>}

        {/* bootstrap 5 */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css" />
      </Head>

      <AuthProvider authenticationData={authenticationData}>
        <CategoryProvider categoryData={categoryData}>
          <Navbar />
          <Body>
            {children}
          </Body>
          <Footer />
        </CategoryProvider>
      </AuthProvider>

    </Fragment>
  )
}