import { createFileRoute } from '@tanstack/react-router'

import { getMembersOptions } from '@synergy/features/members'

export const Route = createFileRoute('/groups/$groupId/admin/members')({
  beforeLoad: async ({ params, context }) => {
    const { queryClient } = context
    const { groupId } = params
    await queryClient.ensureQueryData(getMembersOptions(queryClient, groupId))
  },
})
