import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./Components/ProductCard";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
import Modal from "./Components/UI/Modal";
import { formInputList, productList } from "./Data";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";

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
    const [product, setProduct] = useState<IProduct>(productDefaultValue);

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
    };

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = productValidation({ description: product.description, imageURL: product.imageURL, price: product.price, title: product.title });
        console.log(errors);
        console.log(product);
    };

    const onCancel = () => {
        setProduct(productDefaultValue);
        closeModal();
    };

    //--------- Renders ---------
    const renderProductList = productList.map((product) => <ProductCard key={product.id} product={product} />);
    const renderFromInputList = formInputList.map((input) => (
        <div className="space-y-2 flex flex-col" key={input.name}>
            <label className="text-md font-semibold capitalize" htmlFor={input.name}>
                {input.name}
            </label>
            <Input id={input.name} type={input.type} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
        </div>
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
