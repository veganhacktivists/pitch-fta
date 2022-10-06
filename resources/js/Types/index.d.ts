type DateTime = string

export type Nullable<T> = T | null

export interface User {
  id: number
  name: string
  email: string
  num_votes: number
  referral_code: string
  profile_photo_path: Nullable<string>
  profile_photo_url: string
  two_factor_enabled: boolean
  email_verified_at: Nullable<DateTime>
  created_at: DateTime
  updated_at: DateTime
}

export interface Idea {
  id: number
  text: string
  votes_count: number
  user_id: number
  created_at: DateTime
  updated_at: DateTime
}

export interface Doodle {
  id: number
  path: string
  user_id: number
  created_at: DateTime
  updated_at: DateTime
}

export interface TriviaQuestion {
  id: number
  text: string
  answers: TriviaAnswer[]
  created_at: DateTime
  updated_at: DateTime
}

export interface TriviaAnswer {
  id: number
  text: string
  created_at: DateTime
  updated_at: DateTime
}

export type InertiaSharedProps<T = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  flash: {
    message?: string
  }
  user: User
  errorBags: any
  errors: any
}
