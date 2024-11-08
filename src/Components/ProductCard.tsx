import Image from "./Image";
import Button from "./UI/Button";

interface IProps {}

function productCard({}: IProps) {
    return (
        <>
            <div className="border border-gray-300 p-3 rounded-lg space-y-2">
                <Image
                    alt="ProductName"
                    className="rounded-lg "
                    imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />

                <h3 className="font-bold text-lg text-indigo-600">Product Title</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, cum veritatis eaque modi repellendus iure itaque eligendi beatae fuga similique? Eaque, ullam pariatur optio animi
                    voluptatem perspiciatis saepe! Necessitatibus, inventore.
                </p>

                <div className="flex space-x-1">
                    <span className="size-5 bg-red-950 rounded-full cursor-pointer" />
                    <span className="size-5 bg-red-600 rounded-full cursor-pointer" />
                    <span className="size-5 bg-red-700 rounded-full cursor-pointer" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-indigo-600">$500</span>
                    <span className="flex items-center space-x-2">
                        <span>CategoryName</span>

                        <Image
                            alt="ProductName"
                            className="size-10 rounded-full object-cover"
                            imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        />
                    </span>
                </div>

                <div className="flex space-x-2">
                    <Button type="button" className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                        Edit
                    </Button>
                    <Button type="button" className="bg-red-600 hover:bg-red-500 active:bg-red-700  ">
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}

export default productCard;
