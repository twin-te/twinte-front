import Swal from 'sweetalert2'

import { postUserData } from '../../store/api/user-lectures'
import { updateLecture } from '../../store/api/timetables'

import { Period } from '../../types'
import { YEAR, axios, BASE_URL } from '../../common/config'

type Form = {
  lecture_name: string
  instructor: string
  module: string
  day: string
  period: string
  room: string
}

const moduleOption = {
  SpringA: '春A',
  SpringB: '春B',
  SpringC: '春C',
  FallA: '秋A',
  FallB: '秋B',
  FallC: '秋C',
  // SummerVacation: '夏季休業中',
  // SpringVacation: '春季休業中',
  // Annual: '通年',
  // Unknown: '不明',
}
const dayOption = {
  // Sun: '日',
  Mon: '月',
  Tue: '火',
  Wed: '水',
  Thu: '木',
  Fri: '金',
  // Sat: '土',
  // Unknown: '不明',
}
const periodOption = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
}

const initFormValue = {
  lecture_name: '',
  instructor: '',
  module: '',
  day: '',
  period: '',
  room: '',
}

const validator = async (form: Form): Promise<boolean> => {
  const response = await axios.get(
    `${BASE_URL}/timetables/${YEAR}/${form.module}/${form.day}/${form.period}`
  )
  return (
    response.status === 204 &&
    form.module !== '' &&
    form.day !== '' &&
    form.period !== ''
  )
}

const makeForm = async (): Promise<Form> => {
  let form: Form = initFormValue

  await Swal.mixin({
    confirmButtonText: '次へ &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3', '4', '5', '6'],
  }).queue([
    {
      title: 'カスタム授業の作成',
      text: '科目名を入力してください。',
      input: 'text',
      preConfirm: (lecture_name: string) => {
        form.lecture_name = lecture_name || ''
      },
    },
    {
      title: 'カスタム授業の作成',
      text: '教師名を入力してください。',
      input: 'text',
      preConfirm: (instructor: string) => {
        form.instructor = instructor || ''
      },
    },
    {
      title: 'カスタム授業の作成',
      text: '場所を入力してください。',
      input: 'text',
      preConfirm: (room: string) => {
        form.room = room || ''
      },
    },
    {
      title: 'カスタム授業の作成',
      text:
        'モジュールを選択してください。複数のモジュールの追加には現在対応していません。',
      input: 'select',
      inputOptions: moduleOption,
      inputPlaceholder: 'クリックしてモジュールを選択する',
      preConfirm: (module: keyof typeof moduleOption) => {
        form.module = moduleOption[module] || ''
      },
    },
    {
      title: 'カスタム授業の作成',
      text: '曜日を選択してください。',
      input: 'select',
      inputOptions: dayOption,
      inputPlaceholder: 'クリックして曜日を選択する',
      preConfirm: (day: keyof typeof dayOption) => {
        form.day = dayOption[day] || ''
      },
    },
    {
      title: 'カスタム授業の作成',
      text: '時限を選択してください。',
      input: 'radio',
      inputOptions: periodOption,
      preConfirm: (period: string) => {
        form.period = period || ''
      },
    },
  ])

  return form
}

export const addCustomLecture = async () => {
  const form = await makeForm()
  const { value: allowAdd } = await Swal.fire(
    '注意',
    '追加する時間帯にすでに授業が入っている場合追加しないようにしています。',
    'info'
  )
  const validForm = await validator(form)

  // 有効な授業で、確認に同意した場合
  if (validForm && allowAdd) {
    // 時間割の作成
    const userData = await postUserData(form.lecture_name, form.instructor)
    if (!userData) {
      Swal.fire('原因不明のエラー', '', 'error')
      return
    }
    const lecture: Period = {
      lecture_code: '',
      lecture_name: form.lecture_name,
      instructor: form.instructor,
      year: YEAR,
      module: form.module,
      day: form.day,
      period: parseInt(form.period),
      room: form.room,
      user_lecture_id: userData.user_lecture_id,
    }

    // 時間割の追加
    await updateLecture(lecture)
    Swal.fire('追加が完了しました', '', 'success')
  } else {
    Swal.fire(
      '追加をキャンセルしました。',
      '時間割追加がうまく行えなかった可能性があります。',
      'info'
    )
  }
}
