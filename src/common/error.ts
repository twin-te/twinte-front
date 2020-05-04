import Swal from 'sweetalert2'

const defaultTitle = 'エラーが発生しました'
const defaultReason = '原因不明のエラーが発生しました。'
const defaultType = 'error'

type Props = {
  title: string
  reason: string
  type: 'error' | 'success' | 'warning' | 'info' | 'question' | undefined
}

export const errorHandler = ({
  title = defaultTitle,
  reason = defaultReason,
  type = defaultType,
}: Props) => {
  Swal.fire(title, reason, type)
}
