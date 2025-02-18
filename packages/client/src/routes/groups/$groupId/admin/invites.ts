import { createFileRoute } from '@tanstack/react-router'

import { getInvitesOptions } from '@synergy/features/invites'

export const Route = createFileRoute('/groups/$groupId/admin/invites')({
  beforeLoad: async ({ params, context }) => {
    const { queryClient } = context
    const { groupId } = params
    await queryClient.ensureQueryData(getInvitesOptions(queryClient, groupId))
  },
})
