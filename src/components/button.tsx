
type ButtonProps = React.PropsWithChildren & {
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ onClick, variant, children }) => {
  const colors = variant === 'primary'
    ? 'text-white bg-purple-700 hover:bg-purple-800'
    : 'text-purple-800 bg-white border border-1 border-purple-700 hover:bg-purple-100';
  return (
    <button className={`${colors} font-medium rounded-lg px-5 py-2.5`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
