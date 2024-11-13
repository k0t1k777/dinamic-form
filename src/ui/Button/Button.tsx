interface ButtonProps {
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, type = 'button', onClick }) => {
  return (
    <button type={type} onClick={onClick}>{text}</button>
  )
}
