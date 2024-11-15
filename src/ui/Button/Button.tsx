interface ButtonProps {
  children: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick }) => {
  return (
    <button type={type} onClick={onClick} 
    className="border border-gray mb-8 p-2 rounded-full transform transition-transform duration-200 ease-in-out hover:scale-110">
      {children}</button>
  )
}
