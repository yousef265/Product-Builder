import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: IProps) {
    return <input className="p-2 rounded-md text-md bg-slate-300 shadow-lg " {...rest} />;
}

export default Input;
