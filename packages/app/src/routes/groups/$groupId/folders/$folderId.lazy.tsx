import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/groups/$groupId/folders/$folderId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/groups/$groupId/folders/$folderId"!</div>
}
