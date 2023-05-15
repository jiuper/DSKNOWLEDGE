import "./style.css";

interface ICreateTestTextArea {
  classPrefix?: string;
  placeholder?: string;
  value: string;
  name?: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}
export const CreateTestTextArea = ({
  classPrefix,
  placeholder,
  value,
  name,
  error,
  handleChange,
  isBlur,
}: ICreateTestTextArea) => {
  return (
    <div className="create-area">
      <span className="create-area__title">Описание</span>
      <textarea
        className={classPrefix}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={isBlur}
        name={name}
      />
      {error ? <span className="create-area__error">{error}</span> : ""}
    </div>
  )
}
