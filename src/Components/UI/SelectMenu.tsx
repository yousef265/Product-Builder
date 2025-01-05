import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { categories } from "../../Data";
import { ICategory } from "../../interfaces";
import { memo } from "react";

interface IProps {
    setSelected: (category: ICategory) => void;
    selected: ICategory;
}

const SelectMenu = ({ selected, setSelected }: IProps) => {
    return (
        <Listbox value={selected} onChange={setSelected}>
            <Label className="block text-md font-semibold capitalize">Category</Label>
            <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-slate-300 p-2 text-left text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-black sm:text-sm/6">
                    <span className="flex items-center">
                        <img alt="" src={selected.imageURL} className="h-5 w-5 shrink-0 rounded-full" />
                        <span className="ml-3 block truncate">{selected.name}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {categories.map((category) => (
                        <ListboxOption
                            key={category.id}
                            value={category}
                            className={({ selected }) =>
                                `group relative cursor-default select-none py-2 pl-3 pr-9 selected:text-white 
                           ${selected ? "bg-slate-600 text-white font-semibold" : "font-normal"}
                           hover:bg-slate-500 hover:text-white focus:bg-slate-500 focus:text-white`
                            }
                        >
                            <div className="flex items-center">
                                <img alt="" src={category.imageURL} className="h-5 w-5 shrink-0 rounded-full" />
                                <span className="ml-3 block truncate">{category.name}</span>
                            </div>
                            {selected && category.id === selected.id && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};

export default memo(SelectMenu);
