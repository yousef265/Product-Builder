interface IProps {
    message: string;
}

function ErrorsMessage({ message }: IProps) {
    if (!message) return null;

    return <span className="text-red-600 font-semibold text-sm">{message}</span>;
}

export default ErrorsMessage;
