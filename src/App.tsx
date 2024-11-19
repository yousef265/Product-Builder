import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import ColorCircle from "./Components/ColorCircle";
import ErrorsMessage from "./Components/ErrorsMessage";
import ProductCard from "./Components/ProductCard";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
import Modal from "./Components/UI/Modal";
import SelectMenu from "./Components/UI/SelectMenu";
import { categories, colors, formInputList, productList } from "./Data";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import toast, { Toaster } from "react-hot-toast";

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

    const initialErrorsValue = { title: "", description: "", price: "", imageURL: "", colors: "" };

    //--------- States ---------
    const [allProduct, setAllProduct] = useState<IProduct[]>(productList);
    const [product, setProduct] = useState<IProduct>(productDefaultValue);
    const [currentProduct, setCurrentProduct] = useState<IProduct>(productDefaultValue);
    const [errors, setErrors] = useState(initialErrorsValue);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [tempColors, setTempColors] = useState<string[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    //--------- Handlers ---------
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setErrors(initialErrorsValue);
    };

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    const onChangeAddHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const onِِAddModalCancel = () => {
        setProduct(productDefaultValue);
        closeAddModal();
    };

    const onِِEditModalCancel = () => {
        setProduct(productDefaultValue);
        closeEditModal();
    };

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
        setProduct(productDefaultValue);
        setTempColors([]);
        closeAddModal();

        toast.success("successfully, Product has been created", {
            icon: "👏",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });
        console.log("Go to server");
    };

    const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("edit");

        const { description, imageURL, price, title } = currentProduct;

        const errors = productValidation({ description, imageURL, price, title, colors: tempColors });

        const hasError = Object.values(errors).some((value) => value !== "");

        if (hasError) {
            console.log(errors);

            setErrors((prev) => ({
                ...prev,
                ...errors,
            }));
            return;
        }

        console.log(selectedCategory);

        const editedProduct = [...allProduct];
        const updatedProduct = editedProduct.map((product) => (product.id === currentProduct.id ? { ...currentProduct, colors: tempColors } : product));
        setAllProduct(updatedProduct);

        setProduct(productDefaultValue);
        setTempColors([]);
        closeEditModal();
        toast.success("successfully, Product has been Updated", {
            icon: "👏",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });
        console.log("Go to server");
    };

    const removeProductHandler = () => {
        const filtered = allProduct.filter((product) => product.id !== currentProduct.id);
        setAllProduct(filtered);
        closeConfirmModal();
        toast("Product has been Deleted", {
            icon: "👏",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });
    };

    //--------- Renders ---------
    const renderProductList = allProduct.map((product) => (
        <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} openEditModal={openEditModal} setTempColors={setTempColors} openConfirmModal={openConfirmModal} />
    ));
    const renderAddFromInputList = formInputList.map((input) => (
        <div className="space-y-2 flex flex-col" key={input.name}>
            <label className="text-md font-semibold capitalize" htmlFor={input.name}>
                {input.name}
            </label>
            <Input id={input.name} type={input.type} name={input.name} value={product[input.name]} onChange={onChangeAddHandler} />
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

    const renderColorList = colors.map((color) => (
        <ColorCircle
            key={color}
            color={color}
            onClick={() => {
                setErrors((prev) => ({ ...prev, colors: "" }));
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
                <Button type="button" className="text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 " onClick={openAddModal}>
                    Build Product
                </Button>
            </div>

            <div className="my-5 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{renderProductList}</div>

            {/* ADD PRODUCT MODAL */}
            <Modal isOpen={isAddModalOpen} title="Add New Product" closeModal={closeAddModal}>
                <form className="space-y-3" onSubmit={onSubmitAddHandler}>
                    <div className="space-y-2">{renderAddFromInputList}</div>

                    <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory} />
                    <div>
                        <div className="flex space-x-1">{renderColorList}</div>
                        <ErrorsMessage message={errors["colors"]} />
                    </div>
                    <div className="flex flex-wrap">
                        {tempColors.map((color) => (
                            <span
                                key={color}
                                className="rounded-lg text-white px-[2px] m-px cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    setTempColors((prev) => prev.filter((item) => item !== color));
                                }}
                            >
                                {color}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <Button type="submit" className="text-lg w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                            Add
                        </Button>
                        <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={onِِAddModalCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* EDIT PRODUCT MODAL */}
            <Modal isOpen={isEditModalOpen} title="Edit Product" closeModal={closeEditModal}>
                <form className="space-y-3" onSubmit={onSubmitEditHandler}>
                    <div className="space-y-2">{renderEditFormInputList}</div>

                    <SelectMenu
                        selected={currentProduct.category}
                        setSelected={(value) => {
                            setCurrentProduct((prev) => ({
                                ...prev,
                                category: value,
                            }));
                        }}
                    />

                    <div>
                        <div className="flex space-x-1">{renderColorList}</div>
                        <ErrorsMessage message={errors["colors"]} />
                    </div>

                    <div className="flex flex-wrap">
                        {tempColors.map((color) => (
                            <span
                                key={color}
                                className="rounded-lg text-white px-[2px] m-px cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    setTempColors((prev) => prev.filter((item) => item !== color));
                                }}
                            >
                                {color}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <Button type="submit" className="text-lg w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                            Submit
                        </Button>
                        <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={onِِEditModalCancel}>
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
                closeModal={closeConfirmModal}
            >
                <div className="flex space-x-2">
                    <Button type="submit" className="text-lg w-full bg-red-600 hover:bg-red-500 active:bg-red-700 capitalize" onClick={removeProductHandler}>
                        Yes,Remove
                    </Button>
                    <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={closeConfirmModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
            <Toaster />
        </main>
    );
}

export default App;
