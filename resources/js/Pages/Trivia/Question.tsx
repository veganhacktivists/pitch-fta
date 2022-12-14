import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import { TriviaAnswer, TriviaQuestion } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { QuestionForm } from './QuestionForm'
import { VoteCount } from '@/Components/VoteCount'
import { Alert } from '@/Components/Alert'
import { PrimaryButtonLink } from '@/Components/Forms/PrimaryButton'

interface TriviaQuestionPageProps {
  question: TriviaQuestion
  correctAnswer?: TriviaAnswer
  chosenAnswer?: TriviaAnswer
}
const TriviaQuestionPage: React.FC<TriviaQuestionPageProps> = ({
  question,
  correctAnswer,
  chosenAnswer,
}) => {
  return (
    <AuthenticatedLayout backRoute="home" renderNav={() => <VoteCount />}>
      <Head title={question ? question.text : 'Trivia'} />
      <Alert observable={question} />
      {question && (
        <QuestionForm
          correctAnswer={correctAnswer}
          chosenAnswer={chosenAnswer}
          question={question}
        />
      )}
      {!question && (
        <div className="flex h-full items-center">
          <div className="nes-container is-dark is-rounded with-title">
            <h2 className="title">Whoa!</h2>
            <p>You've gone through all the trivia questions.</p>
            <PrimaryButtonLink className="mt-4 w-full" href={route('home')}>
              Return
            </PrimaryButtonLink>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  )
}

export default TriviaQuestionPage
