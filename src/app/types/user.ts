import { Image } from './image';

export interface User {
  id: string,
  username: string,
  email: string,
  provider?: string,
  confirmed?: false,
  blocked?: false,
  role?: {
    id: string,
    name: string,
    description: string,
    type: string,
    permissions: [
      string
    ],
    users: [
      string
    ]
  },
  firstname?: string,
  lastname?: string,
  profile?: {
    id: string,
    name: string,
    alternativeText: string,
    caption: string,
    width: 0,
    height: 0,
    formats: {},
    hash: string,
    ext: string,
    mime: string,
    size: 0,
    url: string,
    previewUrl: string,
    provider: string,
    provider_metadata: {},
    related: string
  },
  images?: Image[],
  active?: true
}
