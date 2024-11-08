interface IProps {
    imageUrl: string;
    className: string;
    alt: string;
}

function Image({ imageUrl, alt, className }: IProps) {
    return <img className={className} src={imageUrl} alt={alt} />;
}

export default Image;
