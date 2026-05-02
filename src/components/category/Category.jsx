
import mangoImage from '../../assets/mango.webp';
import { Link } from 'react-router';
import './Category.css';

const Category = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="rounded-full mx-2 py-2 px-7 max-w-fit bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)] flex items-center justify-center gap-5 overflow-x-auto no-scrollbar">
            {
                categories.map((cat, index) => {
                    const isActive = activeCategory === cat;

                    return (
                        <Link
                            key={index}
                            onClick={() => setActiveCategory(cat)}
                            className={`category flex flex-col items-center justify-center min-w-17.5 shrink-0 cursor-pointer transition-colors 
                            ${isActive ? "text-(--orange-hot)" : "text-base-content/80"} hover:text-(--orange-hot)`}
                        >
                            {/* Image */}
                            <img
                                className={`w-15 h-15 shrink-0 rounded-full border-3 
                                ${isActive ? "border-(--orange-hot)" : "border-white"} 
                                hover:border-(--orange-hot)`}
                                src={mangoImage}
                                alt={cat}
                            />

                            {/* Text */}
                            <h2 className="font-medium whitespace-nowrap text-center">
                                {cat}
                            </h2>
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default Category;