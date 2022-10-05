import React, { useCallback } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import useRoute from '@/Hooks/useRoute'
import { TriviaQuestion } from '@/Types'
import { InputError } from '@/Components/InputError'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'

interface QuestionFormProps {
  question: TriviaQuestion
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ question }) => {
  const route = useRoute()
  const { data, setData, post, errors, processing } = useForm<{
    answer_id: number
  }>({
    answer_id: 0,
  })

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
        <label className="px-4 leading-6" key={answer.id}>
          <input
            type="radio"
            className="nes-radio is-dark h-0 w-0"
            name="answer-dark"
            value={answer.id}
            onChange={onSelectAnswer}
            checked={data.answer_id === answer.id}
            required
          />
          <span>{answer.text}</span>
        </label>
      ))}
      <div className="flex h-20 flex-1 items-end pt-20">
        {errors.answer_id && <InputError message={errors.answer_id} />}
        <div className="w-full p-3">
          <PrimaryButton disabled={processing || data.answer_id === 0}>
            Submit
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
