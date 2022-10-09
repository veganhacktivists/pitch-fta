import { Badge, BadgeTask, User } from '@/Types'

export const hasBadge = (user: User, badge: Badge) => {
  return !!user.badges.find((b) => b.id === badge.id)
}

export const didBadgeTask = (user: User, badgeTask: BadgeTask) => {
  return !!user.badge_tasks.find((bt) => bt.id === badgeTask.id)
}

export const getBadgeProgress = (user: User, badge?: Badge | null) => {
  if (!badge) {
    return 0
  }

  let numCompletedTasks = 0

  badge.tasks.forEach((badgeTask) => {
    if (didBadgeTask(user, badgeTask)) {
      numCompletedTasks++
    }
  })

  return numCompletedTasks
}
