import Swal from 'sweetalert2'

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
  SummerVacation: '夏季休業中',
  SpringVacation: '春季休業中',
  Annual: '通年',
  Unknown: '不明',
}
const dayOption = {
  Sun: '日',
  Mon: '月',
  Tue: '火',
  Wed: '水',
  Thu: '木',
  Fri: '金',
  Sat: '土',
  Unknown: '不明',
}
const periodOption = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
}

const view = async (): Promise<Form | null> => {
  let form: Form = {
    lecture_name: '',
    instructor: '',
    module: '',
    day: '',
    period: '',
    room: '',
  }

  await Swal.mixin({
    confirmButtonText: '次へ &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3', '4', '5', '6'],
  })
    .queue([
      {
        title: 'カスタム授業の作成',
        text: '科目名を入力してください。',
        input: 'text',
        preConfirm: (lecture_name: string) => {
          form.lecture_name = lecture_name
        },
      },
      {
        title: 'カスタム授業の作成',
        text: '教師名を入力してください。',
        input: 'text',
        preConfirm: (instructor: string) => {
          form.instructor = instructor
        },
      },
      {
        title: 'カスタム授業の作成',
        text:
          'モジュールを選択してください。複数のモジュールの追加には現在対応していません。',
        input: 'select',
        inputOptions: moduleOption,
        inputPlaceholder: 'クリックしてモジュールを選択する',
        preConfirm: (module: string) => {
          form.module = module
        },
      },
      {
        title: 'カスタム授業の作成',
        text: '曜日を選択してください。',
        input: 'select',
        inputOptions: dayOption,
        inputPlaceholder: 'クリックして曜日を選択する',
        preConfirm: (day: string) => {
          form.day = day
        },
      },
      {
        title: 'カスタム授業の作成',
        text: '時限を選択してください。',
        input: 'radio',
        inputOptions: periodOption,
        preConfirm: (period: string) => {
          form.period = period
        },
      },
      {
        title: 'カスタム授業の作成',
        text: '場所を入力してください。',
        input: 'text',
        preConfirm: (room: string) => {
          form.room = room
        },
      },
    ])
    .then((result) => {
      if (result.value) {
        return form
      } else {
        Swal.fire('追加をキャンセルしました', '', 'info')
        return null
      }
    })

  return form
}

export const addCustomLecture = async () => {
  const form = await view()
  window.alert(JSON.stringify(form))
  if (form) {
    Swal.fire('追加が完了しました', '', 'success')
  } else {
    Swal.fire('追加をキャンセルしました。', '', 'info')
  }
}
