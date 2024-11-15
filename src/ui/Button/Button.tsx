import clsx from "clsx";

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick }) => {
  return (
    <button type={type} onClick={onClick}
      className={clsx('border border-gray-300 mb-8 p-3 rounded-full transform transition-all duration-300 ease-in-out bg-blue-500 text-white',
        'hover:bg-blue-600 hover:scale-105 hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50')}>
      {children}</button>
  )
}
