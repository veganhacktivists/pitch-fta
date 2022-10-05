import React, { useCallback, useEffect, useState } from 'react'
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
  const {
    props: {
      flash: { message },
    },
  } = useTypedPage()

  const [alert, setAlert] = useState(message)
  const onDismissAlert = useCallback(() => {
    setAlert('')
  }, [])

  useEffect(() => {
    setAlert(message)
  }, [question, message])

  return (
    <AuthenticatedLayout backRoute="home">
      <Head title={question ? question.text : 'Trivia'} />
      {alert && (
        <div className="nes-container is-rounded is-dark relative flex items-center text-center">
          <p className="px-4">{alert}</p>
          <button className="absolute right-4" onClick={onDismissAlert}>
            <i className="nes-icon close is-small before:!text-white" />
          </button>
        </div>
      )}
      {question && <QuestionForm question={question} />}
      {!question && <p>No questions left</p>}
    </AuthenticatedLayout>
  )
}

export default TriviaQuestionPage
