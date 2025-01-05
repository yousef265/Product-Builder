import { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import ColorCircle from "./Components/ColorCircle";
import ErrorsMessage from "./Components/ErrorsMessage";
import ProductCard from "./Components/ProductCard";
import Toaster from "./Components/toaster";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
import Modal from "./Components/UI/Modal";
import SelectMenu from "./Components/UI/SelectMenu";
import { categories, colors, formInputList, productList } from "./Data";
import { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./Validation";

function App() {
    const inputRef = useRef<null | HTMLInputElement>(null);

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

    const initialErrorsValue = { title: "", description: "", price: "", imageURL: "", colors: "" };

    //--------- States ---------
    const [allProduct, setAllProduct] = useState<IProduct[]>(productList);
    const [product, setProduct] = useState<IProduct>(productDefaultValue);
    const [currentProduct, setCurrentProduct] = useState<IProduct>(productDefaultValue);
    const [errors, setErrors] = useState(initialErrorsValue);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [tempColors, setTempColors] = useState<string[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

    //--------- Handlers ---------

    {
        /* HANDLE ADD PRODUCT */
    }

    const toggleAddModal = useCallback(() => {
        setIsAddModalOpen((prev) => !prev);
        setProduct(productDefaultValue);
        setErrors(initialErrorsValue);
        setTempColors([]);
    }, []);

    const onChangeAddHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }, []);

    const onSubmitAddHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { description, imageURL, price, title } = product;
        const errors = productValidation({ description, imageURL, price, title, colors: tempColors });

        const hasError = Object.values(errors).some((value) => value !== "");

        if (hasError) {
            setErrors((prev) => ({
                ...prev,
                ...errors,
            }));
            return;
        }

        setAllProduct((prev) => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev]);
        toggleAddModal();
        Toaster({ message: "successfully, Product has been created", toastType: "success" });

        console.log("Go to server");
    };

    {
        /* HANDLE EDIT PRODUCT */
    }

    const toggleEditModal = useCallback(() => {
        setIsEditModalOpen((prev) => !prev);
        setProduct(productDefaultValue);
        setErrors(initialErrorsValue);
    }, []);

    const onChangeEditHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentProduct((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }, []);

    const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { description, imageURL, price, title } = currentProduct;

        const errors = productValidation({ description, imageURL, price, title, colors: tempColors });

        const hasError = Object.values(errors).some((value) => value !== "");

        if (hasError) {
            setErrors((prev) => ({
                ...prev,
                ...errors,
            }));
            return;
        }

        const editedProduct = [...allProduct];
        const updatedProduct = editedProduct.map((product) => (product.id === currentProduct.id ? { ...currentProduct, colors: tempColors } : product));
        setAllProduct(updatedProduct);

        toggleEditModal();
        Toaster({ message: "successfully, Product has been Updated", toastType: "success" });

        console.log("Go to server");
    };

    {
        /* HANDLE REMOVE PRODUCT */
    }

    const toggleConfirmModal = useCallback(() => {
        setIsConfirmModalOpen((prev) => !prev);
    }, []);

    const removeProductHandler = () => {
        const filtered = allProduct.filter((product) => product.id !== currentProduct.id);
        setAllProduct(filtered);
        toggleConfirmModal();
        Toaster({ message: "Product has been Deleted", toastType: "success" });
    };

    {
        /* HANDLE COLOR CIRCLE */
    }

    const handleColorToggle = useCallback(
        (color: string) => {
            setErrors((prev) => ({ ...prev, colors: "" }));

            setTempColors((prev) => (prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color]));
        },
        [setTempColors, setErrors]
    );

    {
        /* HANDLE SELECT CATEGORY */
    }

    const handleSelectCategory = (value: ICategory) => {
        setCurrentProduct((prev) => ({
            ...prev,
            category: value,
        }));
    };
    //--------- Renders ---------
    const renderProductList = allProduct.map((product) => (
        <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} openEditModal={toggleEditModal} setTempColors={setTempColors} openConfirmModal={toggleConfirmModal} />
    ));
    const renderAddFromInputList = formInputList.map((input) => (
        <div className="space-y-2 flex flex-col" key={input.name}>
            <label className="text-md font-semibold capitalize" htmlFor={input.name}>
                {input.name}
            </label>
            <Input ref={inputRef} id={input.name} type={input.type} name={input.name} value={product[input.name]} onChange={onChangeAddHandler} />
            <ErrorsMessage message={errors[input.name]} />
        </div>
    ));

    const renderEditFormInputList = formInputList.map((input) => (
        <div className="space-y-2 flex flex-col" key={input.name}>
            <label className="text-md font-semibold capitalize" htmlFor={input.name}>
                {input.name}
            </label>
            <Input id={input.name} type={input.type} name={input.name} value={currentProduct[input.name]} onChange={onChangeEditHandler} />
            <ErrorsMessage message={errors[input.name]} />
        </div>
    ));

    const renderColorList = useMemo(() => colors.map((color) => <ColorCircle key={color} color={color} onClick={() => handleColorToggle(color)} />), [colors, handleColorToggle]);

    return (
        <main className="container my-5">
            <div className="flex items-center justify-between text-2xl font-extrabold ">
                <h2 className="text-lg  md:text-4xl uppercase">
                    Product <span className="text-indigo-600">Builder</span>
                </h2>
                <Button type="button" className="text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 " onClick={toggleAddModal}>
                    Build Product
                </Button>
            </div>

            <div className="my-5 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{renderProductList}</div>

            {/* ADD PRODUCT MODAL */}
            <Modal isOpen={isAddModalOpen} title="Add New Product" closeModal={toggleAddModal}>
                <form className="space-y-3" onSubmit={onSubmitAddHandler}>
                    <div className="space-y-2">{renderAddFromInputList}</div>

                    <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory} />
                    <div>
                        <div className="flex space-x-1">{renderColorList}</div>
                        <ErrorsMessage message={errors["colors"]} />
                    </div>
                    <div className="flex flex-wrap">
                        {tempColors.map((color) => (
                            <span key={color} className="rounded-lg text-white px-[2px] m-px cursor-pointer" style={{ backgroundColor: color }} onClick={() => handleColorToggle(color)}>
                                {color}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <Button type="submit" className="text-lg w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                            Add
                        </Button>
                        <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={toggleAddModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* EDIT PRODUCT MODAL */}
            <Modal isOpen={isEditModalOpen} title="Edit Product" closeModal={toggleEditModal}>
                <form className="space-y-3" onSubmit={onSubmitEditHandler}>
                    <div className="space-y-2">{renderEditFormInputList}</div>

                    <SelectMenu selected={currentProduct.category} setSelected={(value) => handleSelectCategory(value)} />

                    <div>
                        <div className="flex space-x-1">{renderColorList}</div>
                        <ErrorsMessage message={errors["colors"]} />
                    </div>

                    <div className="flex flex-wrap">
                        {tempColors.map((color) => (
                            <span key={color} className="rounded-lg text-white px-[2px] m-px cursor-pointer" style={{ backgroundColor: color }} onClick={() => handleColorToggle(color)}>
                                {color}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <Button type="submit" className="text-lg w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                            Submit
                        </Button>
                        <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={toggleEditModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* DELETE PRODUCT MODAL */}
            <Modal
                isOpen={isConfirmModalOpen}
                title="Are you sure you want to remove this Product from your Store?"
                description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
                closeModal={toggleConfirmModal}
            >
                <div className="flex space-x-2">
                    <Button type="submit" className="text-lg w-full bg-red-600 hover:bg-red-500 active:bg-red-700 capitalize" onClick={removeProductHandler}>
                        Yes,Remove
                    </Button>
                    <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={toggleConfirmModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </main>
    );
}

export default App;
