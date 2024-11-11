import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className: string;
}

function Button({ className, type, children, ...rest }: IProps) {
    return (
        <button className={`${className} px-4 py-2 rounded-lg text-sm md:text-base text-slate-200 font-medium uppercase tracking-wider transition`} {...rest}>
            {children}
        </button>
    );
}

export default Button;
