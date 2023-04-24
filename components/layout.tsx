import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { ReactNode } from "react"
import styled from 'styled-components'

const HeaderStyle = styled.div`
  width: 100vw;
  height: 64px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: auto 10vw;
  
`
const LayoutStyle = styled.div`
  font-family: sans-serif;
  width: 100vw;
  min-height: 100vh;
`

const Header = () => {
  const { data: session } = useSession()
  console.log(session, ':::session')
  return (
    <HeaderStyle>
      <Link href={'/'}>Home</Link>
      <Link href={'/admin'}>Dashboard</Link>
      <Link href={'/admin/user-panel'}>User Panel</Link>
      <div className="user">
        {session?.user ? (<>
          <p>{session.user.user.name}</p>
          <Link href={'/login'}>
            <button onClick={() => signOut()}>
              Logout
            </button>
          </Link>
        </>) : (<button onClick={() => signIn()}>Login</button>)}
      </div>
    </HeaderStyle>
  )
}

interface Iprops {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: Iprops) {
  return (
    <SessionProvider session={session}>
      <LayoutStyle>
        <Header />
        <div>{children}</div>
      </LayoutStyle>
    </SessionProvider>
  )
}
