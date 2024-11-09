import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./UI/Button";

interface IProps {
    product: IProduct;
}

function productCard({ product }: IProps) {
    const { title, price, imageURL, description, colors, category } = product;

    // Renders

    const colorsList = colors.length ? (
        colors.map((color) => <span key={color} className={`size-5 rounded-full cursor-pointer`} style={{ backgroundColor: color }} />)
    ) : (
        <p className="text-gray-700 font-medium">Not Available Colors !</p>
    );

    return (
        <>
            <div className="border border-gray-300 p-3 rounded-lg space-y-2 ">
                <Image alt={title} className="rounded-lg w-full h-56 object-cover" imageUrl={imageURL} />

                <h3 className="font-bold text-lg text-indigo-600">{title}</h3>
                <p className="text-gray-600 ">{textSlicer(description, 70)}</p>

                <div className="flex space-x-1">{colorsList}</div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-indigo-600">${price}</span>
                    <span className="flex items-center space-x-2">
                        <span>{category.name}</span>

                        <Image alt={category.name} className="size-10 rounded-full object-cover" imageUrl={category.imageURL} />
                    </span>
                </div>

                <div className="flex space-x-2">
                    <Button type="button" className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 w-full">
                        Edit
                    </Button>
                    <Button type="button" className="bg-red-600 hover:bg-red-500 active:bg-red-700 w-full ">
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}

export default productCard;
