export default interface QuestionModalInterface {
  title: string,
  message: string,
  onCancel?: () => void,
  onConfirm: () => void,
}