import { SidebarLayout } from './SidebarLayout'
import { ReactNode } from 'react'

type IProps = {
  children: ReactNode
}

export const AppLayout = ({ children }: IProps) => {
  return (
    <div className="flex">
      <aside>
        <SidebarLayout />
      </aside>
      <main className="flex-1 px-8 py-4">{children}</main>
    </div>
  )
}
