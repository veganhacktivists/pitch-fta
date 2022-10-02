import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import { TriviaQuestion } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { QuestionForm } from './QuestionForm'
import useTypedPage from '@/Hooks/useTypedPage'

interface TriviaQuestionPageProps {
  question: TriviaQuestion
}
const TriviaQuestionPage: React.FC<TriviaQuestionPageProps> = ({
  question,
}) => {
  const page = useTypedPage()

  return (
    <AuthenticatedLayout backRoute="earn">
      <Head title={question ? question.text : 'Trivia'} />
      {page.props.flash.message && <p>{page.props.flash.message}</p>}
      {question && <QuestionForm question={question} />}
      {!question && <p>No questions left</p>}
    </AuthenticatedLayout>
  )
}

export default TriviaQuestionPage
