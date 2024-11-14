import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./Components/ProductCard";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
import Modal from "./Components/UI/Modal";
import { colors, formInputList, productList } from "./Data";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorsMessage from "./Components/ErrorsMessage";
import ColorCircle from "./Components/ColorCircle";
import { v4 as uuid } from "uuid";

function App() {
    const productDefaultValue: IProduct = {
        title: "",
        description: "",
        price: "",
        imageURL: "",
        id: "",
        colors: [],
        category: {
            imageURL: "",
            name: "",
        },
    };

    //--------- States ---------
    const [isOpen, setIsOpen] = useState(false);
    const [allProduct, setAllProduct] = useState<IProduct[]>(productList);
    const [product, setProduct] = useState<IProduct>(productDefaultValue);
    const [errors, setErrors] = useState({ title: "", description: "", price: "", imageURL: "" });
    const [tempColors, setTempColors] = useState<string[]>([]);

    //--------- Handlers ---------
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const onCancel = () => {
        setProduct(productDefaultValue);
        closeModal();
    };

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { description, imageURL, price, title } = product;
        const errors = productValidation({ description, imageURL, price, title });

        const hasError = Object.values(errors).some((value) => value !== "");

        if (hasError) {
            setErrors(errors);
            return;
        }

        setAllProduct((prev) => [{ ...product, id: uuid(), colors: tempColors }, ...prev]);
        setProduct(productDefaultValue);
        setTempColors([]);
        closeModal();

        console.log("Go to server");
    };

    //--------- Renders ---------
    const renderProductList = allProduct.map((product) => <ProductCard key={product.id} product={product} />);
    const renderFromInputList = formInputList.map((input) => (
        <div className="space-y-2 flex flex-col" key={input.name}>
            <label className="text-md font-semibold capitalize" htmlFor={input.name}>
                {input.name}
            </label>
            <Input id={input.name} type={input.type} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
            <ErrorsMessage message={errors[input.name]} />
        </div>
    ));

    const renderColorList = colors.map((color) => (
        <ColorCircle
            key={color}
            color={color}
            onClick={() => {
                if (tempColors.includes(color)) {
                    setTempColors((prev) => prev.filter((item) => item !== color));
                    return;
                }

                setTempColors((prev) => [...prev, color]);
            }}
        />
    ));

    return (
        <main className="container my-5">
            <div className="flex items-center justify-between text-2xl font-extrabold ">
                <h2 className="text-lg  md:text-4xl uppercase">
                    Product <span className="text-indigo-600">Builder</span>
                </h2>
                <Button type="button" className="text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 " onClick={openModal}>
                    Build Product
                </Button>
            </div>

            <div className="my-5 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{renderProductList}</div>
            <Modal isOpen={isOpen} title="Add New Product" closeModal={closeModal}>
                <form className="space-y-3" onSubmit={onSubmitHandler}>
                    <div className="space-y-2">{renderFromInputList}</div>

                    <div className="flex space-x-1">{renderColorList}</div>
                    <div className="flex flex-wrap">
                        {tempColors.map((color) => (
                            <span key={color} className="rounded-lg text-white px-[2px] m-px" style={{ backgroundColor: color }}>
                                {color}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <Button type="button" className="text-lg w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                            Add
                        </Button>
                        <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </main>
    );
}

export default App;
