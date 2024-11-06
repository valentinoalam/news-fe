import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Category } from '@/types/category';
import Link from 'next/link';
// import { getInitialCategories } from '@/utils/StorageUtils';
import { fetchCategories } from '@/store/features/categorySlice';

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status } = useSelector((state: RootState) => state.category);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (status === 'idle' && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categories.length]);

  const mainCategories = categories.slice(0, 10);
  const moreCategories = categories.slice(10);

  const handleMouseEnter = (categoryId: string) => setActiveCategory(categoryId);
  const handleMouseLeave = () => {
    setActiveCategory(null);
    setShowMore(false);
  };

  if (status === 'loading' && categories.length === 0) {
    return (
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading navigation...</p>
      </div>
    );
  }

  return (
    <nav className="relative self-center bg-white border-t border-gray-200">
      <div className="container mx-auto justify-center flex items-center h-16">
        <ul className="flex space-x-6">
          {mainCategories.map((category: Category) => (
            <li
              key={category.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={`/category/${category.slug}`} className="flex items-center space-x-1 text-gray-800 hover:text-black">
                  <span>{category.name}</span>
                  {category.children && category.children.length > 0 && (
                    <ChevronDown className="w-4 h-4" />
                  )}
              </Link>

              {activeCategory === category.id && category.children && category.children.length > 0 && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
                  {category.children.map((sub: Category) => (
                    <Link key={sub.id} href={`/category/${sub.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          {moreCategories.length > 0 && (
            <li
              className="relative"
              onMouseEnter={() => setShowMore(true)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 text-gray-800 hover:text-black">
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMore && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
                  {moreCategories.map((category: Category) => (
                    <div key={category.id} className="relative group">
                      <Link href={`/category/${category.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center justify-between">
                          <span>{category.name}</span>
                          {category.children && category.children.length > 0 && (
                            <ChevronDown className="w-4 h-4" />
                          )}
                      </Link>

                      {category.children && category.children.length > 0 && (
                        <div className="absolute left-full top-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 hidden group-hover:block">
                          {category.children.map((sub: Category) => (
                            <Link key={sub.id} href={`/category/${sub.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;