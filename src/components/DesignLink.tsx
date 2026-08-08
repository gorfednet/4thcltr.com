import { Link, useLocation, type LinkProps } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import { designAwarePath } from '../utils/designPath'

type DesignLinkProps = Omit<LinkProps, 'to'> & { to: string }

export default function DesignLink({ to, ...props }: DesignLinkProps) {
  const { recipe } = useTheme()
  const location = useLocation()
  const destination = designAwarePath(to, location.search, recipe.id)

  return <Link to={destination} {...props} />
}
