import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    type: "button" | "submit" | "reset";
    className: string;
    width?: "w-full" | "w-fit";
}

function Button({ className, width = "w-full", type, children, ...rest }: IProps) {
    return (
        <button type={type} className={`${className} ${width}  px-4 py-2 text rounded-lg w-full text-lg text-slate-200 font-medium uppercase  tracking-wider transition`} {...rest}>
            {children}
        </button>
    );
}

export default Button;
