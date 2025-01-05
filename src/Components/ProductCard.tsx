import { memo } from "react";
import { IProduct } from "../interfaces";
import { numberWithCommas, textSlicer } from "../utils/functions";
import ColorCircle from "./ColorCircle";
import Image from "./Image";
import Button from "./UI/Button";

interface IProps {
    product: IProduct;
    setCurrentProduct: (product: IProduct) => void;
    openEditModal: () => void;
    setTempColors: (values: string[]) => void;
    openConfirmModal: () => void;
}

function productCard({ product, setCurrentProduct, openEditModal, setTempColors, openConfirmModal }: IProps) {
    const { title, price, imageURL, description, colors, category } = product;

    // -------Handlers-------

    const onEdit = () => {
        setCurrentProduct(product);
        setTempColors(product.colors);
        openEditModal();
    };

    const onRemove = () => {
        openConfirmModal();
        setCurrentProduct(product);
    };

    // -------RENDERS-------

    const renderColorList = colors.length ? colors.map((color) => <ColorCircle key={color} color={color} />) : <p className="text-gray-700 font-medium h-[20px]">Not Available Colors !</p>;

    return (
        <>
            <div className="border border-gray-300 p-3 rounded-lg space-y-2 ">
                <Image alt={title} className="rounded-lg w-full h-56 object-cover" imageUrl={imageURL} />

                <h3 className="font-bold text-lg text-indigo-600 ">{textSlicer(title, 30)}</h3>

                <p className="text-gray-600  truncate">{textSlicer(description, 60)}</p>

                <div className="flex space-x-1 h-[20px]">{renderColorList}</div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-indigo-600">${numberWithCommas(price)}</span>
                    <span className="flex items-center space-x-2">
                        <span>{category.name}</span>

                        <Image alt={category.name} className="size-10 rounded-full object-cover" imageUrl={category.imageURL} />
                    </span>
                </div>

                <div className="flex space-x-2">
                    <Button type="button" className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 w-full" onClick={onEdit}>
                        Edit
                    </Button>
                    <Button type="button" className="bg-red-600 hover:bg-red-500 active:bg-red-700 w-full " onClick={onRemove}>
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}

export default memo(productCard);
