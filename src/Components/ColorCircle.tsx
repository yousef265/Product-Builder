import { HTMLAttributes, memo } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color: string;
}

function ColorCircle({ color, ...rest }: IProps) {
    return <span className={`size-5 rounded-full cursor-pointer block`} style={{ backgroundColor: color }} {...rest} />;
}

export default memo(ColorCircle);
