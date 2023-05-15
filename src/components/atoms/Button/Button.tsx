import { IButtonType } from "./../../../types/type";

import "./Button.css";

export const Button = ({
  disabled = false,
  handleAction,
  name,
  classPrefix,
  type = "button",
}: IButtonType) => {
  return (
    <button
      disabled={disabled}
      onClick={handleAction}
      className={classPrefix}
      type={type}
    >
      {name}
    </button>
  );
};
