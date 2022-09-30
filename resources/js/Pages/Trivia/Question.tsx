import React from 'react'
import { TriviaQuestion } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Navbar } from '@/Components/Navbar'

interface TriviaQuestionPageProps {
  question: TriviaQuestion
}
const TriviaQuestionPage: React.FC<TriviaQuestionPageProps> = ({
  question,
}) => {
  return (
    <AuthenticatedLayout>
      <Navbar backRoute="earn" />
      {question.text}
    </AuthenticatedLayout>
  )
}

export default TriviaQuestionPage
