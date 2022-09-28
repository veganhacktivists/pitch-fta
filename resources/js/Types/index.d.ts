type DateTime = string

export type Nullable<T> = T | null

export interface User {
  id: number
  name: string
  email: string
  profile_photo_path: Nullable<string>
  profile_photo_url: string
  two_factor_enabled: boolean
  email_verified_at: Nullable<DateTime>
  created_at: DateTime
  updated_at: DateTime
}

export type InertiaSharedProps<T = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  user: User
  errorBags: any
  errors: any
}
