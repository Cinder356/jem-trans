import { createContext, useState, type PropsWithChildren } from "react";
import { type Page } from '@/app/consts/pages';

export interface PageContextValue {
  currentPage: Page;
  changePage: (page: Page) => void
}

const defaultPage: Page = 'translator';

export const PageContext = createContext<PageContextValue>({
  currentPage: defaultPage,
  changePage: () => undefined
});

export const PageProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<Page>(defaultPage);
  // const changePage = (page: Page) => setCurrentPage(page);
  return (
    <PageContext.Provider value={{ currentPage, changePage: setCurrentPage }} >
      {children}
    </PageContext.Provider>
  )
}
