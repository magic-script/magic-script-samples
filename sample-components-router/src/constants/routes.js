// Route Definitions
import paths from '@/constants/paths'

// Containers
import { Primary, Query, Home, Paramed, Nested } from '@/containers'

export default [
  {
    exact: true,
    path: paths.home,
    component: Home,
  },
  {
    exact: false,
    path: paths.primary,
    component: Primary,
  },
  {
    exact: true,
    path: paths.query,
    component: Query,
  },
  {
    exact: false,
    path: paths.paramed,
    component: Paramed,
  },
  {
    exact: false,
    path: paths.nested,
    component: Nested,
  },
]
