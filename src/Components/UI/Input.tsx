import { forwardRef, InputHTMLAttributes, memo, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return <input ref={ref} className="p-2 rounded-md text-md bg-slate-300 shadow-lg " {...rest} />;
});

export default memo(Input);
