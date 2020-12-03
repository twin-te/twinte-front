import Swal from 'sweetalert2'

import { PortsPick } from '~/adapter'
import type { Day, CourseModule, Course } from 'entity'
import { YEAR, BASE_URL } from '~/config'
import { UseCase } from '.'

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

type R = PortsPick<'registeredCourses'>
type A = void

export class AddCustomLecture implements UseCase<R, A> {
  async run({ registeredCourses }: R) {
    const form = await this.makeForm()
    const { value: allowAdd } = await Swal.fire(
      '注意',
      '追加する時間帯にすでに授業が入っている場合追加しないようにしています。',
      'info'
    )
    const validForm = await this.validator(form)

    // 有効な授業で、確認に同意した場合
    if (validForm && allowAdd) {
      // 時間割の作成
      const userData = await registeredCourses.postRegisteredCourse()

      if (!userData) {
        Swal.fire('原因不明のエラー', '', 'error')
        return
      }

      const lecture: Course = {
        lecture_code: '',
        lecture_name: form.lecture_name,
        instructor: form.instructor,
        year: YEAR,
        module: form.module as CourseModule,
        day: form.day as Day,
        period: parseInt(form.period),
        room: form.room,
        user_lecture_id: userData.user_lecture_id,
        formats: userData.formats,
      }

      // 時間割の追加
      await registeredCourses.updateRegisteredCourse()
      Swal.fire('追加が完了しました', '', 'success')
    } else {
      Swal.fire(
        '追加をキャンセルしました。',
        '時間割追加がうまく行えなかった可能性があります。',
        'info'
      )
    }
  }

  /**
   * true == Formは正しい
   */
  async validator(form: Form): Promise<boolean> {
    if (form.module === '' || form.day === '' || form.period === '') {
      return false
    }
    const response = await $nuxt.$axios.get(
      `${BASE_URL}/timetables/${YEAR}/${form.module}/${form.day}/${form.period}`
    )
    // TODO かぶってるエラー
    return response.status === 204
  }

  async makeForm(): Promise<Form> {
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
}
