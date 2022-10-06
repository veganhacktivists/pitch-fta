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
      {!question && (
        <div className="flex h-full items-center">
          <div className="nes-container is-dark is-rounded with-title">
            <h2 className="title">Whoa!</h2>
            <p>You've gone through all the trivia questions.</p>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  )
}

export default TriviaQuestionPage
