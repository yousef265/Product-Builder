import { useState } from "react";
import ProductCard from "./Components/ProductCard";
import Button from "./Components/UI/Button";
import Modal from "./Components/UI/Modal";
import { productList } from "./Data";

function App() {
    //--------- States ---------
    let [isOpen, setIsOpen] = useState(false);

    //--------- Handlers ---------
    function openModal() {
        setIsOpen(true);
        // setIsOpen((prev) => !prev);
    }

    function closeModal() {
        setIsOpen(false);
    }
    //--------- Renders ---------
    const renderProductList = productList.map((product) => <ProductCard key={product.id} product={product} />);

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
                <div className="flex space-x-2">
                    <Button type="button" className="text-lg w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                        Add
                    </Button>
                    <Button type="button" className="text-lg text-white w-full bg-slate-400 hover:bg-slate-300 active:bg-slate-500" onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </main>
    );
}

export default App;
