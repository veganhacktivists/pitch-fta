import React, { useCallback } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import useRoute from '@/Hooks/useRoute'
import { TriviaQuestion } from '@/Types'
import { InputError } from '@/Components/InputError'
import { PrimaryButton } from '@/Components/PrimaryButton'

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

  const setSelectedAnswer = useCallback(
    (answerId: number) => {
      setData({ answer_id: answerId })
    },
    [setData],
  )

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      post(route('trivia.answer'))
    },
    [post, route],
  )
  return (
    <>
      <p className="text-center">{question.text}</p>

      <form className="mx-4" onSubmit={onSubmit}>
        <RadioGroup value={data.answer_id} onChange={setSelectedAnswer}>
          <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
          <div className="space-y-4">
            {question.answers.map((answer) => (
              <RadioGroup.Option
                key={answer.text}
                value={answer.id}
                className={({ checked, active }) =>
                  classNames(
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                    'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center">
                      <span className="flex flex-col text-sm">
                        <RadioGroup.Label
                          as="span"
                          className="font-medium text-gray-900"
                        >
                          {answer.text}
                        </RadioGroup.Label>
                      </span>
                    </span>
                    <span
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg',
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {errors.answer_id && <InputError message={errors.answer_id} />}
        <div className="text-right">
          <PrimaryButton disabled={processing}>Submit</PrimaryButton>
        </div>
      </form>
    </>
  )
}
