import InputArea from "./InputArea"
import TranslationArea from "./TranslationArea"

export default () => {
  return (
    <div className="grid gap-2 mt-2 grid-cols-2 grid-rows-[auto_auto]">
      <InputArea />
      <TranslationArea />
    </div >
  )
}
