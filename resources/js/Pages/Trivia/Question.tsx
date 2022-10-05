import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import { TriviaQuestion } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { QuestionForm } from './QuestionForm'
import { VoteCount } from '@/Components/VoteCount'
import { Alert } from '@/Components/Alert'

interface TriviaQuestionPageProps {
  question: TriviaQuestion
}
const TriviaQuestionPage: React.FC<TriviaQuestionPageProps> = ({
  question,
}) => {
  return (
    <AuthenticatedLayout backRoute="home" renderNav={() => <VoteCount />}>
      <Head title={question ? question.text : 'Trivia'} />
      <Alert observable={question} />
      {question && <QuestionForm question={question} />}
      {!question && <p>No questions left</p>}
    </AuthenticatedLayout>
  )
}

export default TriviaQuestionPage
