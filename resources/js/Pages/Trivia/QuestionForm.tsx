import React, { useCallback, useEffect } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import classNames from 'classnames'
import useRoute from '@/Hooks/useRoute'
import { TriviaAnswer, TriviaQuestion } from '@/Types'
import { InputError } from '@/Components/InputError'
import {
  PrimaryButton,
  PrimaryButtonLink,
} from '@/Components/Forms/PrimaryButton'
import { RadioButton } from '@/Components/Forms/RadioButton'

interface QuestionFormProps {
  question: TriviaQuestion
  correctAnswer?: TriviaAnswer
  chosenAnswer?: TriviaAnswer
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  correctAnswer,
  chosenAnswer,
}) => {
  const route = useRoute()
  const { data, setData, post, errors, processing } = useForm<{
    answer_id: number
  }>({
    answer_id: chosenAnswer?.id || question.answers[0].id,
  })

  useEffect(() => {
    setData({
      answer_id: chosenAnswer?.id || question.answers[0].id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.answers])

  const onSelectAnswer = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      setData('answer_id', parseInt(event.target.value, 10))
    },
    [setData],
  )

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      post(route('trivia.answer'))
      setData({ answer_id: 0 })
    },
    [post, route, setData],
  )

  const didSelectWrongAnswer = !!(correctAnswer && chosenAnswer)

  return (
    <form
      className="flex h-full flex-col gap-4 overflow-auto"
      onSubmit={onSubmit}
    >
      <div className="nes-container is-dark is-rounded with-title">
        <h2 className="title">Question</h2>
        <p className="text-sm">{question.text}</p>
      </div>
      {question.answers.map((answer) => (
        <label className="px-10 leading-6" key={answer.id}>
          <RadioButton
            name="answer-dark"
            value={answer.id}
            onChange={onSelectAnswer}
            checked={data.answer_id === answer.id}
            required
            disabled={didSelectWrongAnswer}
          />
          <span
            className={classNames({
              '!text-green-300': answer.id === correctAnswer?.id,
              '!text-red-300': answer.id === chosenAnswer?.id,
            })}
          >
            {answer.text}
          </span>
        </label>
      ))}
      <div className="flex h-20 flex-1 items-end pt-20">
        {errors.answer_id && <InputError message={errors.answer_id} />}
        <div className="w-full py-3 pl-3 pr-4">
          {didSelectWrongAnswer && (
            <PrimaryButtonLink
              className="w-full"
              href={route('trivia.question')}
            >
              Continue
            </PrimaryButtonLink>
          )}
          {!didSelectWrongAnswer && (
            <PrimaryButton
              disabled={processing || data.answer_id === 0}
              className="w-full"
            >
              Submit
            </PrimaryButton>
          )}
        </div>
      </div>
    </form>
  )
}
