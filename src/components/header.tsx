import { NavLinks } from './navLinks'

export function Header (): React.ReactElement {
  return (
        <header className='py-4 bg-slate-900'>
            <NavLinks></NavLinks>
        </header>
  )
}
