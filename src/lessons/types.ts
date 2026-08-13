export interface Lesson {
  id: string
  module: string
  title: string
  content: string
  code: string
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}